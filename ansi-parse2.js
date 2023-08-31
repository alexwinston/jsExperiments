function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function File(bytes) {
    // pos points to the current position in the 'file'.
    var pos;

    // Returns an 8-bit byte at the current byte position, <pos>. Also advances <pos> by a single byte. Throws an error if we advance beyond the length of the array.
    this.get = function () {
        if (pos >= bytes.length) {
            throw "Unexpected end of file reached.";
        }
        return bytes[pos++];
    };

    // Returns an array of <num> bytes found at the current <pos>. Also increments <pos>.
    this.read = function (num) {
        var t;
        t = pos;
        // If num is undefined, return all the bytes until the end of file.
        num = num || this.size - pos;
        while (++pos < this.size) {
            if (--num === 0) {
                break;
            }
        }
        return bytes.subarray(t, pos);
    };

    // Returns the value found at <pos>, without incrementing <pos>.
    this.peek = function (num) {
        num = num || 0;
        return bytes[pos + num];
    };

    // Returns true if the end of file has been reached. <this.size> is set later by the SAUCE parsing section, as it is not always the same value as the length of <bytes>. (In case there is a SAUCE record, and optional comments).
    this.eof = function () {
        return pos === this.size;
    };

    // Seek back to the start of the file, ready for reading.
    pos = 0;

    this.size = bytes.length;
}

async function ans(columns, rows, bytes, callbacks) {
    ANSICOLORS = [
        [  0,   0,   0, 255],  // Black
        [170,   0,   0, 255],  // Red
        [  0, 170,   0, 255],  // Green
        [170,  85,   0, 255],  // Yellow
        [  0,   0, 170, 255],  // Blue
        [170,   0, 170, 255],  // Magenta
        [  0, 170, 170, 255],  // Cyan
        [170, 170, 170, 255],  // White

        // Bright:

        [ 85,  85,  85, 255],
        [255,  85,  85, 255],
        [ 85, 255,  85, 255],
        [255, 255,  85, 255],
        [ 85,  85, 255, 255],
        [255,  85, 255, 255],
        [ 85, 255, 255, 255],
        [255, 255, 255, 255]
    ];

    var file, escaped, escapeCode, oscaped, oscapeCode, j, code, values, x, y, savedX, savedY, foreground, background, drawForeground, drawBackground, bold, blink, inverse;

    var buffers = 0;
    rows += 1

    // Turn bytes into a File object.
    file = new File(bytes);

    // Reset all the attributes, used upon initialization, and on Esc[0m
    function resetAttributes() {
        foreground = 7;
        background = 0;
        bold = false;
        blink = false;
        inverse = false;
    }
    resetAttributes();

    // On the event of a new line, reset <x>, and scroll depending on whether the bottom of the screen has already been reached.
    function newLine() {
        x = 1;
        if (y === rows - 1) {
            callbacks.onScroll();
        } else {
            ++y;
        }
    }

    function complete() {
        callbacks.onComplete();
    }

    function getColor(code) {
        // TODO??? Move check to individual escape code
        if (!Number.isInteger(code)) return code

        const color = ANSICOLORS[code];
        // return rgb(color[0], color[1], color[2], color[3])
        return { r: color[0], g: color[1], b: color[2] }
    }

    // Set a new position for <x> and <y>, bounded by the maxumum amount of <columns>, and rows, and the minimum amount, 1.
    function setPos(newX, newY) {
        x = Math.min(columns, Math.max(1, newX));
        y = Math.min(rows, Math.max(1, newY));
    }

    // Initialize <x>, <y>
    x = 1;
    y = 1;

    // Reset variables which store the escape code string appended to whilst parsing <escapeCode>, and the variable which records if the parse is running in <escaped> mode.
    escapeCode = "";
    escaped = false;
    oscapeCode = "";
    oscaped = false;

    // columns = 80;

    // Returns an array of values found in <escapeCode>, seperated by ";". If there value is not a number, or missing, then the default value of 1 is used.
    function getValues(def = 1) {
        return escapeCode.substr(1, escapeCode.length - 2).split(";").map(function (value) {
            var parsedValue;
            parsedValue = parseInt(value, 10);
            return isNaN(parsedValue) ? def : parsedValue;
        });
    }

    while (!file.eof()) {
        // Obtain the current character <code>.
        var cc = file.get();
        code = cc.charCodeAt(0);
        if (escaped) {
            // If the routine is in <escaped> mode, add the <code> to the <escapeCode> string.
            escapeCode += cc;
            // escapeCode += String.fromCharCode(code);
            // If the code terminates the <escaped> mode...
            if ((code >= 65 && code <= 90) || (code >= 97 && code <= 122)) {
                // ... set the mode to unescaped, and obtain the values in the escaped string.
                escaped = false;
                values = getValues();
                // Check for a valid CSI code.
                if (escapeCode.charAt(0) === "[") {
                // if (escapeCode.charAt(0) === "[") {
                    switch (escapeCode.charAt(escapeCode.length - 1)) {
                    case "A": // Up cursor.
                        y = Math.max(1, y - values[0]);
                        break;
                    case "B": // Down cursor.
                        y = Math.min(rows - 1, y + values[0]);
                        break;
                    case "C": // Forward cursor.
                        if (x === columns) {
                            newLine();
                        }
                        x = Math.min(columns, x + values[0]);
                        break;
                    case "D": // Backward cursor.
                        x = Math.max(1, x - values[0]);
                        break;
                    case "H": // Set the cursor position by calling setPos(), first <y>, then <x>.
                        if (values.length === 1) {
                            setPos(1, values[0]);
                        } else {
                            setPos(values[1], values[0]);
                        }
                        break;
                    case "J": // Clear screen.
                        if (values[0] === 2) {
                            x = 1;
                            y = 1;
                            callbacks.onClear();
                        }
                        break;
                    case "K": // Clear until the end of line.
                        for (j = x - 1; j < columns; ++j) {
                            callbacks.onLiteral(0, j, y - 1, 0, 0);
                        }
                        break;
                    case "m": // Attributes, work through each code in turn.
                        values = getValues(0);
                        for (j = 0; j < values.length; ++j) {
                            if (values[j] >= 30 && values[j] <= 37) {
                                // Set the <foreground> color, points to a value in the <palette> array...
                                foreground = values[j] - 30;
                            } else if (values[j] >= 40 && values[j] <= 47) {
                                // ... and for <background>, if the required value is used.
                                background = values[j] - 40;
                            } else {
                                switch (values[j]) {
                                case 0: // Reset attributes
                                    resetAttributes();
                                    break;
                                case 1: // Bold
                                    bold = true;
                                    break;
                                case 5: // Blink
                                    blink = true;
                                    break;
                                case 7: // Inverse
                                    inverse = true;
                                    break;
                                case 22: // Bold off
                                    bold = false;
                                    break;
                                case 25: // Blink off
                                    blink = false;
                                    break;
                                case 27: // Inverse off
                                    inverse = false;
                                    break;
                                case 38:
                                    if (values[++j] === 2) {
                                        foreground = { r: values[++j], g: values[++j], b: values[++j] }
                                    }
                                    break
                                case 48:
                                    if (values[++j] === 2) {
                                        background = { r: values[++j], g: values[++j], b: values[++j] }
                                    }
                                    break
                                }
                            }
                        }
                        break;
                    case "s": // Save the current <x> and <y> positions.
                        savedX = x;
                        savedY = y;
                        break;
                    case "u": // Restore the current <x> and <y> positions.
                        x = savedX;
                        y = savedY;
                        break;
                    }
                }
                // Finally, reset the <escapeCode>.
                escapeCode = "";
            }
        } else if (oscaped) {
            // https://iterm2.com/documentation-escape-codes.html
            oscapeCode += cc
            if (code === 7) {
                // ... set the mode to unescaped, and obtain the values in the escaped string.
                oscaped = false;
                values = getValues(oscapeCode);
                // Finally, reset the <oscapeCode>.
                oscapeCode = "";
            }
        } else {
            // If not in <escaped> mode, treat <code> as a literal.
            switch (code) {
            case 10: // Lone linefeed (LF).
                newLine();
                break;
            case 13: // Carriage Return, and Linefeed (CRLF)
                if (file.peek() === 0x0A) {
                    file.read(1);
                    newLine();
                }
                break;
            case 26: // Ignore eof characters until the actual end-of-file, or sauce record has been reached.
                complete();
                return;
            default:
                // Go in <escaped> mode if "Esc[" is seen.
                if (code === 27 && file.peek() === '[') { //0x5B) {
                    escaped = true;
                } else if (code === 27 && file.peek() === ']') { //0x5d) {
                    oscaped = true;
                } else {
                    // In <inverse> mode, or not, set the character <code> and attribute data to the <imageData> object, according to the current <foreground>, <background>, <icecolors>, <bold>, and <blink> setting.
                    if (inverse) {
                        drawForeground = background;
                        drawBackground = foreground;
                    } else {
                        drawForeground = foreground;
                        drawBackground = background;
                    }
                    if (bold) {
                        drawForeground += 8;
                    }
                    if (blink) {
                        // TODO
                        // drawBackground += 8;
                    }
                    callbacks.onLiteral(code, x - 1, y - 1,
                        { color: getColor(drawForeground), backgroundColor: getColor(drawBackground) }
                    );
                    if (buffers++ % 60 === 0) {
                        
                        await sleep(1);
                    }

                    // If the end of row has been reached, start a new line.
                    if (++x === columns + 1) {
                        newLine();
                    }
                }
            }
        }
    }
    complete();
}
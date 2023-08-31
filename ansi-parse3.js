function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

ANSICOLORS = [
    [  0,   0,   0, 255],  // Black
    [170,   0,   0, 255],  // Red
    [  0, 170,   0, 255],  // Green
    [170,  85,   0, 255],  // Yellow
    [  0,   0, 170, 255],  // Blue
    [170,   0, 170, 255],  // Magenta
    [  0, 170, 170, 255],  // Cyan
    [170, 170, 170, 255],  // White

    // Bright
    [ 85,  85,  85, 255],
    [255,  85,  85, 255],
    [ 85, 255,  85, 255],
    [255, 255,  85, 255],
    [ 85,  85, 255, 255],
    [255,  85, 255, 255],
    [ 85, 255, 255, 255],
    [255, 255, 255, 255]
];

class Parser {
    constructor(columns, rows, callbacks) {
        this.columns = columns
        this.rows = rows + 1
        this.callbacks = callbacks

        this.x = 1
        this.y = 1
        this.savedX 
        this.savedY

        this.handshaking = false
        this.handshake = []

        this.escaping = false
        this.escapeCode = "";
        this.escaped = false;
        this.oscapeCode = "";
        this.oscaped = false;

        this.stream = new Stream()

        this.resetAttributes()
    }

    // Reset all the attributes, used upon initialization, and on Esc[0m
    resetAttributes() {
        this.foreground = 7;
        this.background = 0;
        this.bold = false;
        this.blink = false;
        this.inverse = false;
    }

    cr() {
        this.x = 1
    }

    lf() {
        if (this.y === this.rows - 1) {
            this.callbacks.onScroll();
        } else {
            ++this.y;
        }
    }

    crlf() {
        this.cr(); this.lf()
    }

    complete() {
        this.callbacks.onComplete();
    }

    getColor(code = 0) {
        // TODO??? Move check to individual escape code
        if (!Number.isInteger(code)) return code

        const color = ANSICOLORS[code];
        // return rgb(color[0], color[1], color[2], color[3])
        return { r: color[0], g: color[1], b: color[2] }
    }

    // Set a new position for <x> and <y>, bounded by the maxumum amount of <columns>, and rows, and the minimum amount, 1.
    setPos(newX, newY) {
        this.x = Math.min(this.columns, Math.max(1, newX));
        this.y = Math.min(this.rows, Math.max(1, newY));
    }

    // Returns an array of values found in <escapeCode>, seperated by ";". If there value is not a number, or missing, then the default value of 1 is used.
    getValues(def = 1) {
        return this.escapeCode.substr(1, this.escapeCode.length - 2).split(";").map(function (value) {
            var parsedValue = parseInt(value, 10);
            return isNaN(parsedValue) ? def : parsedValue;
        });
    }

    async parse(bytes, socket, callback) {
        var j, code, values, drawForeground, drawBackground;
        var buffers = 0;

        this.stream.buffer(bytes, callback)
        while (!this.stream.eof()) {
            // Obtain the current character <code>.
            var cc = this.stream.get();
            cc = Number.isInteger(cc) ? String.fromCharCode(cc) : cc
            code = cc.charCodeAt(0);
            // code = cc
    
            if (this.handshaking) {
                this.handshake.push(cc)
                if (this.handshake.length == 3) {
                    var pong = new Uint8Array(3)
                    // if (this.handshake[2] === "\u0001") {
                    if (this.handshake[2] === "\u0001" || this.handshake[2] === 0x01) {
                        // https://github.com/rickparrish/embed-v2.ftelnet.ca/blob/a1917d855cc381ce6f4c6f09ec4160bd05ab3a1e/ftelnet/ftelnet.norip.xfer.js
                        pong[0] = 255; pong[1] = 252; pong[2] = 1
                        await socket.send(pong)
                        pong[0] = 255; pong[1] = 251; pong[2] = 23
                        await socket.send(pong)
                        pong[0] = 255; pong[1] = 251; pong[2] = 28
                        await socket.send(pong)
                        pong[0] = 255; pong[1] = 253; pong[2] = 1
                        await socket.send(pong)
                        pong[0] = 255; pong[1] = 253; pong[2] = 1
                        await socket.send(pong)
                        pong[0] = 255; pong[1] = 251; pong[2] = 24
                        await socket.send(pong)
                        pong[0] = 255; pong[1] = 250; pong[2] = 24
                        await socket.send(pong)
                        pong = new Uint8Array(9)
                        pong[0] = 0; pong[1] = 97; pong[2] = 110
                        pong[3] = 115; pong[4] = 105; pong[5] = 45
                        pong[6] = 98; pong[7] = 98; pong[8] = 115
                        await socket.send(pong)
                        // await socket.send("\x00ansi-bbs")
                        pong = new Uint8Array(2)
                        pong[0] = 255; pong[1] = 240
                        await socket.send(pong)
                        pong = new Uint8Array(3)
                        pong[0] = 255; pong[1] = 251; pong[2] = 0
                        await socket.send(pong)
                    // } else if (this.handshake[2] === "\u001c") {
                    } else if (this.handshake[2] === "\u001c" || this.handshake[2] === 0x1c) {
                        pong[0] = 255; pong[1] = 252; pong[2] = 28
                        await socket.send(pong)
                    }
                    this.handshaking = false
                    this.handshake = []
                    console.log("handshake complete")
                }
            } else if (this.escaping) {
                if (cc === '[') {
                    // console.log("escaped")
                    this.escaped = true
                } else if (cc === ']') {
                    this.oscaped = true
                }
                this.escapeCode += cc
                this.escaping = false
            } else if (this.escaped) {
                // If the routine is in <escaped> mode, add the <code> to the <escapeCode> string.
                this.escapeCode += cc;
                // If the code terminates the <escaped> mode...
                // if ((code >= 65 && code <= 90) || (code >= 97 && code <= 122)) {
                if (code >= 0x40 && code <= 0x7e) {
                    // ... set the mode to unescaped, and obtain the values in the escaped string.
                    this.escaped = false
                    values = this.getValues()
                    switch (this.escapeCode.charAt(this.escapeCode.length - 1)) {
                        case "A": // Up cursor
                            this.y = Math.max(1, this.y - values[0]);
                            break;
                        case "B": // Down cursor
                            this.y = Math.min(this.rows - 1, this.y + values[0]);
                            break;
                        case "C": // Forward cursor
                            // if (this.x === this.columns) {
                            //     crlf();
                            // }
                            if (this.x === this.columns + 1) break
                            this.x = Math.min(this.columns, this.x + values[0])
                            break;
                        case "D": // Backward cursor
                            this.x = Math.max(1, this.x - values[0]);
                            break;
                        case "H": // Set the cursor position by calling setPos(), first <y>, then <x>
                            this.setPos(values.length === 1 ? 1 : values[1], values[0]);
                            break;
                        case "J": // Clear screen
                            if (values[0] === 2) {
                                this.x = 1;
                                this.y = 1;
                                this.callbacks.onClear();
                            }
                            break;
                        case "K":
                            // Erases part of the line. If n is 0 (or missing), clear from cursor to the end of the line.
                            // If n is 1, clear from cursor to beginning of the line.
                            // If n is 2, clear entire line. Cursor position does not change.
                            console.log(this.escapeCode)
                            for (j = this.x - 1; j < this.columns; ++j) {
                                this.callbacks.onLiteral(0, j, this.y - 1, {
                                    color: this.getColor(drawForeground),
                                    backgroundColor: this.getColor(drawBackground)
                                });
                            }
                            break;
                        // case 'c':
                        //     socket.send([27,'['.charCodeAt(0),0,95,0,'c'.charCodeAt(0)]);
                        //     break
                        case 'f':
                            this.setPos(values.length === 1 ? 1 : values[1], values[0])
                            break
                        case "m": // Attributes
                            values = this.getValues(0);
                            for (j = 0; j < values.length; ++j) {
                                if (values[j] >= 30 && values[j] <= 37) {
                                    // Set the <foreground> color, points to a value in the <palette> array...
                                    this.foreground = values[j] - 30;
                                } else if (values[j] >= 40 && values[j] <= 47) {
                                    // ... and for <background>, if the required value is used.
                                    this.background = values[j] - 40;
                                } else {
                                    switch (values[j]) {
                                    case 0: // Reset attributes
                                        this.resetAttributes();
                                        break;
                                    case 1: // Bold
                                        this.bold = true;
                                        break;
                                    case 5: // Blink
                                        this.blink = true;
                                        break;
                                    case 7: // Inverse
                                        this.inverse = true;
                                        break;
                                    case 22: // Bold off
                                        this.bold = false;
                                        break;
                                    case 25: // Blink off
                                        this.blink = false;
                                        break;
                                    case 27: // Inverse off
                                        this.inverse = false;
                                        break;
                                    case 38:
                                        if (values[++j] === 2) {
                                            this.foreground = { r: values[++j], g: values[++j], b: values[++j] }
                                        }
                                        break
                                    case 48:
                                        if (values[++j] === 2) {
                                            this.background = { r: values[++j], g: values[++j], b: values[++j] }
                                        }
                                        break
                                    default:
                                        console.log(this.escapeCode)
                                    }
                                }
                            }
                            break;
                        case 'n':
                            console.log(this.escapeCode, this.y, this.x)
                            if (values[0] === 6) {
                                const buffer = new Uint8Array(8)

                                const response = [...`\x1b[${this.y};${this.x}R`]
                                response.forEach((c, i) => {
                                    buffer[i] = c.charCodeAt(0)
                                    console.log(buffer[i])
                                })
                                await socket.send(buffer)
                            } else if (values[0] === 255) {
                                // TODO columns, rows
                                await socket.send(`\x1b[25;80R`)
                            }
                            break;
                        case "s": // Save the current <x> and <y> positions.
                            this.savedX = this.x;
                            this.savedY = this.y;
                            break;
                        case "u": // Restore the current <x> and <y> positions.
                            this.x = this.savedX;
                            this.y = this.savedY;
                            break;
                        default:
                            console.log(this.escapeCode)
                    }
                    // Finally, reset the <escapeCode>.
                    this.escapeCode = "";
                }
            } else if (this.oscaped) {
                // https://iterm2.com/documentation-escape-codes.html
                this.oscapeCode += cc
                if (code === 7) {
                    // ... set the mode to unescaped, and obtain the values in the escaped string.
                    this.oscaped = false
                    values = this.getValues(this.oscapeCode);
                    // Finally, reset the <oscapeCode>.
                    this.oscapeCode = "";
                }
            } else {
                // if (cc === 'ÿ') {
                if (cc ==='ÿ' || code === 255) {
                    console.log("handshaking")
                    this.handshaking = true
                    this.handshake.push(cc)
                } else {
                    // If not in <escaped> mode, treat <code> as a literal.
                    switch (code) {
                        case 8: // Moves the cursor left (but may "backwards wrap" if cursor is at start of line)
                            this.x--
                            break
                        case 9:
                            console.log("9")
                            break
                        case 10: // Lone linefeed (LF).
                            this.lf()
                            break;
                        case 11:
                            console.log("11")
                            break
                        case 12:
                            console.log("12")
                            break
                        case 13: // Carriage Return, and Linefeed (CRLF)
                            this.cr()
                            break;
                        case 26: // Ignore eof characters until the actual end-of-file.
                            this.complete();
                            return;
                        case 27:
                            // console.log("escaping")
                            this.escaping = true
                            break
                        case 127:
                            console.log("127")
                            break
                        default:
                            // In <inverse> mode, or not, set the character <code> and attribute data to the <imageData> object, according to the current <foreground>, <background>, <icecolors>, <bold>, and <blink> setting.
                            if (this.inverse) {
                                drawForeground = this.background;
                                drawBackground = this.foreground;
                            } else {
                                drawForeground = this.foreground;
                                drawBackground = this.background;
                            }
                            if (this.bold) {
                                drawForeground += 8;
                            }
                            if (this.blink) {
                                // TODO
                                // drawBackground += 8;
                            }
                            this.callbacks.onLiteral(code, this.x - 1, this.y - 1,
                                {
                                    color: this.getColor(drawForeground),
                                    backgroundColor: this.getColor(drawBackground)
                                }
                            );
        
                            // If the end of row has been reached, start a new line.
                            if (++this.x === this.columns + 1) {
                                this.crlf();
                            }
                    }
                }
            }

            if (buffers++ % 1024 === 0) {
                await sleep(1);
                // console.log("sleep")
            }
        }
        this.complete();
    }

    async write(bytes, callback) {
        const WHITE = { r: 170, g: 170, b: 170 }
        const BLACK = { r: 0, g: 0, b: 0 }

        var buffers = 0;

        this.stream.buffer(bytes, callback)
        while (!this.stream.eof()) {
            // Obtain the current character <code>.
            var cc = this.stream.get();
            // var code = cc.charCodeAt(0);

            if (cc === 13) {
                this.cr()
            } else if (cc === 10) {
                this.lf()
            } else {
                this.callbacks.onLiteral(cc, this.x++ - 1, this.y - 1,
                    {
                        color: WHITE,
                        backgroundColor: BLACK
                    }
                );
            }

            if (buffers++ % 1024 === 0) {
                await sleep(1);
            }
        }
    }
}

class Stream {
    constructor(bytes = []) {
        this.callbacks = []
        this.pos = 0
        this.data = []
        this.buffer(bytes)
    }

    buffer(bytes = [], callback) {
        for (var i = 0; i < bytes.length; i++) {
            this.data.push(bytes[i])
        }
        if (callback) {
            this.callbacks[this.data.length - 1] = callback
        }
    }

    get() {
        if (this.pos >= this.data.length) {
            throw "Unexpected end of stream reached.";
        }
        const b = this.data[this.pos++]
        const callback = this.callbacks[this.pos + 1]
        if (callback) {
            callback()
        }
        return b;
    };

    eof() {
        return this.pos === this.data.length;
    };
}
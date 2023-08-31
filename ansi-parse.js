function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

var writes = 0;
const BLACK   = 0,
    RED     = 1,
    GREEN   = 2,
    YELLOW  = 3,
    BLUE    = 4,
    MAGENTA = 5,
    CYAN    = 6,
    WHITE   = 7,

    NONE      = 0x0,
    BRIGHT    = 0x1,
    UNDERLINE = 0x4,
    BLINK     = 0x5,
    REVERSE   = 0x7,
    INVISIBLE = 0x9,

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
    ],

    BINCOLORS = [
        [  0,   0,   0, 255],  // Black
        [  0,   0, 170, 255],  // Blue
        [  0, 170,   0, 255],  // Green
        [  0, 170, 170, 255],  // Cyan
        [170,   0,   0, 255],  // Red
        [170,   0, 170, 255],  // Magenta
        [170,  85,   0, 255],  // Yellow
        [170, 170, 170, 255],  // White

        // Bright:

        [ 85,  85,  85, 255],
        [ 85,  85, 255, 255],
        [ 85, 255,  85, 255],
        [ 85, 255, 255, 255],
        [255,  85,  85, 255],
        [255,  85, 255, 255],
        [255, 255,  85, 255],
        [255, 255, 255, 255]
    ]
    
function parseIntArray(array) {
    var i = array.length;
    while (i--) {
        array[i] = parseInt(array[i], 10);
    }
    return array;
}

cursor = {

    moveCursorBy: function (columns, rows) {
        this.column += columns;
        this.row += rows;

        // Enforce boundaries
        this.column = Math.max(this.column, 1);
        this.column = Math.min(this.column, 80);
        this.row = Math.max(this.row, 1);
        this.row = Math.min(this.row, 25);
    },

    // TODO 
    clearCanvas: function (options) {
        options.onLiteral.clear();
        // this.context.fillStyle = 'rgba(' + this.getColor(BLACK).toString() + ')';
        // this.context.fillRect(0, 0, 640, this.canvas.height);
        this.flags = NONE;
    },

    savePosition: function () {
        this.saved = {};
        this.saved.row = this.row;
        this.saved.column = this.column;
    },

    loadPosition: function () {
        this.column = this.saved.column;
        this.row = this.saved.row;
        // delete this.saved;
    },

    rgb: function(r,g,b,a) {
        return (a << 24) + (b << 16) + (g << 8) + (r);
    },
    getColor: function (code, bright) {
        const color = ANSICOLORS[bright ? code + 8 : code];
        return this.rgb(color[0], color[1], color[2], color[3])
    },

    resetColor: function () {
        this.foreground = WHITE;
        this.background = BLACK;
    },

    parse: async function (buffer, options) {
        // Position
        this.column     = 1;
        this.row        = 1;
        this.scrollback = 0;
        this.flags = NONE;

        // Graphic mode
        this.resetColor();

        var re = /(?:\x1b\x5b)([\?=;0-9]*?)([ABCDHJKfhlmnpsu])/g,
            pos = 0,
            opcode,
            args,
            match;

// DOS treats Ctrl-Z (SUB) as EOF. Some ANSI artists hid their alias in a file
// by placing it after the EOF.

        buffer = buffer.split(String.fromCharCode(0x1a), 1)[0];

        do {
            pos = re.lastIndex;
            match = re.exec(buffer);
            if (match !== null) {
                if (match.index > pos) {
                    this.write(buffer.slice(pos, match.index), options);
                }
                opcode = match[2];
                args = parseIntArray(match[1].split(';'));
                this.escape(opcode, args, options);
            }
            if (writes % 300 === 0) {
                console.log(cursor.scrollback);
                options.onLiteral.render(0, cursor.scrollback * -16);
                await sleep(10);
            }
        } while (re.lastIndex !== 0);

        if (pos < buffer.length) {
            this.write(buffer.slice(pos), options);
        }

        console.log(writes);
        options.onComplete.call(this.canvas, this);
        return this;
    },

    escape: function (opcode, args, options) {
        var arg, i, length;
        writes++;

        switch (opcode) {
        case 'A':  // Cursor Up
            arg = args[0] || 1;
            this.moveCursorBy(0, -arg);
            break;

        case 'B':  // Cursor Down
            arg = args[0] || 1;
            this.moveCursorBy(0, arg);
            break;

        case 'C':  // Cursor Forward
            arg = args[0] || 1;
            this.moveCursorBy(arg, 0);
            break;

        case 'D':  // Cursor Backward
            arg = args[0] || 1;
            this.moveCursorBy(-arg, 0);
            break;

        case 'f':  // Horizontal & Vertical Position
        case 'H':  // Cursor Position
            this.row = args[0];
            this.column = args[1] || 1;
            break;

        case 's':  // Save Cursor Position
            this.savePosition();
            break;

        case 'u':  // Restore Cursor Position
            this.loadPosition();
            break;

        case 'm':  // Set Graphics Rendition
            for (i = 0, length = args.length; i < length; i++) {
                arg = args[i];
                if (arg === NONE) {
                    this.flags = NONE;
                    this.resetColor();
                } else {
                    switch (Math.floor(arg / 10)) {
                    case 0:
                        this.flags |= arg;
                        break;
                    case 3:
                        this.foreground = arg - 30;
                        break;
                    case 4:
                        this.background = arg - 40;
                        break;
                    }
                }
            }
            break;

        case 'J':  // Erase Display
            if (args[0] === 2) {
                this.clearCanvas(options);
            }
            break;
        }
    },

    write: function (text, options) {
        var CR = 0x0d,
            LF = 0x0a,
            cursor = this,
            background,
            foreground,
            charcode,
            x,
            y,
            i,
            length;

        writes++;

        foreground = this.getColor(this.foreground, this.flags & BRIGHT);
        background = this.getColor(this.background);

        for (i = 0, length = text.length; i < length; i++) {
            charcode = text.charCodeAt(i);// & 0xff;  // truncate to 8 bits
            switch (charcode) {
            case CR:
                cursor.column = 1;
                break;

            case LF:
                cursor.column = 1;
                cursor.row++;
                break;

            default:
                x = (cursor.column - 1);
                y = (cursor.row + cursor.scrollback - 1);
                // y = (cursor.row - 1);
                // image_data = this.renderChar(charcode, foreground, background);
                // this.context.putImageData(image_data, x, y);
                options.onLiteral.buffer(charcode, x, y, { color: foreground, backgroundColor: background });
                // options.onLiteral.render();
                // options.onBuffer(charcode, x, y, { color: foreground, backgroundColor: background });

                if (cursor.column === 80) {
                    cursor.column = 1;
                    cursor.row++;
                } else {
                    cursor.column++;
                }
                break;
            }

// The value of 'row' represents current position relative to the top of the
// screen and therefore cannot exceed 25. Vertical scroll past the 25th line
// increments the scrollback buffer instead.

            if (cursor.row === 26) {
                // console.log("scrollback");
                cursor.scrollback++;
                cursor.column = 1;
                cursor.row--;
            }
        }
    }
};
import { jsANSI, ANSI, Decode } from './jsANSI-WebGL.js'

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

let ansi = new jsANSI(document.getElementById('canvas'), 80, 25)

const WHITE = { r: 170, g: 170, b: 170 }
const BLACK = { r: 0, g: 0, b: 0 }
const style = { color: WHITE, backgroundColor: BLACK }

class Parser {
    constructor() {
        this.columns = 80
        this.rows = 25

        this.x = 1
        this.y = 1
    }

    parse(cc) {
        if (cc === 13) { // CR
            this.x = 1
        } else if (cc === 10) { // LF
            if (this.y === this.rows - 1) {
                ansi.scroll();
            } else {
                ++this.y;
            }
        } else if (cc == 0x7f) { // DEL
            if (this.x > 1) { --this.x }
            ansi.buffer(0, this.x - 1, this.y - 1, style)
        } else {
            ansi.buffer(ansi.decode(cc, ANSI), this.x++ - 1, this.y - 1, style)
        }
    }
}

class Terminal {
    constructor() {
        this.data = []
        this.index = 0
        this.callbacks = new Map()

        this.onRead
        this.onInput 

        const self = this
        document.addEventListener('keydown', function(event) {
            console.log(event.code, event.key)
        
            let cc
            switch (event.code) {
                case 'Enter':
                    cc = 0x03
                    break
                case 'Backspace':
                    cc = 0x7f
                    break
                default:
                    if (event.key.length === 1) {
                        cc = event.key.charCodeAt(0)
                    }
            }
            if (cc) { self.onInput(cc) }
        });

        const read = () => {
            this.read()
            requestAnimationFrame(read)
        }
        requestAnimationFrame(read)
    }

    async write(bytes, onRead) {
        if (Number.isInteger(bytes)) { bytes = [bytes] }

        for (var i = 0; i < bytes.length; i++) {
            this.data.push(bytes[i])
        }

        if (onRead) {
            this.callbacks.set(this.data.length - 1, onRead)
        }

        if (this.data.length % (1024 * 128) === 0) {
            await sleep(10)
        }
    }

    async read() {
        while (this.index < this.data.length) {
            if (this.onRead) {
                this.onRead(this.data[this.index++])
            }
            
            if (this.callbacks.has(this.index - 1)) {
                this.callbacks.get(this.index - 1)(this.data)
            }

            if (this.index % (1024 * 128) === 0) {
                await sleep(10);
            }
        }
    }
}

const prompt = [...'\r\n$ '].map(c => c.charCodeAt(0))
let command = ''

const parser = new Parser()
const terminal = new Terminal()
terminal.onRead = (cc) => {
    if (cc == 0x03) {
        terminal.write(prompt)
    } else {
        parser.parse(cc)
    }
}
terminal.onInput = (cc) => {
    if (cc == 0x03) {
        if (command === 'loadtest') {
            loadtest()
        } else if (command === 'boxes') {
            boxes()
        }
        command = ''
        terminal.write(0x03)
    } else if (cc == 0x7f) {
        if (command.length > 0) {
            command = command.slice(0, -1)
            terminal.write(cc)
        }
    } else {
        command += String.fromCharCode(cc)
        terminal.write(cc)
    }
}
terminal.write(prompt)

function loadtest() {
    let testData = [];
    let byteCount = 0;
    for (let i = 0; i < 50; i++) {
        let count = 1 + Math.floor(Math.random() * 79);
        byteCount += count + 2;
        let data = new Uint8Array(count + 2);
        data[0] = 0x0A; // \n
        for (let i = 1; i < count + 1; i++) {
            data[i] = 0x61 + Math.floor(Math.random() * (0x7A - 0x61));
        }
        // End each line with \r so the cursor remains constant, this is what ls/tree do and improves
        // performance significantly due to the cursor DOM element not needing to change
        data[data.length - 1] = 0x0D; // \r
        testData.push(data);
    }
    let start = performance.now();
    for (let i = 0; i < 1024; i++) {
        for (const d of testData) {
            terminal.write(d);
        }
    }

    // Wait for all data to be parsed before evaluating time
    terminal.write([13,10,13,10], (data) => {
        terminal.write([...`Almost done`].map(c => c.charCodeAt(0)))
    });
    terminal.write([...'語❤️┘'].map(c => c.charCodeAt(0)), (data) => {
        let time = Math.round(performance.now() - start);
        let mbs = ((byteCount / 1024) * (1 / (time / 1000))).toFixed(2);
        // console.log(`\n\r\nWrote ${byteCount}kB in ${time}ms (${mbs}MB/s) eof(${data[data.length - 1]})`)
        terminal.write([...`\n\r\nWrote ${byteCount}kB in ${time}ms (${mbs}MB/s) eof(${data[data.length - 1]})`].map(c => c.charCodeAt(0)))
    });
}

function boxes() {
    var term = {
        write(s) { terminal.write([...s].map(c => c.charCodeAt(0))) }
    }
    term.write('Box styles:       ┎┰┒┍┯┑╓╥╖╒╤╕ ┏┳┓┌┲┓┌┬┐┏┱┐\n\r');
    term.write('┌─┬─┐ ┏━┳━┓ ╔═╦═╗ ┠╂┨┝┿┥╟╫╢╞╪╡ ┡╇┩├╊┫┢╈┪┣╉┤\n\r');
    term.write('│ │ │ ┃ ┃ ┃ ║ ║ ║ ┖┸┚┕┷┙╙╨╜╘╧╛ └┴┘└┺┛┗┻┛┗┹┘\n\r');
    term.write('├─┼─┤ ┣━╋━┫ ╠═╬═╣ ┏┱┐┌┲┓┌┬┐┌┬┐ ┏┳┓┌┮┓┌┬┐┏┭┐\n\r');
    term.write('│ │ │ ┃ ┃ ┃ ║ ║ ║ ┡╃┤├╄┩├╆┪┢╅┤ ┞╀┦├┾┫┟╁┧┣┽┤\n\r');
    term.write('└─┴─┘ ┗━┻━┛ ╚═╩═╝ └┴┘└┴┘└┺┛┗┹┘ └┴┘└┶┛┗┻┛┗┵┘\n\r');
    term.write('\n\r');
    term.write('Other:\n\r');
    term.write('╭─╮ ╲ ╱ ╷╻╎╏┆┇┊┋ ╺╾╴ ╌╌╌ ┄┄┄ ┈┈┈\n\r');
    term.write('│ │  ╳  ╽╿╎╏┆┇┊┋ ╶╼╸ ╍╍╍ ┅┅┅ ┉┉┉\n\r');
    term.write('╰─╯ ╱ ╲ ╹╵╎╏┆┇┊┋\n\r');
    term.write('\n\r');
    term.write('All box drawing characters:\n\r');
    term.write('─ ━ │ ┃ ┄ ┅ ┆ ┇ ┈ ┉ ┊ ┋ ┌ ┍ ┎ ┏\n\r');
    term.write('┐ ┑ ┒ ┓ └ ┕ ┖ ┗ ┘ ┙ ┚ ┛ ├ ┝ ┞ ┟\n\r');
    term.write('┠ ┡ ┢ ┣ ┤ ┥ ┦ ┧ ┨ ┩ ┪ ┫ ┬ ┭ ┮ ┯\n\r');
    term.write('┰ ┱ ┲ ┳ ┴ ┵ ┶ ┷ ┸ ┹ ┺ ┻ ┼ ┽ ┾ ┿\n\r');
    term.write('╀ ╁ ╂ ╃ ╄ ╅ ╆ ╇ ╈ ╉ ╊ ╋ ╌ ╍ ╎ ╏\n\r');
    term.write('═ ║ ╒ ╓ ╔ ╕ ╖ ╗ ╘ ╙ ╚ ╛ ╜ ╝ ╞ ╟\n\r');
    term.write('╠ ╡ ╢ ╣ ╤ ╥ ╦ ╧ ╨ ╩ ╪ ╫ ╬ ╭ ╮ ╯\n\r');
    term.write('╰ ╱ ╲ ╳ ╴ ╵ ╶ ╷ ╸ ╹ ╺ ╻ ╼ ╽ ╾ ╿\n\r');
    term.write('Box drawing alignment tests:\x1b[31m                                          █\n\r');
    term.write('                                                                      ▉\n\r');
    term.write('  ╔══╦══╗  ┌──┬──┐  ╭──┬──╮  ╭──┬──╮  ┏━━┳━━┓  ┎┒┏┑   ╷  ╻ ┏┯┓ ┌┰┐    ▊ ╱╲╱╲╳╳╳\n\r');
    term.write('  ║┌─╨─┐║  │╔═╧═╗│  │╒═╪═╕│  │╓─╁─╖│  ┃┌─╂─┐┃  ┗╃╄┙  ╶┼╴╺╋╸┠┼┨ ┝╋┥    ▋ ╲╱╲╱╳╳╳\n\r');
    term.write('  ║│╲ ╱│║  │║   ║│  ││ │ ││  │║ ┃ ║│  ┃│ ╿ │┃  ┍╅╆┓   ╵  ╹ ┗┷┛ └┸┘    ▌ ╱╲╱╲╳╳╳\n\r');
    term.write('  ╠╡ ╳ ╞╣  ├╢   ╟┤  ├┼─┼─┼┤  ├╫─╂─╫┤  ┣┿╾┼╼┿┫  ┕┛┖┚     ┌┄┄┐ ╎ ┏┅┅┓ ┋ ▍ ╲╱╲╱╳╳╳\n\r');
    term.write('  ║│╱ ╲│║  │║   ║│  ││ │ ││  │║ ┃ ║│  ┃│ ╽ │┃  ░░▒▒▓▓██ ┊  ┆ ╎ ╏  ┇ ┋ ▎\n\r');
    term.write('  ║└─╥─┘║  │╚═╤═╝│  │╘═╪═╛│  │╙─╀─╜│  ┃└─╂─┘┃  ░░▒▒▓▓██ ┊  ┆ ╎ ╏  ┇ ┋ ▏\n\r');
    term.write('  ╚══╩══╝  └──┴──┘  ╰──┴──╯  ╰──┴──╯  ┗━━┻━━┛           └╌╌┘ ╎ ┗╍╍┛ ┋  ▁▂▃▄▅▆▇█\n\r');
    term.write('Box drawing alignment tests:\x1b[32m                                          █\n\r');
    term.write('                                                                      ▉\n\r');
    term.write('  ╔══╦══╗  ┌──┬──┐  ╭──┬──╮  ╭──┬──╮  ┏━━┳━━┓  ┎┒┏┑   ╷  ╻ ┏┯┓ ┌┰┐    ▊ ╱╲╱╲╳╳╳\n\r');
    term.write('  ║┌─╨─┐║  │╔═╧═╗│  │╒═╪═╕│  │╓─╁─╖│  ┃┌─╂─┐┃  ┗╃╄┙  ╶┼╴╺╋╸┠┼┨ ┝╋┥    ▋ ╲╱╲╱╳╳╳\n\r');
    term.write('  ║│╲ ╱│║  │║   ║│  ││ │ ││  │║ ┃ ║│  ┃│ ╿ │┃  ┍╅╆┓   ╵  ╹ ┗┷┛ └┸┘    ▌ ╱╲╱╲╳╳╳\n\r');
    term.write('  ╠╡ ╳ ╞╣  ├╢   ╟┤  ├┼─┼─┼┤  ├╫─╂─╫┤  ┣┿╾┼╼┿┫  ┕┛┖┚     ┌┄┄┐ ╎ ┏┅┅┓ ┋ ▍ ╲╱╲╱╳╳╳\n\r');
    term.write('  ║│╱ ╲│║  │║   ║│  ││ │ ││  │║ ┃ ║│  ┃│ ╽ │┃  ░░▒▒▓▓██ ┊  ┆ ╎ ╏  ┇ ┋ ▎\n\r');
    term.write('  ║└─╥─┘║  │╚═╤═╝│  │╘═╪═╛│  │╙─╀─╜│  ┃└─╂─┘┃  ░░▒▒▓▓██ ┊  ┆ ╎ ╏  ┇ ┋ ▏\n\r');
    term.write('  ╚══╩══╝  └──┴──┘  ╰──┴──╯  ╰──┴──╯  ┗━━┻━━┛           └╌╌┘ ╎ ┗╍╍┛ ┋  ▁▂▃▄▅▆▇█\n\r');
}

function render() {
    ansi.render()
    requestAnimationFrame(render)
}
requestAnimationFrame(render)
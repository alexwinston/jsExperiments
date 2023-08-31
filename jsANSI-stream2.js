import { jsANSI, ANSI, Encode, Decode } from './jsANSI-WebGL.js'

let ansi = new jsANSI(document.getElementById('canvas'), 80, 25)

// https://learn.microsoft.com/en-us/windows/console/console-virtual-terminal-sequences
// https://en.wikipedia.org/wiki/ANSI_escape_code
// https://github.com/NuSkooler/ansi-bbs-utils/blob/master/docs/reference/bansi.txt
let parser = new Parser(ansi.columns, ansi.rows, {
    onLiteral: (charCode, x, y, style) => { ansi.buffer(ansi.decode(charCode, ANSI), x, y, style) },
    // onLiteral: (charCode, x, y, style) => { ansi.buffer(charCode, x, y, style) },
    onClear: () => { ansi.clear() },
    onScroll: () => { ansi.scroll() },
    onComplete: () => {  }
})

const bbs1 = { url: "wss://xibalba.l33t.codes:44512", decode: (data) => Decode.uint8(data) }
const bbs2 = { url: "ws://bbs.throwbackbbs.com:1123/bbs.throwbackbbs.com/23", decode: (data) => Decode.uint8(data) }

const bbs3 = { url: "wss://p-us-east.ftelnet.ca/SysopSolaris.ddns.net/2323", decode: (data) => Decode.utf8(data) }
const bbs4 = { url: "wss://p-us-west.ftelnet.ca/20ForBeers.com/1337", decode: (data) => Decode.utf8(data) }
const bbs5 = { url: "wss://p-us-east.ftelnet.ca/blackflag.acid.org/23", decode: (data) => Decode.utf8(data) }
const bbs6 = { url: "wss://proxy-nl.ftelnet.ca/bbs.erb.pw/23", decode: (data) => Decode.uint8(data) }
const bbs7 = { url: "ws://p-us-east.ftelnet.ca/83.229.3.34/23", decode: (data) => [...data].map(c => c.charCodeAt(0)) }

const bbs = bbs6
let socket = new WebSocket(bbs.url)
socket.binaryType = "arraybuffer";
socket.onopen = async function() {
}
socket.onmessage = async function(event) {
    // await parser.parse(bbs.decode(event.data), { send: () => {} });
    await parser.parse(bbs.decode(event.data), socket);
};

document.addEventListener('keydown', async function(event) {
    console.log(event.code, event.key)

    var response
    switch (event.code) {
        case 'ArrowUp':
            response = [...`\x1b[A`]
            break
        case 'ArrowDown':
            response = [...`\x1b[B`]
            break
        case 'ArrowRight':
            response = [...`\x1b[C`]
            break
        case 'ArrowLeft':
            response = [...`\x1b[D`]
            break
        case 'Enter':
            response = [...`\r`]
            break
        case 'Escape':
            response = [...`\x1b`]
            break
        case 'Tab':
            response = [...`	`]
            break
        case 'Backspace':
            response = [...`\x08`]
            break
        default:
            if (event.key.length === 1) {
                response = [...`${event.key}`]
            }
    }

    if (response) {
        await socket.send(Encode.uint8(response))
    }
});

function update() {
    ansi.render()
    requestAnimationFrame(update)
}
requestAnimationFrame(update)
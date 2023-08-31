import { jsANSI, ANSI, Decode } from './jsANSI-WebGL.js'

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// TODO https://16colo.rs/pack/fuel28/us-rrr.ans
// const response = await fetch('https://raw.githubusercontent.com/PhMajerus/ANSI-art/master/Lode%20Runner.ans');
// const response = await fetch('./assets/tnt-w1zr.ans');
// const response = await fetch('./assets/tnt-lx7.ans');
// https://16colo.rs/pack/acdu0993/CE-UNDR2.ANS
// const response = await fetch('./assets/CE-UNDR2.ANS');
// const response = await fetch('./assets/ROY-COMI.ANS');
// const response = await fetch('./assets/PG-HELLO.ANS');
// const response = await fetch('./assets/fuel22-nfo.ANS');
// const response = await fetch('./assets/cl!-elt.ANS');
const response = await fetch('./assets/13-INFO.utf8ANS');
var reader = response.body.pipeThrough(new TextDecoderStream('UTF-8')).getReader();
// var reader = response.body.pipeThrough(new TextDecoderStream('ISO-8859-1')).getReader();
var data2 =
`    Xterm.js is the frontend component that powers many terminals including
                           \x1b[3mVS Code\x1b[0m, \x1b[3mHyper\x1b[0m and \x1b[3mTheia\x1b[0m!

 ┌ \x1b[1mFeatures\x1b[0m ──────────────────────────────────────────────────────────────────┐
 │                                                                            │
 │  \x1b[31;1mApps just work                         \x1b[32mPerformance\x1b[0m                        │
 │   Xterm.js works with most terminal      Xterm.js is fast and includes an  │
 │   apps like bash, vim and tmux           optional \x1b[3mWebGL renderer\x1b[0m           │
 │                                                                            │
 │  \x1b[33;1mAccessible                             \x1b[34mSelf-contained\x1b[0m                     │
 │   A screen reader mode is available      Zero external dependencies        │
 │                                                                            │
 │  \x1b[35;1mUnicode support                        \x1b[36mAnd much more...\x1b[0m                   │
 │   Supports CJK 語 and emoji \u2764\ufe0f            \x1b[3mLinks\x1b[0m, \x1b[3mthemes\x1b[0m, \x1b[3maddons\x1b[0m,            │
 │                                          \x1b[3mtyped API\x1b[0m, \x1b[3mdecorations\x1b[0m            │
 │                                                                            │
 └────────────────────────────────────────────────────────────────────────────┘
 \n\x1b[38;2;35;194;40m\x1b[48;2;255;0;0mHello\x1b[7m there!\x1b[0m\n
`.replace(/\n/g,'\r\n')

let ansi = new jsANSI(document.getElementById('canvas'), 80, 25)

// https://en.wikipedia.org/wiki/ANSI_escape_code
let parser = new Parser(ansi.columns, ansi.rows, {
    onLiteral: (charCode, x, y, style) => { ansi.buffer(ansi.decode(charCode, ANSI), x, y, style) },
    // onLiteral: (charCode, x, y, style) => { ansi.buffer(charCode, x, y, style) },
    onClear: () => { ansi.clear() },
    onScroll: () => { ansi.scroll() },
    // onComplete: () => { console.log("onComplete") }
    onComplete: () => { }
})

// https://developer.chrome.com/articles/fetch-streaming-requests/
while (true) {
    const { value, done } = await reader.read()
    if (done) break
    parser.parse(value)
}

function update() {
    ansi.render()
    requestAnimationFrame(update)
}
requestAnimationFrame(update)
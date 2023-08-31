import { jsANSI, Observable, Text } from './jsANSI-WebGL.js'
import anime from './anime.es.js';

class TestView {
  constructor(test, ansi) {
    this.t1 = new Text(test.name.value, 0, 3)
    this.t1.click.on(event => {
      test.progress()
      this.ansi.draw()
    })
    this.t2 = new Text(test.percent.value, 0, 4)
    this.t2.bind(test.percent)
    this.t2.formatter = (string) => `${string}%`

    this.test = test

    this.ansi = ansi
    this.ansi.add(this.t1)
    this.ansi.add(this.t2)
  }

}

var canvas = document.getElementById('canvas')
var ansi = new jsANSI(canvas, 120, 30)

var o1 = {
    name: new Observable('Testing'),
    // name: new Observable(String.fromCharCode(219, 220, 219, 220)),
    percent: new Observable(0),
    progress: function() {
      this.percent.value += 1
    }
}

const v1 = new TestView(o1, ansi)

const t1 = new Text(o1.name.value, 0, 0)
t1.click.on(event => {
  o1.progress()
  ansi.draw()
})

const t2 = new Text(o1.percent.value, 0, 1)
t2.formatter = (text) => `${text}%`

ansi.add(t1)
ansi.add(t2)

o1.name.subscribe(name => t1.text = name)
o1.name.value = 'Testing'
// `
//                   ▄            ▄
//                    █▄           █▄                        ▄
//                    ▓██▄         ▓██▄                    ▄███▄  ▄▄
//  ▒ ░░░ ░░░░░░░░░  ▓█████▄ ░░░░ ▓█████▄  ░░▒▓▓▓▓██▓▓█▀ ▄███████▄ ▀████▓▓▓▓▓▒▒▓██
//    EX0         ▄▄████████▀  ▄▄██████▀ ▄█▀░▒▀▀▀▀▀▀▀▀ ▄█████ ▀▀███▄ ▀▀▀▀▀▀▀▀▀▀▀▀
//     ▄▄▄▄█▓▀ ▄█████████▓▀ ▄█████████▓ ██▌  ▄▄█████▄ ▀████▓ ▄█  .▀▀█▄  ▄▄▒ 1997
//  ▄███▓▓▀█▌▄███▀▀▀█████▌▄████▀▀█████▌▄▄▄ ▄█████▀█▓██▄ ██▓ ▄▄▄ ▄██▄▄▄▓ ██▓▓███▄▄
// ▐██▓▀▀  ▓▌██▀   ▒▓▀███▐████  ▒▓███▓ ██▓▐███▀    ▀▓▀ ███▌ ▓██  ███████▄▀██▀▀████
// ▐███░░  █▌██░    ▒▓███▐█▓█▒   ▒▓███ ██▓▐███░       ▀███▌ ▐▓█    ▀█████▌▀    █▓█
// ▐███▒  ░█▌██▒░░   ▓███▐███▒   ░▓███ ██▓▐███▒░░     ░███▌ ▐██     ▐████▌     ▐▓█
//  ▓██▓▒ ▒█▌██▓▒    ▒▓██▐███▓   ░▒▓██ ▐██ ███▓▒      ░███  ▀ ▀    ░▓████▌   ░░▓▓█
//   ▀██▓ ▄█▓▀███▄ ░▒▒▓██ ▀███▓ ░▒▒▓██ ▄ ▀▄ ███▓▄   ▄█░███  ▄█▓▄  ░▓█████▌    ▒▓██
//  █▄ ▀▀▓██▓▒ ▀▀█▄▄▓▓███▄  ▀▓█▄▄▓▓███ ▓█▄▓ ■████▄▄▓█▓▒███ ▐█▓▒▒ ▓██████▀    ▄▓██▀
//  ███    ▀▀▓▄░   ▀▀▀▀▀▀▓▄▄   ▀▀▀▀▀██  ▀█▓▒░  ▀▀▀▀▀▀ ███▀  ▀█▓▒ ▒▓██▀▀ ▄█   ██▀ ▄
//  ███▄       ▀■           ▀░       ▀▀▄  ▀■        ▄██▀▀     ▀▀■        ▀■    ▄██
//  █████▄ ─ ── ─── ──── ───── ─── A d d i c t i o n ─── ──── ──── ─── ── ─ ▄█████
// `


o1.percent.subscribe(percent => t2.text = percent)

ansi.draw()

const target = {
  a: 1,
  b: 2,
  c: 3
};

const handler = {
  get: function(target, name) {
    return (
      name in target ? target[name] : 42
    );
  }
};

const proxy = new Proxy(target, handler);

console.log(proxy.a);  // 1
console.log(proxy.b);  // 2
console.log(proxy.c);  // 3
console.log(proxy.meaningOfLife);  // 42
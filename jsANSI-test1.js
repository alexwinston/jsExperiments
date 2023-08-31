import { jsANSI, Text, rgba } from './jsANSI-WebGL.js'

var ansi = new jsANSI(document.getElementById('canvas'), 120, 40, "2d")
// var text = new Text('Test', 10, 5)
// ansi.add(text)
// ansi.draw()

var colors = [
    rgba(0,0,0,1),
    rgba(170,0,0,1),
    rgba(0,170,0,1),
    rgba(255,255,255,1),
];

function random() {
    const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890!@#$%^&*()☠☃⚙☻♞☭✈✟✂✯░ ▓█▄▀▒┌─└┘┐│"
    var min = 0;
    var max = chars.length;
    return chars[Math.floor(Math.random() * (max - min + 1)) + min]
}

function update() {
    ansi.objects.length = 0
    for (var y = 0; y < ansi.rows; y++) {
        for (var x = 0; x < ansi.columns; ) {
            ansi.add(new Text(random(), x++, y, { color: colors[0], backgroundColor: colors[1] }));
            ansi.add(new Text(random(), x++, y, { color: colors[2], backgroundColor: colors[3] }));
        }
    }
    ansi.draw()
    requestAnimationFrame(update)
}

requestAnimationFrame(update)
// setInterval(() => { update() }, 100);
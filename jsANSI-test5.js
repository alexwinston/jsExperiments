import { jsANSI, Rectangle, rgba } from './jsANSI-WebGL.js'
import anime from './anime.es.js';

var ansi = new jsANSI(document.getElementById('canvas'), 120, 30, "2d")

var rects = []
for (var i = 0; i < 6; i++) {
    rects[i] = []
    for (var j = 0; j < 14; j++) {
        var rect = new Rectangle(j*8, i*8, 7, 7, { color: rgba(25,25,25,1) })
        rects[i][j] = rect

        ansi.add(rect)
    }
}

anime({
    targets: rects,
    scaleX: [
        {value: .1, easing: 'easeOutSine', duration: 500},
        {value: 1, easing: 'easeInOutQuad', duration: 1200}
    ],
    scaleY: [
        {value: .1, easing: 'easeOutSine', duration: 500},
        {value: 1, easing: 'easeInOutQuad', duration: 1200}
    ],
    delay: anime.stagger(200, {grid: [14, 6], from: 'center'}),
    loop: true
});

ansi.add(new Rectangle(5, 10, 2, 2))
ansi.add(new Rectangle(5, 25, 2, 2))
ansi.add(new Rectangle(5, 40, 2, 2))

var r1 = new Rectangle(5, 10, 2, 2, { color: rgba(200,0,0,1) })
r1.animeX = 40
ansi.add(r1)
var r2 = new Rectangle(5, 25, 2, 2, { color: rgba(0,200,0,1) })
r2.animeX = 20
ansi.add(r2)
var r3 = new Rectangle(5, 40, 2, 2, { color: rgba(0,0,200,1) })
r3.animeX = 60
ansi.add(r3)

ansi.draw()

anime({
    targets: [r1,r2,r3],
    x: function(t) {
        return t.animeX
    },
    y: function(t, i) {
        return 40 + (-15 * i);
    },
    scaleX: function(t, i, l) {
        return i * 3 + 3
    },
    scaleY: function(t, i, l) {
        return i * 3 + 3
    },
    angle: function() { return anime.random(0, 360); },
    duration: function() { return anime.random(1200, 1800); },
    delay: function() { return anime.random(0, 400); },
    direction: 'alternate',
    loop: true,
    update: function() {
        ansi.draw()
    }
});
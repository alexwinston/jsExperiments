import { jsANSI, Rectangle, Triangle, Circle } from './jsANSI-WebGL.js'
import anime from './anime.es.js';

var ansi = new jsANSI(document.getElementById('canvas'), 40, 20)

for (var i = 0; i < 40; i+=10) {
    for (var j = 0; j < 40; j+=10) {
        var r = i >= 20 ? new Rectangle(i, j, 7, 7) : new Triangle(i, j, 7, 7)
        ansi.add(r)
        anime({
            targets: r,
            angle: 360,
            round: 1,
            easing: 'easeInOutQuad',
            direction: 'alternate',
            loop: true
        });
    }
}

var rectangle = new Rectangle(0, 0, 20, 10)
ansi.add(rectangle)
var rectangle2 = new Rectangle(0, 30, 5, 3)
ansi.add(rectangle2)
ansi.draw()

anime({
    targets: rectangle,
    x: [rectangle.x, ansi.columns - 5],
    y: [rectangle.y, ansi.rows * 2 - 5],
    angle: 360,
    round: 1,
    delay: 400,
    duration: 10000,
    easing: 'easeInOutQuad',
    direction: 'alternate',
    loop: true,
    update: function() {
        ansi.draw()
    }
});

anime({
    targets: rectangle2,
    width: 40,
    round: 1,
    easing: 'easeInOutQuad',
    direction: 'alternate',
    loop: true
});

var circle = new Circle(20, 20, 10)
ansi.add(circle)

anime({
    targets: circle,
    radius: 20,
    round: 1,
    easing: 'easeInOutQuad',
    direction: 'alternate',
    loop: true
});
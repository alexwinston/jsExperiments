import { Circle, jsANSI, Line, Rectangle, rgba, Triangle } from './jsANSI-WebGL.js'
import anime from './anime.es.js';

var ansi = new jsANSI(document.getElementById('canvas'), 120, 30)

// const l1 = new Line(1, 1, 10, 10)
// ansi.add(l1)

const c1 = new Circle(20, 20, 5)
ansi.add(c1)

anime({
    targets: c1,
    radius: 20,
    round: 1,
    easing: 'easeInOutQuad',
    direction: 'alternate',
    loop: true
});

const r1 = new Rectangle(2, 2, 3, 3,)
ansi.add(r1)

const t1 = new Triangle(10, 10, 7, 7, { color: rgba(170,0,0,1), backgroundColor: rgba(0,170,0,1) })
// t1.angle = 70
ansi.add(t1)

ansi.draw()

anime({
    targets: [r1, t1],
    angle: 360,
    round: 1,
    easing: 'easeInOutQuad',
    direction: 'alternate',
    loop: true,
    update: function() {
        ansi.draw()
    }
});
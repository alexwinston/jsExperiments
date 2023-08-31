import { Circle, jsANSI, Point, Bezier, Rectangle, rgba } from './jsANSI-WebGL.js'
import anime from './anime.es.js';


var ansi = new jsANSI(document.getElementById('canvas'), 120, 30)

// const l1 = new Line(1, 1, 10, 10)
// ansi.add(l1)

const c1 = new Circle(9, 4, 3)
ansi.add(c1)

const b1 = new Bezier(0, 0, [new Point(1, 40), new Point(8, 0), new Point(17, 40 )])
ansi.add(b1)

const b2 = new Bezier(0, 0, [new Point(9, 1), new Point(6, 1), new Point(6, 4)], { color: rgba(170,0,0,1) })
ansi.add(b2)

const b3 = new Bezier(0, 0, [new Point(6, 4), new Point(6, 7), new Point(9, 7)], { color: rgba(170,0,0,1) })
ansi.add(b3)

const b4 = new Bezier(0, 0, [new Point(9, 7), new Point(12, 7), new Point(12, 4)], { color: rgba(170,0,0,1) })
ansi.add(b4)

const b5 = new Bezier(0, 0, [new Point(1, 14), new Point(3, 14), new Point(75, 14)], { color: rgba(170,0,0,1) })
ansi.add(b5)

const r1 = new Rectangle(1, 42, 16, 10)
ansi.add(r1)

const b6 = new Bezier(0, 0, [new Point(40, 50), new Point(60, -10), new Point(50, 50)], { color: rgba(0,0,170,1) })
ansi.add(b6)

ansi.draw()

anime({
    targets: c1,
    x: 20,
    round: 1,
    easing: 'easeInOutQuad',
    direction: 'alternate',
    loop: true
});

anime({
    targets: b5.points[1],
    y: 0,
    round: 1,
    easing: 'easeInOutQuad',
    direction: 'alternate',
    loop: true
});

anime({
    targets: b6.points[2],
    x: 39,
    round: 1,
    easing: 'easeInOutQuad',
    direction: 'alternate',
    loop: true
});

anime({
    targets: b1.points[1],
    y: -30,
    round: 1,
    easing: 'easeInOutQuad',
    direction: 'alternate',
    duration: 10000,
    loop: true
});

anime({
    targets: b1.points[2],
    x: 75,
    round: 1,
    easing: 'easeInOutQuad',
    direction: 'alternate',
    duration: 10000,
    loop: true,
    update: function() {
        ansi.draw()
    }
});
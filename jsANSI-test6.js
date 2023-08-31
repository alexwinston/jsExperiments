import { Circle, jsANSI, Line, Rectangle, rgba, Triangle } from './jsANSI-WebGL.js'
import anime from './anime.es.js';

const rectangle = [[0, 0], [0, 1], [1, 1], [1, 0]];
const bounds = geometric.polygonBounds(rectangle);
console.log(bounds)

var ansi = new jsANSI(document.getElementById('canvas'), 120, 30)
ansi.add(new Rectangle(0, 0, ansi.columns, ansi.rows * 2, { color: rgba(0,0,170,1) }))
ansi.add(new Rectangle(5, 10, 10, 5))
ansi.add(new Rectangle(5, 40, 6, 6))
ansi.add(new Rectangle(7, 49, 3, 3))

let r1 = new Rectangle(15, 5, 7, 7)
r1.angle = 30
ansi.add(r1)

let r2 = new Rectangle(45, 40, 15, 15)
r2.angle = 30
ansi.add(r2)

let t1 = new Triangle(20, 20, 7, 7)
ansi.add(t1)

let t2 = new Triangle(40, 10, 15, 20)
// t2.angle = 105
ansi.add(t2)

let c1 = new Circle(10, 25, 7)
ansi.add(c1)

let l1 = new Line(30-2, 30, 33-2, 24)
ansi.add(l1)

let l2 = new Line(33, 24, 30, 30)
ansi.add(l2)

ansi.draw()

var animation = anime({
    targets: [r1,t1,t2,c1],
    angle: 360,
    round: 1,
    easing: 'easeInOutQuad',
    direction: 'alternate',
    loop: true,
    autoplay: false,
    update: function() {
        ansi.draw()
    }
});

function update(t) {
    animation.tick(t);
//     // r1.angle += 1
//     // t1.angle += 1
//     // t2.angle += 1
    ansi.draw()
    requestAnimationFrame(update);
}
requestAnimationFrame(update);
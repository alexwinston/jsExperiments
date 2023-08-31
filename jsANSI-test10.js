import { Circle, jsANSI, Point, Line, Bezier, Bezier4, Rectangle, rgba } from './jsANSI-WebGL.js'
import anime from './anime.es.js';

var ansi = new jsANSI(document.getElementById('canvas'), 200, 80)

class Letter {
    constructor(x, y, shapes) {
        this._x = x
        this._y = y
        this.origin = new Point(0, 0)
        this.translate = new Point(0, 0)
        this._scale = new Point(1, 1)

        this.shapes = []
        for (var shape of shapes(this.x, this.y)) {
            this.shapes.push(shape)
            ansi.add(shape)
        }
    }

    get x() {
        return this._x
    }
    set x(x) {
        if (this._x === x)
            return
        this._x = x
        for (var shape of this.shapes) {
            shape.x = x
        }
    }

    get y() {
        return this._y
    }
    set y(y) {
        if (this._y === y) return
        this._y = y
        for (var shape of this.shapes) {
            shape.y = y
        }
    }

    get originX() {
        return this.origin.x
    }
    set originX(x) {
        if (this.origin.x === x) return
        this.origin.x = x
        for (var shape of this.shapes) {
            shape.originX = x
        }
    }

    get originY() {
        return this.origin.y
    }
    set originY(y) {
        if (this.origin.y === y) return
        this.origin.y = y
        for (var shape of this.shapes) {
            shape.originY = y
        }
    }

    get translateX() {
        return this.translate.x
    }
    set translateX(x) {
        if (this.translate.x === x) return
        this.translate.x = x
        for (var shape of this.shapes) {
            shape.translateX = x
        }
    }

    get translateY() {
        return this.translate.y
    }
    set translateY(y) {
        if (this.translate.y === y) return
        this.translate.y = y
        for (var shape of this.shapes) {
            shape.translateY = y
        }
    }

    get scale() {
        return this._scale
    }
    set scale(scale) {
        this.scaleX = this.scaleY = scale
    }

    get scaleX() {
        return this.scale.x
    }
    set scaleX(x) {
        x *= 0.2
        if (this.scale.x === x) return
        this.scale.x = x
        for (var shape of this.shapes) {
            shape.scaleX = x
        }
    }

    get scaleY() {
        return this.scale.y
    }
    set scaleY(y) {
        y *= 0.2
        if (this.scale.y === y) return
        this.scale.y = y
        for (var shape of this.shapes) {
            shape.scaleY = y
        }
    }
}

// https://css-tricks.com/svg-path-syntax-illustrated-guide/
class Path {
    constructor() {
        this.x = 0
        this.y = 0
        this.prevCtrl = new Point(0,0)
        this.shapes = []
    }

    M(x, y) {
        this.x = x
        this.y = y
        return this
    }

    h(x) {
        this.shapes.push(new Line(this.x, this.y, this.x += x, this.y))
        return this
    }

    L(x, y) {
        this.shapes.push(new Line(this.x, this.y, this.x = x, this.y = y))
        return this
    }

    c(ctrl, ctrl2, p2) {
        const cPt = new Point(this.x, this.y)
        const ePt = new Point(this.x + p2.x, this.y + p2.y)
        const sCtrl = new Point(this.x + ctrl.x, this.y + ctrl.y)
        const eCtrl = new Point(this.x + ctrl2.x, this.y + ctrl2.y)

        this.shapes.push(
            new Bezier4(this.x, this.y, [
                new Point(cPt.x, cPt.y),
                new Point(sCtrl.x, sCtrl.y),
                new Point(eCtrl.x, eCtrl.y),
                // Purple
                new Point(this.x = ePt.x, this.y = ePt.y)], { color: rgba(150,70,255,1) })
        )

        this.prevCtrl.x = eCtrl.x
        this.prevCtrl.y = eCtrl.y

        return this
    }

    Q(ctrl, p2) {
        const rX = this.x + (this.x - this.prevCtrl.x)
        const rY = this.y + (this.y - this.prevCtrl.y)
        const sCtrl = new Point(rX, rY)

        return this.C(sCtrl, ctrl, p2)
    }

    C(ctrl, ctrl2, p2) {
        this.shapes.push(
            new Bezier4(this.x, this.y, [
                new Point(this.x, this.y),
                new Point(ctrl.x, ctrl.y),
                new Point(ctrl2.x, ctrl2.y),
                // Blue
                new Point(this.x = p2.x, this.y = p2.y)], { color: rgba(50,170,255,1) })
        )

        this.prevCtrl.x = ctrl2.x
        this.prevCtrl.y = ctrl2.y

        return this
    }

    v(y) {
        this.shapes.push(new Line(this.x, this.y, this.x, this.y += y))
        return this
    }

    V(y) {
        this.shapes.push(new Line(this.x, this.y, this.x, this.y = y))
        return this
    }

    H(x) {
        this.shapes.push(new Line(this.x, this.y, this.x = x, this.y))
        return this
    }

    s(ctrl, p2) {
        const cPt = new Point(this.x, this.y)
        const ePt = new Point(this.x + p2.x, this.y + p2.y)
        // https://www.mathwarehouse.com/transformations/point-reflection/formula-and-examples.php
        const rX = this.x + (this.x - this.prevCtrl.x)
        const rY = this.y + (this.y - this.prevCtrl.y)
        const sCtrl = new Point(rX, rY)
        const eCtrl = new Point(this.x + ctrl.x, this.y + ctrl.y)

        this.shapes.push(
            new Bezier4(this.x, this.y, [
                new Point(cPt.x, cPt.y),
                new Point(sCtrl.x, sCtrl.y),
                new Point(eCtrl.x, eCtrl.y),
                new Point(this.x = ePt.x, this.y = ePt.y)])
        )

        this.prevCtrl.x = eCtrl.x
        this.prevCtrl.y = eCtrl.y
        return this
    }

    T(p2) {
        const rX = this.x + (this.x - this.prevCtrl.x)
        const rY = this.y + (this.y - this.prevCtrl.y)
        const sCtrl = new Point(rX, rY)

        return this.Q(sCtrl, p2)
    }
}

const b1 = new Bezier4(0, 0, [new Point(3, 5), new Point(3, 8), new Point(8, 8), new Point(8, 5)])
b1.originX = 3
b1.originY = 5
b1.scaleX = b1.scaleY = 8
ansi.add(b1)

const t = new Letter(0, 0, (x,y) => new Path()
    .M(25,75)
    .Q(new Point(50,150), new Point(75,100))
    .T(new Point(150,150))
    .shapes
)
t.scaleX = t.scaleY = 0.5

const a = new Letter(0, 0, (x,y) => new Path()
    .M(30,20)
    .h(130)
    .c(new Point(9.996,0), new Point(10,40), new Point(10,60))
    .v(140)
    .H(41)
    .c(new Point(-11.004,0), new Point(-11,-40), new Point(-11,-60))
    .s(new Point(-0.004,-60), new Point(10,-60))
    .h(110)
    .shapes
)

a.originX = 40
a.originY = 220
a.translateX = -10
// a.translateY = -120
// a.scaleX = 0.2
// a.scaleY = 0.1

// anime({
//     targets: a,
//     scaleX: [.2, 1],
//     scaleY: [.1, .5],
//     // translateX: 10,
//     // translateY: -120,
//     // easing: 'spring(.2, 200, 3, 60)',
//     easing: 'easeInOutQuad',
//     direction: 'alternate',
//     duration: 1000,
//     loop: true
// });


const n = new Letter(0, 0, (x,y) => new Path()
    .M(170,220)
    .V(60)
    .c(new Point(0,-31.046), new Point(-8.656,-40), new Point(-19.333,-40))
    .H(49.333)
    .C(new Point(38.656,20), new Point(30,28.954), new Point(30,60))
    .v(160)
    .shapes
)
n.originX = 40
n.originY = 220
n.translateX = 20

// i M30 100v120

// m M310,220 L310,60 C310,28.954305 301.344172,20 290.666667,20 C241.555556,20 254.832031,20 170,20 C85.1679688,20 98.4444444,20 49.3333333,20 C38.6558282,20 30,28.954305 30,60 L30,220
const m = new Letter(0, 0, (x,y) => new Path()
    .M(310,220)
    .L(310,60)
    .C(new Point(310,28.954305), new Point(301.344172,20), new Point(290.666667,20))
    // .C(new Point(241.555556,20), new Point(254.832031,20), new Point(170,20))
    .C(new Point(241.555556,20), new Point(254.832031,110), new Point(170,110))
    // .C(new Point(85.1679688,20), new Point(98.4444444,20), new Point(49.3333333,20))
    .C(new Point(85.1679688,110), new Point(98.4444444,20), new Point(49.3333333,20))
    .C(new Point(38.6558282,20), new Point(30,28.954305), new Point(30,60))
    .L(30,220)
    .shapes
)
m.translateX = 60
m.scaleX = 0.2
m.scaleY = 0.1

const e = new Letter(0, 0, (x,y) => new Path()
    .M(50,140)
    .h(110)
    .c(new Point(10,0), new Point(10,-40), new Point(10,-60))
    .s(new Point(0,-60), new Point(-10,-60))
    .H(40)
    .c(new Point(-10,0), new Point(-10,40), new Point(-10,60))
    .v(80)
    .c(new Point(0,20), new Point(0,60), new Point(10,60))
    .h(130)
    .shapes
)
e.translateX = 118
e.scaleX = 0.2
e.scaleY = 0.1

const dot = new Letter(0, 0, (x,y) => new Path()
    .H(40)
    .V(40)
    .H(0)
    .V(0)
    .shapes
)
dot.translateX = 100
dot.translateY = -200

anime.timeline({
    easing: 'easeOutSine'
})
.add({
    targets: [a, n],
    // transformOrigin: ['50% 100% 0px', '50% 100% 0px'],
    translateY: [
      {value: [-80, -160], duration: 190, endDelay: 20, easing: 'cubicBezier(0.225, 1, 0.915, 0.980)'},
      {value: -104, duration: 120, easing: 'easeInQuad'},
      {value: -100, duration: 120, easing: 'easeOutQuad'}
    ],
    scaleX: [
      {value: [.25, .85], duration: 190, easing: 'easeOutQuad'},
      {value: 1.08, duration: 120, delay: 85, easing: 'easeInOutSine'},
      {value: 1, duration: 260, delay: 25, easing: 'easeOutQuad'}
    ],
    scaleY: [
      {value: [.3, .8], duration: 120, easing: 'easeOutSine'},
      {value: .35, duration: 120, delay: 180, easing: 'easeInOutSine'},
      {value: .57, duration: 180, delay: 25, easing: 'easeOutQuad'},
      {value: .5, duration: 190, delay: 15, easing: 'easeOutQuad'}
    ],
    delay: anime.stagger(80)
}, 1000)
.add({
    targets: dot,
    opacity: { value: 1, duration: 100 },
    translateY: 50,
    scaleY: [4, .7],
    scaleX: { value: 1.3, delay: 100, duration: 200},
    duration: 280,
    easing: 'cubicBezier(0.350, 0.560, 0.305, 1)'
}, '-=290')
.add({
    targets: '.letter-m .line',
    easing: 'easeOutElastic(1, .8)',
    duration: 600,
    d: function(el) { return el.dataset.d2 },
}, '-=140')
.add({
    targets: [a, n],
    translateX: -30,
    easing: 'easeOutElastic(1, .6)',
    duration: 800,
    delay: anime.stagger(40, {from: 2.5}),
}, '-=600')
.add({
    targets: dot,
    // translateX: bouncePath('x'),
    // translateY: bouncePath('y'),
    angle: { value: '1turn', duration: 790 },
    scaleX: { value: 1, duration: 50, easing: 'easeOutSine' },
    scaleY: [
      { value: [1, 1.5], duration: 50, easing: 'easeInSine' },
      { value: 1, duration: 50, easing: 'easeOutExpo' }
    ],
    easing: 'cubicBezier(0, .74, 1, .255)',
    duration: 800
}, '-=1273')
.add({
    targets: [a, n, dot],
    scaleY: [
      {value: .4, duration: 150, easing: 'easeOutQuart'},
      {value: .5, duration: 800, easing: 'easeOutElastic(1, .5)'}
    ],
    delay: anime.stagger(60, {from: 'center'})
}, '-=1090')
.add({
    targets: [a, n],
    translateY: [
      {value: -120, easing: 'easeOutQuad', duration: 100},
      {value: -100, easing: 'easeOutElastic(1, .9)', duration: 450}
    ],
    opacity: {value: [0.001, 1], duration: 50},
    duration: 500
  }, '-=970')

function update() {
    ansi.draw()
    requestAnimationFrame(update)
}
update()
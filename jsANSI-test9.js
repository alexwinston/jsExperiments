import { Circle, jsANSI, Point, Line, Bezier, Rectangle, rgba } from './jsANSI-WebGL.js'
import anime from './anime.es.js';
// https://github.com/chrvadala/transformation-matrix


var ansi = new jsANSI(document.getElementById('canvas'), 200, 80)

class Letter {
    constructor(x, y, shapes) {
        this._x = x
        this._y = y
        this.origin = new Point(0, 0)
        this.translate = new Point(0, 0)
        this.scale = new Point(1, 1)

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

    get scaleX() {
        return this.scale.x
    }
    set scaleX(x) {
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
        if (this.scale.y === y) return
        this.scale.y = y
        for (var shape of this.shapes) {
            shape.scaleY = y
        }
    }
}

class Path {
    constructor() {
        this.x = 0
        this.y = 0
        this.ctrl = new Point(0,0)
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

    c(ctrl, ctrl2, p2) {
        return ctrl.y === 0 ? this.c1(ctrl, ctrl2, p2) : this.c2(ctrl, ctrl2, p2)
    }

    C(ctrl, ctrl2, p2) {
        this.shapes.push(
            new Bezier(this.x, this.y, [
                new Point(this.x, this.y),
                new Point(ctrl.x, ctrl.y), 
                new Point(this.x = p2.x, this.y = p2.y)])
        )
        return this
    }

    c1(ctrl, ctrl2, p2) {
        this.ctrl.x = (this.x + ctrl.x)
        this.ctrl.y = (this.y + ctrl.y)

        this.shapes.push(
            new Bezier(this.x, this.y, [
                new Point(this.x, this.y),
                new Point(this.ctrl.x, this.ctrl.y), 
                new Point(this.x + ctrl2.x, this.y + ctrl2.y)])
        )
        
        this.shapes.push(new Line(this.x + ctrl2.x, this.y + ctrl2.y, this.x += p2.x, this.y += p2.y))

        // TODO Relfection logic?
        this.ctrl.x = this.x
        this.ctrl.y = this.y - ctrl2.y

        return this
    }

    c2(ctrl, ctrl2, p2) {
        this.shapes.push(new Line(this.x, this.y, this.x + ctrl.x, this.y + ctrl.y))

        this.ctrl.x = (this.x + ctrl2.x)
        this.ctrl.y = (this.y + ctrl2.y)

        this.shapes.push(
            new Bezier(this.x, this.y, [
                new Point(this.x, this.y),
                new Point(this.ctrl.x, this.ctrl.y), 
                new Point(this.x += p2.x, this.y += p2.y)])
        )

        // TODO Relfection logic?
        this.ctrl.x = this.x
        this.ctrl.y = this.y + ctrl2.y

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
        this.shapes.push(
            new Line(this.x, this.y, this.ctrl.x + ctrl.x, this.ctrl.y + ctrl.y)
        )
        this.shapes.push(
            new Bezier(0, 0, [
                new Point(this.ctrl.x + ctrl.x, this.ctrl.y + ctrl.y),
                new Point(this.x + ctrl.x, this.y + ctrl.y),
                new Point(this.x += p2.x, this.y += p2.y)
            ])
        )
        return this
    }
}

// https://svg-path-visualizer.netlify.app/#M30%2020h130c9.996%200%2010%2040%2010%2060v140H41c-11.004%200-11-40-11-60s-.004-60%2010-60h110
// const a = new Letter(15, 40, (x, y) => [
//     new Line(x, y, x = x + 65, y),
//     new Bezier(x, y, [new Point(x, y), new Point(x + 5, y), new Point(x = x + 5, y = y + 20)]),
//     new Line(x, y, x, y = y + 80),
//     new Line(x, y, x = 20, y),
//     new Bezier(x, y, [new Point(x, y), new Point(x - 5, y), new Point(x = x - 5, y = y - 20)]),
//     new Line(x, y, x, y = y - 20),
//     new Bezier(x, y, [new Point(x, y), new Point(x, y - 20), new Point(x = x + 5, y = y - 20)]),
//     new Line(x, y, x = x + 55, y)
// ])
const a = new Letter(0, 0, (x,y) => new Path()
    .M(15,0)
    .h(65)
    .c(new Point(5,0), new Point(5,20), new Point(5,30))
    .v(70)
    .H(20)
    .c(new Point(-5,0), new Point(-5,-20), new Point(-5,-30))
    .s(new Point(0,-30), new Point(5,-30))
    .h(55)
    .shapes
)
a.originX = 35
a.originY = 70
a.scaleX = 0.5
a.scaleY = 0.5

// M170 220V60c0-31.046-8.656-40-19.333-40H49.333C38.656 20 30 28.954 30 60v160
const n = new Letter(0, 0, (x,y) => new Path()
    .M(85, 100)
    .V(30)
    // .c(new Point(0,-15), new Point(-4,-20), new Point(-10,-20))
    .C(new Point(85,0), new Point(-1,-1), new Point(70,0))
    .H(25)
    .C(new Point(15,0), new Point(15,15), new Point(15,30))
    .v(70)
    .shapes
)
n.originX = 35
n.translateX = 50
n.scaleX = 0.5
n.scaleY = 0.5

const e = new Letter(0, 0, (x,y) => new Path()
    .M(25,60)
    .h(55)
    .c(new Point(5,0), new Point(5,-20), new Point(5,-30))
    .s(new Point(0,-30), new Point(-5,-30))
    .H(20)
    .c(new Point(-5,0), new Point(-5,20), new Point(-5,30))
    .v(40)
    .c(new Point(0,10), new Point(0,30), new Point(5,30))
    .h(65)
    .shapes
)
e.originX = 35
e.translateX = 100
e.scaleX = 0.5
e.scaleY = 0.5

for (var shape of new Path().c(new Point(0,10), new Point(0,30), new Point(5,30)).shapes) {
    shape.translateX = shape.translateY = 3
    shape.scaleX = shape.scaleY = 0.5
    ansi.add(shape)
}


// const t1 = new Line(20,20,50,30)
// const t1 = new Bezier(0, 0, [new Point(20, 20), new Point(25, 20), new Point(25, 40)])
// ansi.add(t1)
// anime({
//     targets: a,
//     scaleX: [.2, .8],
//     scaleY: [.1, .5],
//     translateX: 10,
//     translateY: 5,
//     // round: 1,
//     easing: 'easeInOutQuad',
//     direction: 'alternate',
//     duration: 1000,
//     loop: true
// });

anime({
    targets: [a, n, e],
    // transformOrigin: ['50% 100% 0px', '50% 100% 0px'],
    originY: [54, 154],
    translateY: [
        {value: [150, -60], duration: 190, endDelay: 20, easing: 'cubicBezier(0.225, 1, 0.915, 0.980)'},
        {value: 54, duration: 120, easing: 'easeInQuad'},
        {value: 50, duration: 120, easing: 'easeOutQuad'}
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
    // round: 1,
    easing: 'easeInOutQuad',
    // direction: 'alternate',
    duration: 1000,
    // loop: true
});

function update() {
    ansi.draw()
    requestAnimationFrame(update)
}
update()
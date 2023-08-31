function rgba(r, g, b, a = 1) {
    return { r: r, g: g, b: b };
}

class Encode {
    static uint8(data) {
        const bytes = new Uint8Array(data.length)

        data.forEach((c, i) => {
            bytes[i] = c.charCodeAt(0)
        })
        return bytes
    }
}

class Decode {
    static uint8(data) {
        return new Uint8Array(data)
        // return new Uint8Array([...new TextDecoder().decode(new Uint8Array([...data].map(c => c.charCodeAt(0))))].map(c => c.charCodeAt(0))) 
    }

    static utf8(data) {
        return [...new TextDecoder().decode(new Uint8Array([...data].map(c => c.charCodeAt(0))))].map(c => c.charCodeAt(0))
    }
}

const ANSI = [
    0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
    0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
    0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
    0,0,0,0,0,0,0,0,0,0,0,199,252,233,226,228,224,229,231,234,235,232,239,238,236,
    196,197,201,230,198,244,246,242,251,249,255,214,220,162,163,165,8359,402,225,
    237,243,250,241,209,170,186,191,8976,172,189,188,161,171,187,9617,9618,9619,
    9474,9508,9569,9570,9558,9557,9571,9553,9559,9565,9564,9563,9488,9492,9524,
    9516,9500,9472,9532,9566,9567,9562,9556,9577,9574,9568,9552,9580,9575,9576,
    9572,9573,9561,9560,9554,9555,9579,9578,9496,9484,9608,9604,9612,9616,9600,
    945,223,915,960,931,963,181,964,934,920,937,948,8734,966,949,8745,8801,177,
    8805,8804,8992,8993,247,8776,176,8729,183,8730,8319,178,9632,160
];

class jsANSI {
    constructor(canvas, columns, rows) {
        const jsANSI = this

        this.canvas = canvas
        this.canvas.addEventListener("mousedown", function(event) {
            let rect = canvas.getBoundingClientRect()
            let x = event.clientX - rect.left
            let y = event.clientY - rect.top
            jsANSI.clicked(x, y)
        });

        this.columns = columns
        this.rows = rows

        this.bounds = new Frame({ width: this.columns, height: this.rows })

        this.width = columns
        this.height = rows

        this.buffered = false
        this.renderer = new Viewport(this.canvas, this.width, this.height)

        this.objects = []
    }

    add(object) {
        this.objects.push(object)
    }

    clicked(x, y) {
        this.objects.forEach(object => {
            const px = Math.floor(x / 8)
            const py = Math.floor(y / 16)
            object.clicked(px, py, this.bounds)
        })
    }

    dirty() {
        const objects = this.objects
        for (var i = 0; i < objects.length; i++) {
            if (objects[i].dirty) {
                return true
            }
        }
        return false
    }

    decode(charCode, codePage) {
        var c = charCode > 127 ? codePage[charCode] : charCode
        if (c === null || c === undefined) { c = charCode }
        return c;
    }

    buffer(charCode, x, y, style) {
        const columns = this.columns
        const rows = this.rows
        if (x < 0 || x >= columns || y < 0 || y >= rows) {
            return
        }

        this.buffered = true;

        const color = style.color
        const bgColor = style.backgroundColor

        const tile = Tile(charCode, color.r, color.g, color.b, bgColor.r, bgColor.g, bgColor.b);
		this.renderer.unsafePut(tile, x, y);
    }

    scroll() {
        this.renderer.scroll()
    }

    clear() {
        this.renderer.clear()
        this.buffered = true;
    }

    render() {
        if (this.buffered) {
            this.renderer.render()
        }
        this.buffered = false;
    }

    draw(clear = true) {
        if (!this.dirty()) {
            return
        }

        if (clear) {
            this.clear();
        }

        const objects = this.objects
        for (var i = 0; i < objects.length; i++) {
            const object = objects[i]
            if (object.dirty) {
                object.pointCache.clear()
                object.update()
                object.dirty = false
            }
            object.draw(this, this.bounds)
        }

        this.render()
    }
}

// https://blog.jeremylikness.com/blog/client-side-javascript-databinding-without-a-framework/
class Observable {
    constructor(value) {
      this._listeners = [];
      this._value = value;
    }

    notify() {
      this._listeners.forEach(listener => listener(this._value));
    }

    subscribe(listener) {
      this._listeners.push(listener);
    }

    get value() {
      return this._value;
    }

    set value(value) {
      if (value !== this._value) {
        this._value = value;
        this.notify();
      }
    }
}

class Frame {
    constructor(frame) {
        this.x = frame?.x ?? 0
        this.y = frame?.y ?? 0
        this.width = frame?.width ?? 0
        this.height = frame?.height ?? 0
    }

    contains(x, y) {
        return this.x <= x && this.x + this.width >= x &&
            this.y <= y && this.y + this.height >= y
    }

    offset(x, y) {
        return new Frame({ x: this.x + x, y: this.y + y, width: this.width, height: this.height })
    }
}

class Listener {
    constructor() {
        this.callbacks = []
    }

    on(callback) {
        this.callbacks.push(callback);
    }

    did(event) {
        this.callbacks.forEach(callback => callback(event))
    }
}

class Style {
    constructor(style) {
        this.color = style?.color ?? rgba(211,215,207,1)
        this.backgroundColor = style?.backgroundColor ?? rgba(0,0,0,1)
        this.fill = style?.fill ?? true
    }
}

class Object {
    constructor(x, y, style) {
        this.x = x
        this.y = y
        this.width = 0
        this.height = 0
        this.frame = new Frame()
        // TODO Refactor bounds to not depend on MAX_VALUE
        this.bounds = new Frame({ x:Number.MAX_VALUE, y:Number.MAX_VALUE })
        this.style = new Style(style)
        this.pointCache = new Map()
        this.click = new Listener()
        this.dirty = true
    }

    get dirty() {
        return this._dirty
    }
    set dirty(dirty) {
        this._dirty = dirty
    }

    // TODO Convert to Point
    get x() {
        return this._x
    }
    set x(x) {
        if (this._x == x)
            return
        this.dirty = true
        this._x = x
    }

    get y() {
        return this._y
    }
    set y(y) {
        if (this._y == y)
            return
        this.dirty = true
        this._y = y
    }

    get width() {
        return this._width;
    }
    set width(width) {
        if (this._width == width)
            return
        this.dirty = true
        this._width = width
    }

    get height() {
        return this._height;
    }
    set height(height) {
        if (this._height == height)
            return
        this.dirty = true
        this._height = height
    }

    update() {
    }

    clicked(x, y) {
    }

    fill(x, y) {
        if (this.pointCache.has(x)) {
            if (this.pointCache.get(x).get(y))
                return
        }

        this.cachePoint(x, y)

        const bounds = this.bounds
        if (x-1 > bounds.x)
            this.fill(x-1,y)
        if (x+1 < bounds.x + bounds.width)
            this.fill(x+1,y)
        if (y-1 > bounds.y)
            this.fill(x,y-1)
        if (y+1 < bounds.y + bounds.height)
            this.fill(x,y+1)
    }

    cachePoint(x, y) {
        if (x > 300) {
            throw new Error("Invalid cachePoint")
        }
        const pointCache = this.pointCache
        if (!pointCache.has(x)) {
            pointCache.set(x, new Map())
        }
        const pointCacheX = pointCache.get(x)

        const charCode = (y % 2 == 0) ?
            (pointCacheX.has(y + 1) ? 9608 : 9600) :
            (pointCacheX.has(y - 1) ? 9608 : 9604)
        // const charCode = (y % 2 == 0) ?
        //     (pointCacheX.has(y + 1) ? 219 : 223) :
        //     (pointCacheX.has(y - 1) ? 219 : 220)

        pointCacheX.set(y, charCode)
    }

    renderPoint(ansi, charCode, x, y) {
        ansi.buffer(charCode, x, Math.floor(y/2), this.style)
    }

    draw(ansi) {
        throw new Error('Method is abstract');
    }
}

class View extends Object {
    constructor(x, y, width, height) {
        super(x, y)
        this.width = width
        this.height = height
        this.objects = []
    }

    get dirty() {
        if (super.dirty) {
            return true
        }

        for (let i = 0; i < this.objects.length; i++) {
            const object = this.objects[i]
            if (object.dirty) {
                return true
            }
        }
        return false
    }
    set dirty(dirty) {
        super.dirty = dirty
        if (super.dirty) {
            this.objects?.forEach(object => {
                object.dirty = true
            })
        }
    }

    add(object) {
        this.objects.push(object)
        return object
    }

    clicked(x, y, frame) {
        this.objects.forEach(object => {
            object.clicked(x, y, frame.offset(this.x, this.y))
        })
    }

    // TODO??? Move to Object
    draw(ansi, frame) {
        for (let i = 0; i < this.objects.length; i++) {
            const object = this.objects[i]
            if (object.dirty) {
                object.pointCache.clear()
                object.update()
                object.dirty = false
            }
            object.draw(ansi, frame.offset(this.x, this.y))
        }
        // this.objects.forEach(object => object.draw(ansi, frame.offset(this.x, this.y)))
    }
}

// TODO??? Rename to Label
class Text extends Object {
    constructor(text, x, y, style) {
        super(x, y, style)
        this._text = text
        this.formatter = (text) => `${text}`
    }

    get text() {
        return this.formatter(this._text)
    }
    set text(text) {
        if (this._text == text)
            return
        super.dirty = true
        this._text = text
    }

    bind(observable) {
        observable.subscribe(text => this.text = text)
    }

    clicked(x, y, frame) {
        const formatted = this.text

        const offset = frame.offset(this.x, this.y)
        if (offset.x <= x && offset.x + formatted.length > x && offset.y == y) {
            this.click.did({ x:x, y:y })
        }
    }

    draw(ansi, frame) {
        const formatted = this.text

        var x = frame.x + this.x
        var y = frame.y + this.y

        for (var i = 0; i < formatted.length; i++) {
            const charCode = formatted.charCodeAt(i)
            // TODO??? Newline
            // if (charCode === 10) {
                // x = this.x, y++
            // } else {
                ansi.buffer(charCode, +x++, y, this.style)
            // }
        }
    }
}

class Shape extends Object {
    constructor(x, y, width, height, style) {
        super(x, y, style)

        this.width = width - 1
        this.height = height - 1
        this.closed = true

        this.origin = new Point(0, 0)
        this.translate = new Point(0, 0)
        this.scale = new Point(1, 1)
        this.angle = 0
    }

    get width() {
        return super.width * this.scale.x;
    }
    set width(width) {
        super.width = width
    }

    get height() {
        return super.height * this.scale.y;
    }
    set height(height) {
        super.height = height
    }

    get originX() {
        return this.origin.x
    }
    set originX(x) {
        this.dirty = true
        this.origin.x = x
    }

    get originY() {
        return this.origin.y
    }
    set originY(y) {
        this.dirty = true
        this.origin.y = y
    }

    get translateX() {
        return this.translate.x
    }
    set translateX(x) {
        this.dirty = true
        this.translate.x = x
    }

    get translateY() {
        return this.translate.y
    }
    set translateY(y) {
        this.dirty = true
        this.translate.y = y
    }

    get scaleX() {
        return this.scale.x
    }
    set scaleX(x) {
        this.dirty = true
        this.scale.x = x
    }

    get scaleY() {
        return this.scale.y
    }
    set scaleY(y) {
        this.dirty = true
        this.scale.y = y
    }

    get angle() {
        return this._angle
    }
    set angle(angle) {
        if (this._angle == angle)
            return
        this.dirty = true
        this._angle = angle
    }

    radians(degrees) {
        return degrees * (Math.PI / 180);
    }

    rotatePoint(cx, cy, angle, p) {
        const s = Math.sin(angle);
        const c = Math.cos(angle);

        // translate point back to origin:
        p.x -= cx;
        p.y -= cy;

        // rotate point
        const xnew = p.x * c - p.y * s;
        const ynew = p.x * s + p.y * c;

        // translate point back:
        p.x = Math.round(xnew + cx);
        p.y = Math.round(ynew + cy);
        return p;
    }
}

class Bezier extends Shape {
    constructor(x, y, points, style) {
        super(x, y, 0, 0, style)

        this.points = []
        points.forEach(point => this.points.push(point))

        this.pixels = []
    }

    get type() {
        return 3
    }

    get dirty() {
        if (super.dirty) return true
        for (var i = 0; i < this.points.length; i++) {
            if (this.points[i].dirty) {
                return true
            }
        }
        return false
    }
    set dirty(dirty) {
        super.dirty = dirty
        if (!dirty) {
            this.points.forEach(point => point.dirty = false)
        }
    }

    add(point) {
        this.points.push(point)
    }

    update() {
        const pixels = this.pixels
        pixels.length = 0

        let matrix = Matrix.compose(
            Matrix.translate(this.translate.x,this.translate.y),
            // Matrix.rotate(Math.PI/2),
            Matrix.scale(this.scale.x, this.scale.y, this.origin.x, this.origin.y)
        );
          
        const points = this.points.map(
            (point) => Point.from(Matrix.apply(matrix, {x: point.x, y: point.y}))
        )

        if (this.angle != 0) {
            const radians = this.radians(this.angle)
            // TODO Frame offset
            // const center = new Point(this.x + (this.width / 2), this.y + (this.height / 2)).offset(frame.x, frame.y)
            const center = new Point(this.x + (this.width / 2), this.y + (this.height / 2))
            for (var i = 0; i < points.length; i++) {
                this.rotatePoint(center.x, center.y, radians, points[i])
            }
        }

        // TODO Calculate based on width
        const t = 1/250
        for (var j = 0; j < points.length / this.type; j++) {
            for (var i = 0; i <= 1; i+=t) {
                const p = this.bezier(i, j, points)
                pixels.push(p)

                if (i > 0) {
                    const previous = pixels[pixels.length - 2]
                    if (previous.x == p.x && previous.y == p.y) {
                        pixels.pop()
                    }
                }

                // this.cachePoint(Math.round(p.x), Math.round(p.y));
            }
            pixels.push(points[(j * this.type) + this.type - 1])

            const smoothed = this.smooth(pixels)
            for (var i = 0; i < smoothed.length; i++) {
                const p = smoothed[i]
                this.cachePoint(p.x, p.y)
            }
            // smoothed.forEach(p => this.cachePoint(p.x, p.y));
        }
    }

    // https://rickyhan.com/jekyll/update/2018/11/22/pixel-art-algorithm-pixel-perfect.html
    smooth(path) {
        const smoothed = []

        for (var c = 0; c < path.length; ++c) {
          if (c > 0 && c+1 < path.length
            && (path[c-1].x == path[c].x || path[c-1].y == path[c].y)
            && (path[c+1].x == path[c].x || path[c+1].y == path[c].y)
            && path[c-1].x != path[c+1].x
            && path[c-1].y != path[c+1].y)
          {
            ++c
          }

          smoothed.push(path[c])
        }

        return smoothed
    }

    bezier(i, j, points) {
        return this.bezier3(i, points[j*3], points[(j*3)+1], points[(j*3)+2])
    }

    // http://members.chello.at/~easyfilter/bresenham.html
    // https://cantwell-tom.medium.com/custom-bezier-tool-for-pixel-art-164fd8caeb6a
    bezier3(t, p0, c1, p2) {
        const ut = 1 - t
        const x = (p0.x * ut + c1.x * t) * ut + (c1.x * ut + p2.x * t) * t
        const y = (p0.y * ut + c1.y * t) * ut + (c1.y * ut + p2.y * t) * t

        return { x:Math.round(x), y:Math.round(y) }
    }

    // https://stackoverflow.com/questions/15397596/find-all-the-points-of-a-cubic-bezier-curve-in-javascript
    bezier4(t, p0, c1, c2, p3) {
        const ut = 1 - t

        const b0 = ut**3
        const b1 = 3 * t * ut**2
        const b2 = 3 * t**2 * ut
        const b3 = t**3

        const x = (b0 * p0.x) + (b1 * c1.x) + (b2 * c2.x) + (b3 * p3.x)
        const y = (b0 * p0.y) + (b1 * c1.y) + (b2 * c2.y) + (b3 * p3.y)

        return { x:Math.round(x), y:Math.round(y) }
    }

    draw(ansi) {
        this.pointCache.forEach((columns, x) => {
            columns.forEach((charCode, y) => {
                this.renderPoint(ansi, charCode, x, y)
            })
        })
    }
}

class Bezier4 extends Bezier {
    constructor(x, y, points, style) {
        super(x, y, points, style)
    }
    
    get type() {
        return 4
    }

    bezier(i, j, points) {
        return this.bezier4(i, points[j*4], points[(j*4)+1], points[(j*4)+2], points[(j*4)+3])
    }
}

class Polygon extends Shape {
    constructor(x, y, width, height, style) {
        super(x, y, width, height, style)
        this.points = []
    }

    // https://classic.csunplugged.org/wp-content/uploads/2014/12/Lines.pdf
    line(x, y, x1, y1) {
        this.cachePoint(x, y)
        const dx = Math.abs(x1 - x),
            dy = Math.abs(y1 - y),
            sx = x < x1 ? 1 : -1,
            sy = y < y1 ? 1 : -1
        let err = dx - dy;

        while (x != x1 || y != y1) {
            const e2 = 2 * err;
            if (e2 > (dy * -1)) {
                err -= dy;
                x += sx;
            }
            if (e2 < dx) {
                err += dx;
                y += sy;
            }

            this.cachePoint(x, y)
        }
    }

    draw(ansi, frame) {
        const points = this.points.map(point => point.offset(frame.x, frame.y))

        // if (this.angle != 0) {
            const radians = this.radians(this.angle)
            const center = new Point(this.x + (this.width / 2), this.y + (this.height / 2)).offset(frame.x, frame.y)
            for (var i = 0; i < points.length; i++) {
                this.rotatePoint(center.x, center.y, radians, points[i])
            }
        // }

        let minX = Number.MAX_VALUE;
        let maxX = -Number.MAX_VALUE;
        let minY = Number.MAX_VALUE;
        let maxY = -Number.MAX_VALUE;

        for (var i = 0; i < points.length; i++) {
            const point1 = points[i]
            const point2 = points[i == points.length - 1 ? 0 : i + 1]

            if (i < points.length - 1) {
                this.line(point1.x, point1.y, point2.x, point2.y)
            } else {
                if (this.closed) {
                    this.line(point1.x, point1.y, point2.x, point2.y)
                }
            }

            const x = point1.x;
            const y = point1.y;
            minX = Math.min(minX, x);
            maxX = Math.max(maxX, x);
            minY = Math.min(minY, y);
            maxY = Math.max(maxY, y);
        }

        const width = maxX - minX;
        const height = maxY - minY;

        this.bounds.x = minX
        this.bounds.y = minY
        this.bounds.width = width
        this.bounds.height = height

        const x = Math.round(minX + (width / 2))
        const y = Math.round(minY + (height / 2))

        if (this.closed && this.style.fill) {
            for (var i = this.bounds.x + 1; i < this.bounds.x + this.bounds.width; i++) {
                for (var j = this.bounds.y + 1; j < this.bounds.y + this.bounds.height; j++) {
                    if (this.isPointInPoly(points, {x:i, y:j}) && !this.pointCache.get(i).has(j)) {
                        this.fill(i,j)
                        i, j = Number.MAX_VALUE
                    }
                }
            }
        }

        this.pointCache.forEach((columns, x) => {
            columns.forEach((charCode, y) => {
                this.renderPoint(ansi, charCode, x, y)
            })
        })
    }

    isPointInPoly(poly, pt) {
        for(var c = false, i = -1, l = poly.length, j = l - 1; ++i < l; j = i)
            ((poly[i].y <= pt.y && pt.y < poly[j].y) || (poly[j].y <= pt.y && pt.y < poly[i].y))
            && (pt.x < (poly[j].x - poly[i].x) * (pt.y - poly[i].y) / (poly[j].y - poly[i].y) + poly[i].x)
            && (c = !c);
        return c;
    }
}

class Line extends Polygon {
    constructor(x, y, x2, y2, style) {
        super(x, y, Math.abs(x2 - x), Math.abs(y2 - y), style)
        this.x2 = x2
        this.y2 = y2
        this.closed = false
    }

    update() {
        let matrix = Matrix.compose(
            Matrix.translate(this.translate.x,this.translate.y),
            // Matrix.rotate(Math.PI/2),
            Matrix.scale(this.scale.x, this.scale.y, this.origin.x, this.origin.y)
        );
          
        const p1 = Matrix.apply(matrix, {x: this.x, y: this.y})
        const p2 = Matrix.apply(matrix, {x: this.x2, y: this.y2})

        const points = this.points
        points[0] = new Point(p1.x, p1.y)
        points[1] = new Point(p2.x, p2.y)
        // console.log(points)
    }
}

class Point {
    constructor(x, y) {
        this._x = x
        this._y = y
        this.dirty = true
    }

    get x() {
        return this._x
    }
    set x(x) {
        if (this._x == x)
            return
        this.dirty = true
        this._x = x
    }

    get y() {
        return this._y
    }
    set y(y) {
        if (this._y == y)
            return
        this.dirty = true
        this._y = y
    }

    offset(x, y) {
        return new Point(this.x + x, this.y + y)
    }

    transform(p, translate, scale) {
        return new Point(
            p.x + ((this.x + translate.x) - p.x) * scale.x,
            p.y + ((this.y + translate.y) - p.y) * scale.y
        )
    }

    static from(point) {
        return new Point(point.x, point.y)
    }
}

class Rectangle extends Polygon {
    constructor(x, y, width, height, style) {
        super(x, y, width, height, style)
    }

    update() {
        const x = this.x, y = this.y
        const width = this.width, height = this.height
        const points = this.points
        points[0] = new Point(x, y)
        points[1] = new Point(x + width, y)
        points[2] = new Point(x + width, y + height)
        points[3] = new Point(x, y + height)
    }
}

class Triangle extends Polygon {
    constructor(x, y, width, height, style) {
        super(x, y, width, height, style)
    }

    update() {
        const x = this.x, y = this.y
        const width = this.width, height = this.height
        const points = this.points
        points[0] = new Point(x + (width / 2), y)
        points[1] = new Point(x + width, y + height)
        points[2] = new Point(x, y + height)
    }
}

class Circle extends Shape {
    constructor(x, y, radius, style) {
        super(x, y, radius * 2, radius * 2, style)
        this.radius = radius
    }

    get radius() {
        return this._radius * this.scale.x;
    }
    set radius(radius) {
        if (this._radius == radius)
            return
        this.dirty = true
        this._radius = radius
        this.width = radius * 2
        this.height = radius * 2
    }

    draw(ansi) {
        const cX = this.x, cY = this.y, r = this.radius
        let x = this.radius, y = 0;

        // Printing the initial point
        // on the axes after translation
        this.cachePoint(x + cX, y + cY);

        // When radius is zero only a single
        // point will be printed
        if (r > 0) {
            this.cachePoint(-x + cX, y + cY);
            this.cachePoint(cX, -x + cY);
            this.cachePoint(cX, x + cY);
        }

        // Initialising the value of P
        let P = 1 - r;
        while (x > y) {
            y++;

            // Mid-point is inside or on the perimeter
            if (P <= 0)
                P = P + 2 * y + 1;

            // Mid-point is outside the perimeter
            else {
                x--;
                P = P + 2 * y - 2 * x + 1;
            }

            // All the perimeter points have already
            // been printed
            if (x < y)
                break;

            // Printing the generated point and its
            // reflection in the other octants after
            // translation
            this.cachePoint(x + cX, y + cY);
            this.cachePoint(-x + cX, y + cY);
            this.cachePoint(x + cX, -y + cY);
            this.cachePoint(-x + cX, -y + cY);

            // If the generated point is on the
            // line x = y then the perimeter points
            // have already been printed
            if (x != y) {
                this.cachePoint(y + cX, x + cY);
                this.cachePoint(-y + cX, x + cY);
                this.cachePoint(y + cX, -x + cY);
                this.cachePoint(-y + cX, -x + cY);
            }
        }

        this.bounds.x = this.x - this.radius
        this.bounds.y = this.y - this.radius
        this.bounds.width = this.radius * 2
        this.bounds.height = this.radius * 2

        if (this.style.fill) {
            this.fill(cX,cY)
        }

        this.pointCache.forEach((columns, x) => {
            columns.forEach((charCode, y) => {
                this.renderPoint(ansi, charCode, x, y)
            })
        })
    }
}

function Tile(ch, r, g, b, br, bg, bb) {
    return [ch || NULLCHAR, r, g, b, br, bg, bb]
}

// class Tile {
//     constructor(ch, r, g, b, br, bg, bb) {
//         this.ch = ch || NULLCHAR;
//         this.r = r;
//         this.g = g;
//         this.b = b;
//         this.br = br;
//         this.bg = bg;
//         this.bb = bb;
//     }
// }

const NULLCHAR = " ";
const CSSCLASS = "jsANSI";
const NULLTILE = Tile();

class Viewport {
    constructor(elem, w, h, renderer) {
        this.elem = elem;
        this.w = w;
        this.h = h;
    
        // Add CSS class if not added already
        if (elem.className.indexOf(CSSCLASS) === -1) {
            if (elem.className.length === 0) elem.className = CSSCLASS;
            else elem.className += " " + CSSCLASS;
        }
    
        // Create two 2-dimensional array to hold the viewport tiles
        this.buffer = [];
        for (var j = 0; j < h; ++j) {
            this.buffer[j] = [];
            for (var i = 0; i < w; ++i) {
                this.buffer[j][i] = NULLTILE;
            }
        }

        this.renderer = new WebGLRenderer(this);
		this.updateStyle();
    }

    updateStyle(updateRenderer) {
		var s = window.getComputedStyle(this.elem, null);
		if (updateRenderer !== false)
			this.renderer.updateStyle(s);
	};

    put(tile, x, y) {
        if (x < 0 || y < 0 || x >= this.w || y >= this.h) return;
        this.buffer[y][x] = tile;
    };

    unsafePut(tile, x, y) {
        this.buffer[y][x] = tile;
    };

    putString(str, x, y, r, g, b, br, bg, bb) {
        var len = str.length;
        var tile;
        if (x < 0 || y < 0) return;
        for (var i = 0; i < len; ++i) {
            if (x >= this.w) { x = 0; ++y;}
            if (y >= this.h) return;
            tile = Tile(str[i], r, g, b, br, bg, bb);
            this.unsafePut(tile, x, y);
            ++x;
        }
    };

    get(x, y) {
        // if (x < 0 || y < 0 || x >= this.w || y >= this.h) return NULLTILE;
        return this.buffer[y][x];
    };

    scroll() {
        this.buffer.shift()
        this.buffer[this.h - 1] = []
    };

    clear() {
        for (var j = 0; j < this.h; ++j) {
            for (var i = 0; i < this.w; ++i) {
                this.buffer[j][i] = NULLTILE;
            }
        }
        this.renderer.clear();
    };

    render() {
        this.renderer.render();
    };
}

const ratio = window.devicePixelRatio;

const VERTEX_SHADER = [
    "attribute vec2 position;",
    "attribute vec2 texCoord;",
    "attribute vec3 color;",
    "attribute vec3 bgColor;",
    "attribute float charIndex;",
    "uniform vec2 uResolution;",
    "uniform vec2 uTileCounts;",
    "uniform vec2 uPadding;",
    "varying vec2 vTexCoord;",
    "varying vec3 vColor;",
    "varying vec3 vBgColor;",

    "void main() {",
        "vec2 tileCoords = floor(vec2(mod(charIndex, uTileCounts.x), charIndex / uTileCounts.x));",
        "vTexCoord = (texCoord + tileCoords) / uTileCounts;",
        "vTexCoord += (0.5 - texCoord) * uPadding;",
        "vColor = color;",
        "vBgColor = bgColor;",
        "vec2 pos = position / uResolution * 2.0 - 1.0;",
        "gl_Position = vec4(pos.x, -pos.y, 0.0, 1.0);",
    "}"
].join('\n');

const FRAGMENT_SHADER = [
    "precision mediump float;",
    "uniform sampler2D uFont;",
    "varying vec2 vTexCoord;",
    "varying vec3 vColor;",
    "varying vec3 vBgColor;",

    "void main() {",
        "vec4 color = texture2D(uFont, vTexCoord);",
        "color.rgb = mix(vBgColor, vColor, color.rgb);",
        "gl_FragColor = color;",
    "}"
].join('\n');

class WebGLRenderer { 
    constructor(view) {
        this.view = view;
        this.canvas = view.elem;
        
        // Try to fetch the context
        this.gl = this.canvas.getContext("webgl");
        const gl = this.gl;

        this.charMap = {};
        this.charArray = [];

        this.attribs = {
            position:  { buffer: null, data: null, itemSize: 2, location: null, hint: gl.STATIC_DRAW },
            texCoord:  { buffer: null, data: null, itemSize: 2, location: null, hint: gl.STATIC_DRAW },
            color:     { buffer: null, data: null, itemSize: 3, location: null, hint: gl.DYNAMIC_DRAW },
            bgColor:   { buffer: null, data: null, itemSize: 3, location: null, hint: gl.DYNAMIC_DRAW },
            charIndex: { buffer: null, data: null, itemSize: 1, location: null, hint: gl.DYNAMIC_DRAW }
        };

        // Create an offscreen canvas for rendering text to texture
        if (!this.offscreen)
            this.offscreen = document.createElement("canvas");

        this.offscreen.style.position = "absolute";
        this.offscreen.style.top = "0px";
        this.offscreen.style.left = "0px";
        this.ctx = this.offscreen.getContext("2d");
        this.ctx.scale(ratio, ratio)
        if (!this.ctx) throw "Failed to acquire offscreen canvas drawing context";
        // WebGL drawing canvas
        this.updateStyle();
        this.canvas.width *= ratio
        this.canvas.height *= ratio
        this.canvas.style.width = (this.canvas.width / ratio) + "px";
        this.canvas.style.height = (this.canvas.height / ratio) + "px";
        // Doing this again since setting canvas w/h resets the state
        // this.updateStyle();

        gl.viewport(0, 0, this.canvas.width, this.canvas.height);

        const vertexShader = this.compileShader(gl.VERTEX_SHADER, VERTEX_SHADER);
        const fragmentShader = this.compileShader(gl.FRAGMENT_SHADER, FRAGMENT_SHADER);
        const program = gl.createProgram();

        gl.attachShader(program, vertexShader);
        gl.attachShader(program, fragmentShader);
        gl.linkProgram(program);
        gl.deleteShader(vertexShader);
        gl.deleteShader(fragmentShader);

        const ok = gl.getProgramParameter(program, gl.LINK_STATUS);
        if (!ok) {
            var msg = "Error linking program: " + gl.getProgramInfoLog(program);
            gl.deleteProgram(program);
            throw msg;
        }
        gl.useProgram(program);

        // Get attribute locations
        this.attribs.position.location  = gl.getAttribLocation(program, "position");
        this.attribs.texCoord.location  = gl.getAttribLocation(program, "texCoord");
        this.attribs.color.location     = gl.getAttribLocation(program, "color");
        this.attribs.bgColor.location   = gl.getAttribLocation(program, "bgColor");
        this.attribs.charIndex.location = gl.getAttribLocation(program, "charIndex");

        // Setup buffers and uniforms
        this.initBuffers();
        var resolutionLocation = gl.getUniformLocation(program, "uResolution");
        gl.uniform2f(resolutionLocation, this.canvas.width, this.canvas.height);
        this.tileCountsLocation = gl.getUniformLocation(program, "uTileCounts");
        gl.uniform2f(this.tileCountsLocation, this.view.w, this.view.h);
        this.paddingLocation = gl.getUniformLocation(program, "uPadding");
        gl.uniform2f(this.paddingLocation, 0.0, 0.0);

        // Setup texture
        // view.elem.parentElement.appendChild(this.offscreen); // Debug offscreen
        var texture = gl.createTexture();
        gl.bindTexture(gl.TEXTURE_2D, texture);
        for (let c of " !\"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~") {
            this.cacheChar(c.charCodeAt(0))
        }
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        gl.activeTexture(gl.TEXTURE0);

        // var _this = this;
        // setTimeout(function() { _this.updateStyle(); _this.buildTexture(); _this.render(); }, 100);
    }

    insertQuad(arr, i, x, y, w, h) {
		var x1 = x, y1 = y, x2 = x + w, y2 = y + h;
		arr[  i] = x1; arr[++i] = y1;
		arr[++i] = x2; arr[++i] = y1;
		arr[++i] = x1; arr[++i] = y2;
		arr[++i] = x1; arr[++i] = y2;
		arr[++i] = x2; arr[++i] = y1;
		arr[++i] = x2; arr[++i] = y2;
	}

    // Setup GLSL
	compileShader(type, source) {
        const gl = this.gl;
		var shader = gl.createShader(type);
		gl.shaderSource(shader, source);
		gl.compileShader(shader);
		var ok = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
		if (!ok) {
			var msg = "Error compiling shader: " + gl.getShaderInfoLog(shader);
			gl.deleteShader(shader);
			throw msg;
		}
		return shader;
	}

    initBuffers() {
		var a, attrib, attribs = this.attribs;
		var w = this.view.w, h = this.view.h;
        const gl = this.gl;
		// Allocate data arrays
		for (a in this.attribs) {
			attrib = attribs[a];
			attrib.data = new Float32Array(attrib.itemSize * 6 * w * h);
		}
		// Generate static data
		for (var j = 0; j < h; ++j) {
			for (var i = 0; i < w; ++i) {
				// Position & texCoords
				var k = attribs.position.itemSize * 6 * (j * w + i);
				this.insertQuad(attribs.position.data, k, i * this.tw, j * this.th, this.tw, this.th);
				this.insertQuad(attribs.texCoord.data, k, 0.0, 0.0, 1.0, 1.0);
			}
		}
		// Upload
		for (a in this.attribs) {
			attrib = attribs[a];
			if (attrib.buffer) gl.deleteBuffer(attrib.buffer);
			attrib.buffer = gl.createBuffer();

			gl.bindBuffer(gl.ARRAY_BUFFER, attrib.buffer);
			gl.bufferData(gl.ARRAY_BUFFER, attrib.data, attrib.hint);
			gl.enableVertexAttribArray(attrib.location);
			gl.vertexAttribPointer(attrib.location, attrib.itemSize, gl.FLOAT, false, 0, 0);
		}
	}

    buildTexture() {
        const offscreen = this.offscreen
        const gl = this.gl;

        var w = offscreen.width / (this.tw + this.pad)
        var h = offscreen.height / (this.th + this.pad);
        // Check if need to resize the canvas
        var charCount = this.charArray.length;
        if (charCount > Math.floor(w) * Math.floor(h)) {
            w = Math.ceil(Math.sqrt(charCount));
            h = w + 2; // Allocate some extra space too
            offscreen.width = w * (this.tw + this.pad);
            offscreen.height = h * (this.th + this.pad);
            this.updateStyle();
            gl.uniform2f(this.tileCountsLocation, w, h);
        }
        offscreen.style.width = (offscreen.width / ratio) + "px";
        offscreen.style.height = (offscreen.height / ratio) + "px";
        gl.uniform2f(this.paddingLocation, this.pad / offscreen.width, this.pad / offscreen.height);
    
        var c = 0, ch;
        this.ctx.fillStyle = "#000000";
        this.ctx.fillRect(0, 0, offscreen.width, offscreen.height);
        this.ctx.fillStyle = "#ffffff";

        var tw = this.tw + this.pad;
        var th = this.th + this.pad;
        var y = 0.5 * th; // Half because textBaseline is middle
        for (var j = 0; j < h; ++j) {
            var x = this.pad * 0.5;
            for (var i = 0; i < w; ++i, ++c) {
                ch = this.charArray[c];
                if (ch === undefined) break;
                this.ctx.fillText(String.fromCharCode(ch), x, y);
                x += tw;
            }
            if (!ch) break;
            y += th;
        }
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, offscreen);
    }

    cacheChar(charCode) {
        // console.log(String.fromCharCode(charCode))
        if (!this.charMap[charCode]) {
            this.charArray.push(charCode);
            this.charMap[charCode] = this.charArray.length-1;
        }
    
        this.buildTexture();
    }

    updateStyle(s) {
        s = s || window.getComputedStyle(this.view.elem, null);
        this.ctx.font = s.fontSize + "/" + s.lineHeight + " " + s.fontFamily;
        // console.log(this.ctx.font)
        this.ctx.textBaseline = "middle";
        this.ctx.fillStyle = "#ffffff";
        const textWidth = this.ctx.measureText("█").width
        console.log(textWidth)
        this.tw = Math.floor(textWidth);
        // this.tw = 10 * ratio; //this.ctx.measureText("M").width;
        this.th = Math.floor(parseFloat(s.fontSize))
        // this.th = 16 * ratio; //parseInt(s.fontSize, 10);
        console.log(this.tw, this.th)
        this.gap = 0
        this.pad = Math.ceil(this.th * 0.2) * 2.0; // Must be even number
    }

    clear() { /* No op */ }

    render() {
        const gl = this.gl;
        gl.clear(gl.COLOR_BUFFER_BIT);

        const attribs = this.attribs;
        const w = this.view.w
        const h = this.view.h;

        // Get the buffered tiles
        const tiles = this.view.buffer;
        var uncachedChars = false;
        for (var j = 0; j < h; ++j) {
            for (var i = 0; i < w; ++i) {
                const tile = tiles[j][i] || NULLTILE;
                var ch = this.charMap[tile[0]];
                if (ch === undefined) {
                    this.cacheChar(tile[0]);
                    uncachedChars = true;
                    ch = this.charMap[tile[0]];
                }
                const k = attribs.color.itemSize * 6 * (j * w + i);
                const kk = attribs.charIndex.itemSize * 6 * (j * w + i);
                const r = tile[1] / 255;
                const g = tile[2] / 255;
                const b = tile[3] / 255;
                const br = tile[4] / 255;
                const bg = tile[5] / 255;
                const bb = tile[6] / 255;
                for (var m = 0; m < 6; ++m) {
                    var n = k + m * attribs.color.itemSize;
                    attribs.color.data[n+0] = r;
                    attribs.color.data[n+1] = g;
                    attribs.color.data[n+2] = b;
                    attribs.bgColor.data[n+0] = br;
                    attribs.bgColor.data[n+1] = bg;
                    attribs.bgColor.data[n+2] = bb;
                    attribs.charIndex.data[kk+m] = ch;
                }
            }
        }
        // Cache
        if (uncachedChars) this.buildTexture();

        gl.bindBuffer(gl.ARRAY_BUFFER, attribs.color.buffer);
        gl.bufferData(gl.ARRAY_BUFFER, attribs.color.data, attribs.color.hint);
        gl.bindBuffer(gl.ARRAY_BUFFER, attribs.bgColor.buffer);
        gl.bufferData(gl.ARRAY_BUFFER, attribs.bgColor.data, attribs.bgColor.hint);
        gl.bindBuffer(gl.ARRAY_BUFFER, attribs.charIndex.buffer);
        gl.bufferData(gl.ARRAY_BUFFER, attribs.charIndex.data, attribs.charIndex.hint);
    
        const attrib = this.attribs.position;
        gl.drawArrays(gl.TRIANGLES, 0, attrib.data.length / attrib.itemSize);
    }
}

export { jsANSI, Observable, Object, Point, View, Text, Line, Rectangle, Triangle, Circle, Bezier, Bezier4, rgba, ANSI, Encode, Decode }

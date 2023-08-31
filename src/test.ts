import { jsANSI, View, Text, Bezier, Rectangle, Point, rgba } from './../jsANSI-WebGL.js'
import anime from './../anime.es.js';

class Color {
    static Black = rgba(0,0,0,1)
    static Red = rgba(255,0,0,1)
    static Yellow = rgba(0xfe, 0xc9, 0x4c,1)
    static White = rgba(255,255,255,1)
}

class Character {
    public name: string
    public health: number

    constructor() {
        this.name = 'Alex'
        this.health = 9
    }
}

class StatsView extends View {
    public background: Rectangle
    public name: Text
    public health: Text

    constructor(character: Character, x: number, y: number) {
        super(x, y)

        this.background = this.add(new Rectangle(0, 0, 10, 10, { color: Color.White }))

        this.add(new Text('Name:', 0, 0))
        this.name = this.add(new Text(character.name, 8, 0))

        this.health = this.add(new Text(character.health, 0, 1))
        this.health.formatter = (text) => `Health: ${text}`
    }

    set character(character: Character) {
        this.health.text = character.health.toString()
    }
}

class TestView extends View {
    public stats: StatsView
    public attack: Text

    constructor(character: Character) {
        super(1, 1)

        this.stats = this.add(new StatsView(character, 2, 1))

        this.attack = this.add(new Text(' [ Attack ] ', 0, 3, { color: Color.Black, backgroundColor: Color.Yellow }))
        this.attack.click.on((event: any) => {
            character.health += 1

            this.stats.x -= 1
            this.stats.character = character
        })
    }
}

const v1 = new TestView(new Character())

var ansi = new jsANSI(document.getElementById('canvas'), 120, 30)
ansi.add(v1)
ansi.add(new Text('0', 0, 0))

const b1 = new Bezier(5, 5, [
    new Point(10, 5), new Point(5,5), new Point(5, 10),
    new Point(5, 10), new Point(5, 15), new Point(10, 15),
    new Point(10,15), new Point(15, 15), new Point(15, 10),
    new Point(15,10), new Point(15,10), new Point(10,10),
    new Point(10,10), new Point(10,10), new Point(10,5),
], { color: Color.Red, fill: true })
b1.width = 10
b1.height = 10
b1.closed = true
ansi.add(b1)

anime({
    targets: v1,
    x: 10,
    easing: 'linear',
    duration: 1000,
    round: 1, 
    loop: true
});

anime({
    targets: b1,
    angle: 360,
    easing: 'linear',
    duration: 10000,
    round: 1, 
    loop: true
});

function update() {
    ansi.draw()
    requestAnimationFrame(update)
}
update()
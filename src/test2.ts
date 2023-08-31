import { jsANSI, rgba, View, Text } from './../jsANSI.js'
import anime from './../anime.es.js';

class Color {
    r: number
    g: number
    b: number
    a: number
    rgba: number

    constructor(r: number, g: number, b: number, a: number) {
        this.r = r
        this.g = g
        this.b = b
        this.a = a
        this.rgba = rgba(r, g, b, a)
    }

    static lerp(rgba: number, rgba2: number, percent: number) {
        const c = Color.rgba(rgba)
        const c2 = Color.rgba(rgba2)

        return new Color(
            c.r + ((c2.r - c.r) * percent),
            c.g + ((c2.g - c.g) * percent),
            c.b + ((c2.b - c.b) * percent),
            c.a + ((c2.a - c.a) * percent)).rgba
    }

    static rgba(rgba: number) {
        return new Color(rgba & 0xFF, rgba >> 8 & 0xFF, rgba >> 16 & 0xFF, (rgba >> 24 & 0xFF) / 255)
    }
}

enum Colors {
    Black = new Color(0,0,0,1).rgba,
    Red = new Color(255,0,0,1).rgba,
    Yellow = new Color(0xfe,0xc9,0x4c,1).rgba,
    Green = new Color(0,255,0,1).rgba,
    Blue = new Color(0,0,255,1).rgba
}

class Ammo {
    public current: number
    public max: number

    constructor(current: number, max: number) {
        this.current = current
        this.max = max
    }
}

class Animation {
    static animate(params: any) {
        anime(params)
    }
}

abstract class Character {
    public name: string
    public health: number
    public money: number
    public ammo: Ammo
}

class Gunner extends Character {
    constructor() {
        super()
        this.name = 'Gunner'
        this.health = 50
        this.money = 150
        this.ammo = new Ammo(3,3)
    }
}

class AmmoView extends View {
    public ammoText: Text
    public ammo: Ammo

    constructor(ammo: Ammo, x: number, y: number) {
        super(x, y)

        this.ammo = ammo

        this.ammoText = this.add(new Text('', 0, 0))
        this.ammoText.formatter = () => `${this.ammo.current}/${this.ammo.max}`
    }
}

class CharacterView extends View {
    public nameText: Text
    public healthText: Text
    public moneyText: Text
    public ammoView: AmmoView

    constructor(character: Character, x: number, y: number) {
        super(x, y)

        this.add(new Text('Name:', 0, 0))
        this.nameText = this.add(new Text(character.name, 8, 0))

        this.add(new Text('Health:', 0, 1))
        this.healthText = this.add(new Text(character.health, 8, 1))

        this.add(new Text('Money:', 0, 2))
        this.moneyText = this.add(new Text(character.money, 8, 2))

        this.add(new Text('Ammo:', 0, 3))
        this.ammoView = this.add(new AmmoView(character.ammo, 8, 3))
    }

    set character(character: Character) {
        this.healthText.text = character.health.toString()

        const view = this
        Animation.animate({
            duration: 1000,
            update: function(a) {
                view.healthText.style.backgroundColor = Color.lerp(Colors.Red, Colors.Black, a.progress / 100)
                view.dirty = true
            }
        });
        this.moneyText.text = character.money.toString()
        this.ammoView.ammo = character.ammo
    }
}

class EncounterView extends View {
    public characterView: CharacterView
    public attackText: Text

    constructor(character: Character) {
        super(1, 1)

        this.characterView = this.add(new CharacterView(character, 0, 0))

        this.attackText = this.add(new Text(' [ Attack ] ', 0, 5, { color: Colors.Black, backgroundColor: Colors.Yellow }))
        this.attackText.click.on((event) => {
            character.health -= 1
            character.money += 5
            character.ammo.current -= 1

            this.characterView.character = character
        })
    }
}

const encounterView = new EncounterView(new Gunner())

var ansi = new jsANSI(document.getElementById('canvas'), 120, 30)
ansi.add(encounterView)
ansi.add(new Text('0', 0, 0))

function update() {
    ansi.draw()
    requestAnimationFrame(update)
}
update()
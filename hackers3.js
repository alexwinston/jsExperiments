import { jsANSI, Text } from './jsANSI-WebGL.js'
import anime from './anime.es.js';

var ansi = new jsANSI(document.getElementById('canvas'), 120, 30)

class Character {
    constructor(name, health) {
        this.name = name
        this.health = health
        this.actions = []
    }

    assign(action) {
        this.actions.push(action)
    }

    select() {
        throw Error('Abstract function')
    };

    damaged(amount) {
        this.health -= amount
        console.log(`${this.name} damaged ${amount} health ${this.health}`)
    }

    target(heroes, enemies) { 
        throw Error("Abstract function")
    }

    toString() {
        return this.name
    }
}

class Hero extends Character {
    constructor(name, health) {
        super(name, health)
    }

    select() {
        this.selecting = new Promise((resolve, reject) => { this.selected = resolve })
        // let selection = new Promise((resolve, reject) => {
        //     setTimeout(() => resolve(this.actions[0]), 5000)
        // });
        console.log('Hero selecting')
        return this.selecting
    }

    target(heroes, enemies) {
        console.log('Hero targets')
        return [enemies.find(enemy => enemy.health > 0)]
    }
}

class Enemy extends Character {
    constructor(name, health) {
        super(name, health)
    }

    select() {
        return Promise.resolve(this.actions[0])
    }

    target(heroes, enemies) {
        console.log('Enemy targets')
        return heroes
    }
}

class Action {
    constructor(name) {
        this.name = name
    }

    select() {
        return this
    }

    targets(heroes, enemies) {}

    perform(character, characters) {}
}

class Attack extends Action {
    constructor(amount) {
        super('Attack')
        this.amount = amount
    }

    targets(heroes, enemies) {
        return {
            heroes: heroes.slice(heroes.length - 1),
            enemies: enemies.slice(0)
        }
    }

    perform(character, characters) {
        console.log(`${character.name} performed ${this.name}(${this.amount}) against ${characters}`)
        characters.forEach(character => { character.damaged(this.amount) })
    }
}

class Attack2 extends Action {
    constructor(amount) {
        super('Attack 2')
        this.amount = amount
    }

    targets(heroes, enemies) {
        return {
            heroes: heroes.slice(0, 2),
            enemies: []
        }
    }

    perform(character, characters) {
        console.log(`${character.name} performed ${this.name}(${this.amount}) against ${characters}`)
        characters.forEach(character => { character.damaged(this.amount) })
    }
}

class Round {
    constructor(heroes, enemies) {
        console.log('Round ctor')
        this.heroes = heroes
        this.enemies = enemies
        this.turns = []
    }

    start() {
        console.log('Round start')
        this.heroes.forEach(hero => { this.turns.push(hero) })
        this.enemies.forEach(enemy => { this.turns.push(enemy) })
    }

    end() {
        console.log('Round end')
    }
}

class Encounter {
    constructor(heroes, enemies) {
        this.heroes = heroes
        this.enemies = enemies
    }

    async start() {
        console.log('Encounter start')
        for (var round = this.next(); round; round = this.next()) {
            round.start()
            for (var i = 0; i < round.turns.length; i++) {
                const character = round.turns[i]
                if (character.health > 0) {
                    const action = await character.select()
                    const targets = action.targets(this.heroes, this.enemies)
                    action.perform(character, character.target(targets.heroes, targets.enemies))
                }
            }
            round.end()
        }

    }

    end() {
        console.log('Encounter end')
    }

    next() { throw Error('Abstract function') }
}

class Forest extends Encounter {
    constructor(heroes, enemies) {
        super(heroes, enemies)
        this.rounds = 1
    }

    next() {
        if (this.rounds-- > 0) {
            console.log('Forest next Round')
            return new Round(this.heroes, this.enemies)
        }
    }
}

class Arena extends Encounter {
    constructor(heroes, enemies) {
        super(heroes, enemies)
    }

    next() {
        if (this.heroes[0].health > 0 && this.enemies.some(enemy => enemy.health > 0)) {
            console.log('Arena next Round')
            return new Round(this.heroes, this.enemies)
        }
    }


}

const hero1 = new Hero('Alex', 10)
hero1.assign(new Attack(3))
const hero2 = new Hero('Ethan', 10)
hero2.assign(new Attack(2))

const heroes = [hero1, hero2]

const t1 = new Text('Attack', 0, 0)
t1.click.on(event => {
    hero1.selected(hero1.actions[0])
})
ansi.add(t1)
ansi.draw()

const enemy1 = new Enemy('Robot 1', 10)
enemy1.assign(new Attack2(2))
const enemy2 = new Enemy('Robot 2', 4)
enemy2.assign(new Attack(1))

const enemies = [enemy1, enemy2]

const encounter1 = new Forest(heroes, enemies)
await encounter1.start()
encounter1.end()

const encounter2 = new Arena(heroes, enemies)
await encounter2.start()
encounter2.end()

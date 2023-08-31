const eyes = decode()

class Integer {
    static random = (min, max) => Math.floor(Math.random() * (max - min + 1) + min)
}

eyes.forEach(v => console.log(v.nth(2,1).difference().reduce((p,c) => p + c, 0) / v.length))
// console.log(eyes[0].difference().reduce((p,c) => p + c, 0) / eyes[0].length)

const random = Array.from({ length: 99 }, _ => Integer.random(0,82))
console.log(random, random.nth(2))
console.log(random.nth(2,1).difference().reduce((p,c) => p + c, 0) / random.length)

console.log(eyes[0].chunk(26).join("\n"))

String.prototype.glyphs = function() {
    return this.map(w => (w.charCodeAt(0) - 32).toString(5).padStart(3, '0'))
}

{
    console.log(eyes.map(v => v.glyphs()))
    console.log(eyes.map(v => v.glyphs().map(w => w.substring(1))))
    const pt  = eyes.map(v => v.glyphs().map(w => az25[parseInt(w.substring(1), 5)]).join(""))
    console.log(pt.join("\n"))
    console.log(new Frequencies(pt.join(""),az25).substitute())
}
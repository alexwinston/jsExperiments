String.prototype.base = function(radix, offset = 32, pad = 3) {
    return (this.charCodeAt(0) - offset).toString(radix).padStart(pad,'0')
}

const az25 = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"

const eyes = decode(10, [0,1,2,3,4])
const base5 = eyes.map(v => v.split("").map(w => w.base(5)))

function diamond(g1, g2) {
    const d = []
    d.push(g1[0] + g2[0])
    d.push(g2[1] + g1[1])
    d.push(g1[2] + g2[2])
    return d
}

{
    // base5.forEach(v => console.log(v))
    for (const msg of base5) {
        console.log(msg)
        const diamonds = []
        for (var i = 1; i < msg.length; i++) {
            const g1 = msg[i-1]
            const g2 = msg[i]
            diamonds.push(diamond(g1,g2))
        }
        console.log(az25[parseInt(diamonds[0][0], 5)])
        console.log(az25[parseInt(diamonds[0][1], 5)])
        console.log(az25[parseInt(diamonds[0][2], 5)])

        console.log(az25[parseInt(diamonds[1][0], 5)])
        console.log(az25[parseInt(diamonds[1][1], 5)])
        console.log(az25[parseInt(diamonds[1][2], 5)])
    }
}
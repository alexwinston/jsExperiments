const abc125 = [...Array(125)].map((_, i) => String.fromCharCode(i + 0)).join('')
// const abc30 = Array.from({ length:30 }, (_, i) => String.fromCharCode(i + 50)).join("")
// console.log(decode())
// console.log("abc30", abc30)
// const d1 = decode(10, [2,4,1,3,0])
// const d1 = decode(0, [0,2,4,1,3])
// const d1 = decode(0, [0,3,1,4,2])
const d = decode(10, [0,1,2,3,4])
// const d = decode(10, [4,3,2,1,0], abc125)
const d1 = d[0]
const d2 = d[1]
// const d1 = decode(10, [4,3,2,1,0])
// const d2 = decode(10, [4,3,2,1,0], abc125)
console.log(d1)

// const e0 = d1[0].split("").map(v => v).join("")
// console.log(e0)
// // const e1 = d2[0].split("").map(v => v).reverse().join("")
// const e1 = d2[0].split("").map(v => v).join("")
// console.log(e1)
// const e2 = d2[1].split("").map(v => v).join("")
// console.log(e2)

for (var i = 0; i < d1.length; i++) {
    const s1 = shift(d2, -i).join("")
    console.log(xor(d1, s1).split(""))
}

// console.log(xor(xor(e0, e1), e2))

console.log(decipher(d[0], shift(d[1],1).join(""), az83))
console.log(decipher(d[1], "KNOWLEDGE THROUGH PAIN WISDOM THROUGH SACRIFICE", az83))

const t1 = "The quick brown fox jumps over the lazy dog."
console.log(xor(Array(t1.length).fill(String.fromCharCode(1)).join(""), t1))
console.log(String.fromCharCode(1))

console.log(d1.split("").map(v => {
    // console.log(v.charCodeAt(0).toString(5).padStart(3,"0"))
    const b = base([v.charCodeAt(0)], 83, 26)
    // return abc25[b[0]]
    return abc26[b[1]]
    // return abc25[b[1] - b[0]]
    // return abc26[b[1] - b[0]]
    // return b
}).join(""))

const az5 = []
az5.push(split("AFLQVBGMRWCHNSXDIOTYEKPUZ", 5))
az5.push(split("AFLQVBGMRWCHNSXDIOTYEKPUZ".split("").reverse().join(""), 5))
az5.push(split("AFLQVBGMRWCHNSXDIOTYEKPUZ", 5))
az5.push(split("AFLQVBGMRWCHNSXDIOTYEKPUZ".split("").reverse().join(""), 5))
az5.push(split("AFLQVBGMRWCHNSXDIOTYEKPUZ", 5))

console.log(az5)

const e1 = d1.split("").map(v => v.charCodeAt(0)).map(v => v.toString(5).padStart(3, "0").split(""))
console.log(e1.map(v => az5[parseInt(v[2])][parseInt(v[1])][parseInt(v[0])]).join(""))

// console.log(think(c2, abc("LEFT", az26), tshift(abc("LEFT", az26), "BRAIN")))
// const t1 = tshift(abc(ct3[0], az26), ct3[0])
const t83 = tshift(az83, "i!i")
console.log(t83)
console.log(think(d[0], abc("AVRICE", az83), t83).join(""))
console.log(think(d[1], abc("i!i", az83), t83).join(""))
console.log(think(d[2], abc("AVARICE", az83), t83).join(""))

console.log(think(d[6], abc("AVARICE", az83), t83).join(""))
console.log(think(d[7], abc("DIAMOND", az83), t83).join(""))
console.log(think(d[8], abc("AVARICE", az83), t83).join(""))
// console.log(think(ct3[2] + ct3[3], abc("HILBERT", az26), t1).join(""))

const m7 = split(d.join(""), 148)
console.log(m7)
const s7 = []
for (var i = 0, j = [0,2,3,4,5,6]; i < m7[0].length; i++, j = j.reverse()) {
    j.forEach(v => s7.push(m7[v][i]))
    // console.log(j)
}
console.log(s7.map(v => az26[(v.charCodeAt(0) - 32) % 26]))

console.log(d.join("").length)
console.log(xor(Array(d[0].length).fill(String.fromCharCode(10)).join(""), d[0]))
console.log(xor(Array(d[1].length).fill(String.fromCharCode(11)).join(""), d[1]))
console.log(xor(Array(d[2].length).fill(String.fromCharCode(10)).join(""), d[2]))

// for (var i = 0; i < 256; i++) {
//     console.log(xor(Array(d[0].length).fill(String.fromCharCode(i)).join(""), d[0]))
// }

const abc31 = "ABCDEFGHIJKLMNOPQRSTUVWXYZ01234"
const abc63 = Array.from({ length:63 }, (_, i) => String.fromCharCode(i + 32))
console.log(abc63)

function binary(m1, m2, b = 7) {
    return split(rotate(encode(parse(m1, m2)))[10].map(v => v.toString(2).padStart(7, "0")).join(""), b)
}

const b = [
    binary(m[0][0],m[0][1]),
    binary(m[1][0],m[1][1]),
    binary(m[2][0],m[2][1]),
    binary(m[3][0],m[3][1]),
    binary(m[4][0],m[4][1]),
    binary(m[5][0],m[5][1]),
    binary(m[6][0],m[6][1]),
    binary(m[7][0],m[7][1]),
    binary(m[8][0],m[8][1])
]
console.log(b.map(v => v.join("")).join("").length)

for (var i = 0; i < b.length; i++) {
    console.log(split(b[i].map(v => abc83[parseInt(v, 2)]).join(""), 26))
}

console.log(d.reduce((v, c) => v + c[0], ""))
console.log(d.reduce((v, c) => v + c[0].charCodeAt(0) - 32, 0))
// console.log(d.reduce((v, c) => [...v.at(-1),c], [0]))
console.log(d.reduce((v, c) => [...v,(v.at(-1) + c[0].charCodeAt(0) - 32)], [0]))
// console.log(d.reduce((v, c) => v.at(-1) + c[0].charCodeAt(0) - 32, [0]))
console.log(d.map(v => v[0].charCodeAt(0) - 32))

const p10 = parse(m[0][0],m[0][1]).map(v => abc25[parseInt(v[0] + v[1], 5) ^ v[2]])
console.log(p10.join(""))

// for (var i = 0; i < d[0].length; i++) {
//     const s = shift(d[0], -i).join("")
//     console.log(Autokey.decrypt(s, "i!i", az83))
// }

// console.log(Vigenere.decrypt(d[0], "i!i", abc("!", az83).join("")))
console.log(Vigenere.decrypt(d[0], "NOPQR", az83))

function letters(s) {
    var count = 0
    s.forEach(v => { if (v.charCodeAt(0) >= 65 && v.charCodeAt(0) <= 90) count++ })
    return count
}
// az83.split("").forEach(v => console.log(v, letters(Vigenere.decrypt(d[0], "N" + v, az83))))

console.log(Vigenere.decrypt(d[0], "N)OjN.e", az83))

// for (var i = 0; i < 83; i++) {
//     for (var j = 0; j < 83; j++) {
//         for (var k = 0; k < 83; k++) {
//             // const s = "k(O/" + String.fromCharCode(i + 32, j + 32, k + 32)
//             const s = "N)Ojl" + String.fromCharCode(i + 32, j + 32, k + 32)
//             // const s = String.fromCharCode(i + 32, j + 32, k + 32)
//             const c = letters(Vigenere.decrypt(d[0], s, az83))
//             if (c >= 47) console.log(s, c)
//         }
//     }
// }

// const score = [35,36,39,40,41,42,42,42,43]
// function letters2(s) {
//     for (var i = 0; i < az83.length; i++) {
//         const key = s + String.fromCharCode(i + 32)
//         const count = letters(Vigenere.decrypt(d[0], key, az83))
//         if (count >= score[key.length]) {
//             if (key.length >= 8) console.log(count, key, key.length)
//             letters2(key)
//         }
//     }
// }
// letters2("N)O")
 
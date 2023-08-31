const eyes = decode(10, [0,1,2,3,4])

const pt1 = [
    // "1) STARTBYTHINKINGSOMETHINGWHETHERYOUREALLYWANTTOGODOWNFORGODKNOWSTHESEARCHFORKNOWLEDGE[]ISPOWERFORTECHNOLOGY",
    // "2) STARTBYTHINKINGSOMETHING IFYOU`RE VISITINGTHISPATHAND,YOU`RELIKELYSEARCHFORKNOWLEDGE A RANDOM NEEDLEINHAYSTACK",
    // "1. TEST HELP ANOTHER OTHERNOITA EMERGENCY BROADCAST THE NET SOMETIME",
    // "2. TEST HELPKNOWTHEE OTHERNOITA QUICK BROWN FOXCAST THE NET NOW"
    "1. THEQUICKFOX",
    "2. THEBROWNFOX"
]
const k = "i!i"

for (var i = 0; i < 100000; i++) {
    // const az = az83
    const az = shuffle(" !\"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqr")
    // const az = "DMTGa]c ^9#Z$h`?A35LC&)f!eI1Omlo4E>6N/YWS'i8nJ\"gF=<*_HpK;X%.q@BRk:\\,j2[0Vb7+PQUr-d("

    // const ct1 = pt1.map(v => Autokey.encrypt(v, k, az))
    const ct2 = pt1.map(v => Cipherkey.encrypt(v, k, az))
    // console.log(ct1)
    // console.log(ct2)
    // if (ct2[0][55] == ct2[1][55] && ct2[0][25] == ct2[1][25]) {
    if (ct2[0][5] == ct2[1][6] && ct2[0][13] == ct2[1][13]) {
        console.log(az)
        console.log(ct2)
    }
}

// const ct3 = Autokey.encrypt(pt1[0].repeat(100), k, az83)
// const ct4 = Cipherkey.encrypt(pt1[0].repeat(100), k, az83)
// console.log(split(ct3, pt1[0].length))
// console.log(split(ct4, pt1[0].length))

// console.log(Cipherkey.decrypt(ct4, k , az83))

// 
const za26 = az26.split("").reverse().join("")
console.log(za26)
console.log(Cipherkey.encrypt("HEAVYINTERDICTIONFIREFALLINGAT", "TRUE", az26))
console.log(Cipherkey.encrypt("HEAVYINTERDICTIONFIREFALLINGAT", "TRUE", az26, Beaufort))
// console.log(Beaufort.encrypt("HEAVYINTERDICTIONFIREFALLINGAT", "TRUE", az26))

console.log(Cipherkey.encrypt("HEAV", "TRUE", az26, Beaufort))
console.log(Cipherkey.encrypt("YINT", "MNUJ", az26, Beaufort))

// const ct1 = "SUHPZTCEPLGLQKCXHVKMVJLZAKXWHAYTOWNHBAFEXAVEQAUVZIEBPOB"
// const ct1 = "SUHPZTCEPLGLQKC"
// for (var i = 0; i < az26.length; i++) {
//     const ct = ct1.split("").map(v => ABC.shift(az26, v).shift(i)[0])
//     console.log(ct.join(""))
// }
// console.log("za26")
// for (var i = 0; i < az26.length; i++) {
//     const ct = ct1.split("").map(v => ABC.shift(az26, za26[az26.indexOf(v)]).shift(i)[0])
//     console.log(ct.join(""))
// }

// const ct1 = Autokey.encrypt("1. THIS IS A TEST, HOW CAN THIS WORK?", "i!i,", az83)
// const ct1 = eyes[5].substring(0, 26)
// for (var i = 0; i < az83.length; i++) {
//     const ct = ct1.split("").map(v => ABC.shift(az83, v).shift(i)[0])
//     console.log(ct.join(""))
// }
// console.log("za83")
// const za83 = az83.split("").reverse().join("")
// for (var i = 0; i < az83.length; i++) {
//     const ct = ct1.split("").map(v => ABC.shift(az83, za83[az83.indexOf(v)]).shift(i)[0])
//     console.log(ct.join(""))
// }

const i1 = "LHJJTYZLDXZHY"
// const i1 = "PGZZIJFPKEFGJ"
// const i1 = "DVBBOWTDXSTVW"

const i2 = new Set(i1)
var c = 0
for (var i = 0; i < i1.length; i++) {
}
console.log(i2)
const a1 = Array.from(i2)
const i3 = []
for (var i = 0; i < i1.length; i++) {
    const c = i1[i]
    i3.push(az26[a1.indexOf(c)])
}
console.log(i3.join(""))
console.log(i1.isomorph(az26))

console.log("ABCCDEFAGHFBE")

console.log([0, 52, 105].deduplicate([0, 52, 105]))
console.log([0, 24, 52, 105].deduplicate([0, 52, 105]))
console.log([0, 24, 52, 72, 77, 105].deduplicate([0, 52, 105]))
console.log([24].deduplicate([0, 52, 105]))
console.log([24].deduplicate([24]))
console.log([24].deduplicate([]))

const k1 = ['ABCCDEF', 'ABCCDEFA', 'ABCCDEFAG', 'ABCCDEFAGH', 'ABCCDEFAGHF', 'ABCCDEFAGHFB', 'ABCCDEFAGHFBE']
const m1 = new Map()
m1.set("ABCCDEF", [0, 24, 52, 72, 77, 105])
m1.set("ABCCDEFA", [0, 24, 52, 105])
m1.set("ABCCDEFAG", [0, 24, 52, 105])
m1.set("ABCCDEFAGH", [0, 24, 52, 105])
m1.set("ABCCDEFAGHF", [0, 52, 105])
m1.set("ABCCDEFAGHFB", [0, 52, 105])
m1.set("ABCCDEFAGHFBE", [0, 52, 105])

const k2 = ['ABCCDEF', 'ABCCDEFAA']
m1.set("ABCCDEF", [72, 77])
m1.set("ABCCDEFAA", [10, 72, 77])


prune(k1.reverse(), m1)
prune(k2.reverse(), m1)
console.log(m1)

const ct5 = "LHJJTYZLDXZHYPHZFOCXLIMDFGOOBDPFQXXQGYJPRXGJGLTSRMKSPGZZIJFPKEFGJIMKHXWIYDCCTAUEEDTFKHUNFZHSGRGEGJKLIBWXWDVBBOWTDXSTVWMTFBDJZIYZBE"
// console.log(split(ct5, 5))
// const morphs = ct5.isomorphs(4, 13, 4, az26)
const morphs = eyes[0].isomorphs(4, 10, 2, az26)
console.log("morphs", morphs)

// prune(Array.from(morphs.keys()), morphs)
// prune(Array.from(morphs.keys()).sort((a, b) => a.length - b.length), morphs)

console.log(morphs)

// const morph = "ABCCDEFAGHFBE"
const morph = "ABCDDEA"
// morphs.get(morph).forEach(v => console.log(ct5.substring(v, v + morph.length)))

const iso2 = [
    // "VNNPHSMXWIPUCWRSTGUCRMLJJTUQREHSFVOJRRTD",
    // "RWWZIYVUAKZGMAEYDQGMEVJSSDGWGZSTTDBGTOCN",
    // "UZZYBRXILNYKOLGRATKOHZBTAGFPMFBRAXCVYEEP"
    eyes[3],
    eyes[4],
    eyes[5],
    // eyes[3]
]
const m2 = [
    iso2[0].isomorphs(4, 15, 2),
    iso2[1].isomorphs(4, 15, 2),
    iso2[2].isomorphs(4, 15, 2),
    // iso2[3].isomorphs(5, 13, 2)
]
console.log(m2)

const mk2 = [
    Array.from(m2[0].keys()),
    Array.from(m2[1].keys()),
    Array.from(m2[2].keys()),
    // Array.from(m2[3].keys())
]

// console.log(mk2)
const mk3 = mk2[0].filter(v => mk2[1].includes(v))
// const mk4 = mk2[2].filter(v => mk3.includes(v))
console.log(mk2[2].filter(v => mk3.includes(v)))
// console.log(mk2[3].filter(v => mk4.includes(v)))

// const id = "ABCDEFDGBF" // 0-2
const id = "ABCDEDFGHIJKLA" // 3-5
// const id = "ABCDEFGHBIAD" // 6-8
m2[0].get(id).forEach(v => console.log(iso2[0].substring(v, v + id.length)))
m2[1].get(id).forEach(v => console.log(iso2[1].substring(v, v + id.length)))
m2[2].get(id).forEach(v => console.log(iso2[2].substring(v, v + id.length)))
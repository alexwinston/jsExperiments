const c1 = "WII MJCVKWV FZN ZQLHWMH HA ZLH GMFKTJQ DKOQXT XM UNN LAADANPNFT EOWZXJRX UR. ULNJM QO MS OTZGVIWWJT, ZJQS LW MUXHRVJBSLE HW IRFVQOLOH QRNGCOPNGFLTRF AYFYTRYZTNWP ELQOGW. DX BYCP, BPG QMUIPK VJLAQRH OP WESRRLNEJUY (XZHQ GW LUY EQEZUJW KDBEIHN IVEESME TQL AOMJWHUI GOQJMV) DNRP CPGRBJZLLOZ LFKS. UQ ADLEBT XMK WWQBKAU' DVKA, HRBKS CHYWULTNV QPUR WQH VAZUCOTH YSSNRA."
console.log(c1)
const s1 = c1.split(" ")
console.log(s1)
const c2 = c1.split("").filter((v,i) => az26.split("").includes(v)).join("")
// const c2 = c1.split("").filter((v,i) => v !== " ").join("")
console.log(c2)

function tshift(abc, s) {
    const t = []
    for (var i = 0; i < s.length; i++) {
        t.push(cshift(abc, s[i]))
    }
    return t
}

function think(ct, abc, table) {
    // console.log(abc)
    // console.log(table)
    const pt = []
    for (var i = 0; i < ct.length; i++) {
        const c = ct[i]
        const j = table[i % table.length].indexOf(c)
        pt.push(abc[j])
    }
    return pt
}

function abc(key, alphabet) {
    const s = new Set(key)
    alphabet.split("").forEach(v => s.add(v))
    return [...s]
}

// const az4 = "THINKABCDEFGJLMOPQRSUVWXYZ"
// const v4 = tshift(az4, "RATIONALLY")
const v4 = tshift(abc("LEFT", az26), "BRAIN")

const az4 = "LEFTABCDGHIJKMNOPQRSUVWXYZ"
console.log(think(c2, az4, v4))

const kryptos = abc("KRYPTOS", az26) //"KRYPTOSABCDEFGHIJLMNQUVWXZ"
console.log(think("EMUFPHZLRFAXYUSDJKZLDKRNSHG", kryptos, tshift(kryptos, "PALIMPSEST")))

const c3 = c2.split("").map(v => v.charCodeAt(0) % 26).map(v => az26[v]).join("")
console.log(c3)

const d = []
for (var i = 0; i < c3.length; i+=2) {
    d.push(xor(c3[i],c3[i+1]).charCodeAt(0))
    // d.push(az26[Math.abs(c2[i].charCodeAt(0) - c2[i+1].charCodeAt(0))])
}
console.log("d", d)

console.log(think(c2, abc("LEFT", az26), tshift(abc("LEFT", az26), "BRAIN")))

console.log("W".charCodeAt(0) - "S".charCodeAt(0))
console.log("I".charCodeAt(0) - "E".charCodeAt(0))

const words = ["LOT", "FIN", "FUN", "FAN", "HAT", "KIT", "PIT", "BIN", "SIN", "MEN", "PIN", "VIE", "FOE", "EVE", "ATE", "USE", "ICE", "ACE", "LIT", "THE", "SEE", "ARE", "YOU", "FOR", "MET", "WAS", "CUE", "DIE", "DUE", "EYE", "LIE"]
for (var i = 0; i < words.length; i++) {
    const a = []
    a.push("J".charCodeAt(0) - words[i][0].charCodeAt(0))
    a.push("V".charCodeAt(0) - words[i][1].charCodeAt(0))
    a.push("V".charCodeAt(0) - words[i][2].charCodeAt(0))
    // console.log(a)
}

function wrap(i) {
    if (i >= 0) { return i }
    return i + 26 
}

// https://members.huntakiller.com/blog-articles/2020/4/7/cipher-answers
const pi = "31415926535897932384626433832795028841971693993751058209749445923078164062862089986280348253421170679821480865132823066470938446095505822317253594081284811174502841027019385211055596446229489549303819644288109756659334461284756482337867831652712019091456485669234603486104543266482133936072602491412737245870066"
// const pi = "05772156649015328606065120900824024310421"
console.log(c2.split("").map(v => az26.indexOf(v)))
const c4 = c2.split("").map((v,i) => az26[wrap(az26.indexOf(v) - parseInt(pi[i]))]).join("")
// const c4 = c2.split("").map((v,i) => az26.indexOf(v) - parseInt(pi[i]))
console.log(c4)

console.log(xor(c2, "1618033988749895")) // Phi
console.log(xor(c2, "314159265")) // Pi
console.log(xor(c2, "2718281")) // Euler

{
    const ct = c1
    console.log(Gronsfeld.decrypt(ABC.filter(ct), pi.split("").map(v => parseInt(v))))
}
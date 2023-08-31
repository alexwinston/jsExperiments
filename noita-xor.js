// https://arpitbhayani.me/blogs/decipher-repeated-key-xor/
class XOR {
    static encrypt(pt, kt, az = az83) {
        const ct = []
        for (var i = 0; i < pt.length; i++) {
            const c = xor(pt[i], kt[i % kt.length])
            ct.push(c)
        }
        return ct.join("")
    }

    static decrypt(ct, kt, az = az83) {
        const pt = []
        for (var i = 0; i < ct.length; i++) {
            const c = xor(ct[i], kt[i % kt.length])
            pt.push(az[c.charCodeAt(0) % az.length])
        }
        return pt.join("")
    }
}
console.log(XOR.encrypt("secretattack", "$^!"))
const ct = XOR.encrypt(pt[0], az83)
console.log(ct)
console.log(new Frequencies(ct, az83).sorted)
console.log(XOR.encrypt(pt[1], "i!i"))
console.log(XOR.encrypt("TESTABCTEST", "i!i"))
console.log(XOR.decrypt("]1Z]-KJBLZB", "i!i"))
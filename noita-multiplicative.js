const eyes = decode(10, [0,1,2,3,4])
// const eyes = decode(30, [0,1,2,3,4], az85)

class Gaps {
    static sum(counts) {
        console.log(counts)
        const sums = new Map()
        for (const count of counts) {
            for (const [key, value] of count) {
                // console.log(key)
                if (!sums.has(key)) { sums.set(key, 0) }
                sums.set(key, sums.get(key) + value)
            }
        }
        return [...sums].sort((a,b) => a[0] - b[0])
    }
}
String.prototype.gaps = function(min = 1, max = 16) {
    const gaps = []
    for (var i = 0; i < this.length; i++) {
        for (var j = min + 1; j <= max + 1; j++) {
            if (this[i] == this[i+j]) {
                // console.log(i, j, e1[i], e1[i+j])
                gaps.push({ i:i, length:j-1, c:this[i] })
                break
            }
        }
    }
    // console.log(gaps)
    return gaps
}

function counts(gaps) {
    const counts = new Map()
    for (const gap of gaps) {
        const key = gap.length
        if (!counts.has(key)) { counts.set(key, 0) }
        counts.set(key, counts.get(key) + 1)
        // console.log(gap.c)
    }
    return counts
}

{
    const pt = " A. TEST THE GODS!"
    const kt = "i!i"
    for (var k = 1; k < az83.length; k++) {
        // const k = 83
        const ct = Multiplicative.encrypt(pt, kt, k, az83)
        // console.log(ct)
        console.assert(Multiplicative.decrypt(ct, kt, k, az83) === pt)
    }
}

{
    eyes.forEach(v => console.log(v))
    // console.log(eyes.join(""))
    console.log(eyes.map(v => v.charCodeAt(1) - 32)) // [50, 80, 36, 76, 63, 34, 27, 77, 33]
    // console.log([50, 80, 36, 76, 63, 34, 27, 77, 33].map(v => Mod.inverse(v, 83)))

    // const kt = "i!i"
    // const kt = "iR<"
    const kt = az83
    // Multiplicative ct with k=1 should start the same as Vigenere
    // pt.forEach(v => console.log(kt, Vigenere.encrypt(v, kt, az83)))

    for (var k = 1; k < 83; k++) {
    // const k = 13
    // console.log(Multiplicative.encrypt("A. TEST ABC GODS", kt, k, az83))
    // console.log(Multiplicative.encrypt("B. TEST CDE GODS", kt, k, az83))
    // console.log(Multiplicative.encrypt("C. TEST EFG GODS", kt, k, az83))
    // console.log(Multiplicative.encrypt("D. SAYS EFG GODS", kt, k, az83))
    // console.log(Multiplicative.encrypt("E. SAYS EFG GODS", kt, k, az83))
    // console.log(Multiplicative.encrypt("F. SAYS GHI GODS", kt, k, az83))

    const ct = pt.map(v => Multiplicative.encrypt(v, kt, k, az83))
    ct.forEach(v => console.log(v))
    // console.log(ct.join(""))
    // ct.forEach(v => console.log(k, v[0].charCodeAt(0) - 32))
    const d = Multiplicative.decrypt(ct[2], kt, k, az83)
    console.log(d)
    console.log(pt[2])
    console.assert(d === pt[2])

    console.log(new Frequencies(ct.join(""), az83).sorted)
    console.log(Gaps.sum(ct.map(v => counts(v.gaps()))))

    const msgs = ct.slice(0, 3)
    const isomorphs = msgs.isomorphs(5, 15, 2, 13)

    // console.log(isomorphs)
    // console.log(Isomorphs.shared(isomorphs))
    const indexes = Isomorphs.index(isomorphs, msgs)
    console.log(k, indexes)
    // console.log(ct.map(v => v.split("").map(w => w.charCodeAt(0) - 32)))
    // console.log(ct.map(v => v.split("").map(w => (w.charCodeAt(0) - 32).toString(5).padStart(3,"0"))))
    }

    console.log(Multiplicative.decrypt('T =r]YTeLr', '87TVp58H6V', 67, az83))

    console.log(Chi.uniform(Vigenere.encrypt(pt[0], kt, az83), az83))
    console.log(Chi.uniform(Cipherkey.encrypt(pt[0], kt, az83), az83))
    console.log(Chi.uniform(Multiplicative.encrypt(pt[0], kt, 13, az83), az83))
    
    console.log(Chi.uniform(Multiplicative.decrypt(eyes[0], kt, 13, az83), az83))
    console.log(Multiplicative.decrypt(eyes[0], kt, 13, az83))
    console.log(Multiplicative.decrypt(eyes[1], kt, 13, az83))
    console.log(Multiplicative.decrypt(eyes[2], kt, 13, az83))
    console.log(Trithemius.decrypt(eyes[0], az83, az83))
    console.log(Trithemius.decrypt(eyes[1], az83, az83))
}

{
    const pt = "THEFITNESSGRAMPACERTESTISAMULTISTAGEAEROBICCAPACITYTESTTHATPROGRESSIVELYGETSMOREDIFFICULTASITCONTINUESTHETWENTYMETERPACERTESTWILLBEGININTHIRTYSECONDSLINEUPATTHESTARTTHERUNNINGSPEEDSTARTSSLOWLYBUTGETSFASTEREACHMINUTEAFTERYOUHEARTHISSIGNALASINGLELAPSHOULDBECOMPLETEDEACHTIMEYOUHEARTHISSOUNDREMEMBERTORUNINASTRAIGHTLINEANDRUNASLONGASPOSSIBLETHESECONDTIMEYOUFAILTOCOMPLETEALAPBEFORETHESOUNDYOURTESTISOVERTHETESTWILLBEGINONTHEWORDSTARTONYOURMARKGETREADYSTART"
    
    const t1 = Multiplicative.encrypt(pt, az83, 13, az83).split("")
    console.log(t1)
    console.log(new Set(t1))
}

{
    const msgs = eyes.slice(0, 3)
    const isomorphs = msgs.isomorphs(5, 15, 2, 13)

    // console.log(isomorphs)
    // console.log(Isomorphs.shared(isomorphs))
    const indexes = Isomorphs.index(isomorphs, msgs)
    console.log(indexes)

    console.log(Gaps.sum(eyes.map(v => counts(v.gaps()))))
    console.log(Vigenere.decrypt(eyes[0].shift(10), eyes[0], az83).duplicates())
}

{
    const inverses = []
    for (var i = 0; i < 87; i++) {
        inverses.push(Mod.inverse(i, 87))
    }
    console.log(inverses)
    console.log(new Set(inverses))
}

// https://www.researchgate.net/publication/304913747_A_Study_on_Network_Security_Services_with_Cryptography_and_an_Implementation_of_Vigenere-_Multiplicative_Cipher
{
    console.log(Multiplicative.encrypt("IAMSTUDYING", "MOBILE", 7))
}
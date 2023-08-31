const eyes = decode(10, [0,1,2,3,4])

// https://cp-algorithms.com/algebra/module-inverse.html

const morph = (v, i) => (i ** v) % 83
// const morph = (v, i) => (v * i) % 83
// const morph = (v, i) => (v ** i) % 83
// const morph = (v, i) => Mod.inverse(v ** i, 83)
// const morph = (v, i) => (i * Mod.inverse(v ** 5, 83)) % 83 
// const morph = (v, i) => Mod.inverse((v * i) ** i, 83) 
// const morph = (v, i) => Mod.inverse(v, 83)

const s = [...Array(83).keys()].map(v => morph(v, 13))
console.log(s)
const demorph = (v, i) => s.indexOf(v)

class Inverse {
    static cipher(pt, kt, az = az26) {
        // console.log("cipher", pt, kt, az)
        const k = kt.split("").map(v => az.indexOf(v))
        const pi = pt.split("").map(v => az.indexOf(v))
        const mi = pi.map((v, i) => i % 2 === 0 ? Mod.inverse(v, az.length) : v)
        // const mi = pi.map((v, i) => Mod.inverse(v, az.length))
        // const mi = pi
        // console.log(mi)
        const ki = mi.map((v, i) => k[i % (k.length)])
        const sums = pi.map((v, i) => mi[i] + ki[i])
        const mods = sums.map(v => v % (az.length))
        const ct = mods.map(v => az[v])
    
        return ct.join("")
    }

    static decipher(ct, kt, az = az26) {
        // console.log("decipher", ct, kt, az)
        const k = kt.split("").map(v => az.indexOf(v))
        const ci = ct.split("").map(v => az.indexOf(v))
        const ki = ci.map((v, i) => k[i % (k.length)])
        const sums = ci.map((v, i) => (ci[i] - ki[i]) + az.length)
        const mods = sums.map((v, i) => i % 2 === 0 ? Mod.inverse(v, az.length) : v % (az.length))
        const pt = mods.map(v => az[v])
    
        return pt.join("")
    }

    static encrypt = Inverse.cipher
    static decrypt = Inverse.decipher
}

{
    for (var i = 0; i < 83; i++) {
        // console.log(i, Mod.inverse(i, 83))
    }
    const kt = "PA"
    const pt = ["1. WATER", "2. XENOBOT", "3. YEARLY", "4. ZEBRAS"]
    const ct = pt.map(v => Inverse.encrypt(v, kt, az83))
    console.log(ct)
    console.log(ct.map(v => Inverse.decrypt(v, kt, az83)))
}

{
    console.log(new Set(Vigenere.encrypt(az83, az83, az83)))
    const ct = Inverse.encrypt(az83, az83, az83)
    console.log(ct)
    console.log(Inverse.decrypt(ct, az83, az83))
}

{
    const ct = pt.map(v => Inverse.encrypt(v, az83, az83))
    ct.forEach(v => console.log(v))
    ct.forEach((v,i) => console.assert(pt[i] == Inverse.decrypt(v, az83, az83)))
    ct.forEach((v,i) => console.log("PT", Inverse.decrypt(v, az83, az83)))
    eyes.forEach(v => console.log("EYE", Inverse.decrypt(v, az83, az83)))

    // const demorph = (v, i) => (Mod.inverse((v + i) ** 3, 83))
    // [50, 80, 36, 76, 63, 34, 27, 77, 33]

    const morphs = [...Array(83)].map((_,i) => i).map((v,i) => morph(v, i))
    // const morphs = [50, 80, 36, 76, 63, 34, 27, 77, 33]
    console.log(morphs)

    const gaps = []
    for (var i = 1; i < morphs.length; i++) {
        gaps.push(morphs[i] - morphs[i - 1])
    }
    console.log(gaps)
    console.log(gaps.slice(gaps.indexOf(30), gaps.indexOf(30) + 8))
    console.assert([30, -44, 40, -13, -29, -7, 50, -44].every((v,i) => v === gaps[i]) )

    for (var i = 0; i < 83; i++) {
        const a = [...Array(83).keys()].map(v => morph(v, i))
        // console.log(a)
        const gaps = new Map()
        for (var j = 0; j < a.length; j++) {
            for (var k = 0; k < a.length; k++) {
                const gap = a[j] - a[k]
                if (!gaps.has(gap)) gaps.set(gap, 0)
                gaps.set(gap, gaps.get(gap) + 1)
            }
        }
        // if (gaps.has(30) && gaps.get(30) > 1 && gaps.has(40) && gaps.has(50)) {
        //     console.log(i, gaps)
        //     console.log([...Array(83).keys()].map(v => morph(v, i)))
        // }
    }

    // const a83 = [...Array(83).keys()]
    // console.log(a83)
    // const i83 = a83.map(v => morph(v, 13))
    // console.log(i83)
    // console.log(i83.map(v => demorph(v, 13)))

    // console.log(new Set(s))
}

{
    // https://math.stackexchange.com/questions/956776/whats-the-inverse-operation-of-exponents
    // const s = []
    // for (var i = 0; i < 83; i++) {
    //     const i3 = ((i + 12)**3) % 83
    //     s.push(i3)
    //     console.log(i, i**3, i3 % 83, i3**3, (i3**3)**(1/3))
    // }
    // console.log(s)
}

{
    const a = 5 
    const b = Mod.inverse(7,11)
    const p = 11
    console.log((a + b) % p, (a % p + b % p) % p)
    console.log((a * b) % p, (a % p * b % p) % p)
    console.log((a / b) % p, ((a % p) * ((b**-1) % p)) % p)
}

{
     // [50, 80, 36, 76, 63, 34, 27, 77, 33]
     // [30, -44, 40, -13, -29, -7, 50, -44]
     for (var i = 0; i < 83; i++) {
        // const morphs = [1,2,3,4,5,6,7,8,9].map(v => i**3 * (Mod.inverse(v, 83) ** i*3) % 83)
        const morphs = [1,2,3,4,5,6,7,8,9].map(v => (v ** Mod.inverse(i, 83)) % 83)
        const gaps = []
        for (var j = 1; j < morphs.length; j++) {
            gaps.push(morphs[j] - morphs[j - 1])
        }
        console.log(gaps)
     }
}

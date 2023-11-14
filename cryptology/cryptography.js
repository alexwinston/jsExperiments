
class Linquist {
    static  wrap(i) {
        if (i >= 0) { return i }
        return i + 26 
    }

    static slide(ct, az = az26) {
        const freq = new Frequencies(ct, az)
        const sorted = freq.sorted.filter(v => v[1] > 1).slice(0,3)
        const counts = new Counts()
        for (const c of sorted) {
            // const shifts = []
            "ETAONIRSH".split("").forEach(v => counts.add(this.wrap(az.indexOf(c[0]) - az.indexOf(v))))
        }
        console.log(counts)
        return counts.sorted((v) => v[1] >= sorted.length - 1).map(v => v[0])
    }
}

class Substitution {
    static encrypt(pt, az1, az2) {
        return this.decrypt(pt, az2, az1)
    }
    
    static decrypt(ct, az1, az2) {
        const pt = []
        for (const c of ct) {
            pt.push(az1[az2.indexOf(c)])
        }
        return pt.join("")
    }
}

class Linear {
    static f = (m, a) => ({
        shift: (p, k, i, az = az26) => ABC.wrap(az, (((p + 1) * m) + a).mod(az.length) - 1),
        unshift: (p, k, i, az = az26) => ABC.wrap(az, this.inverse((p + 1), m, az.length, a) - 1)
    })

    static az(m, a, az = az26) {
        return az.map(v => (((az.indexOf(v) + 1) * m) + a - 1).mod(az.length)).map(v => az[v]).join("")
    }

    static encrypt(pt, m, a, az = az26) {
        return Shift.encrypt(pt, "", az, [Linear.f(m, a)])
    }

    static decrypt(ct, m, a, az = az26) {
        return Shift.decrypt(ct, "", az, [Linear.f(m, a)])
    }

    static inverse(n, multiplier, modulus, addend = 0) {
        // console.log(n, n - addend, Mod.inverse(multiplier, modulus), (n - addend) * Mod.inverse(multiplier, modulus))
        // console.log(((n - addend) * Mod.inverse(multiplier, modulus)).mod(modulus))
        return ((n - addend) * Mod.inverse(multiplier, modulus)).mod(modulus)
    }
}

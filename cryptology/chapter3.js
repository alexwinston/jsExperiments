// 3.1
{
    const ct = "EHSVHKBPFCIG"
    const shifts = Linquist.slide(ct)
    console.log(shifts)
    for (const shift of shifts) {
        const pt = Multiplicative.decrypt(ct, shift)
        console.log(pt, Monograms.fitness(pt))
    }
}

// 3.3
{
    const pt = "ABOUTFACE"
    console.log(Multiplicative.encrypt(pt, 5, az26))
    console.log(Shift.cipher(pt, "A", az26, [Shift.multiplicative(5)]))
    const ct = "EJWAVDEOY"
    console.log(Multiplicative.decrypt(ct, 5, az26))
    console.log(Shift.decipher(ct, "A", az26, [Shift.multiplicative(5)]))
}

{
    console.log(Multiplicative.encrypt("REVOLUTION", 19, az26))
    console.log(Multiplicative.encrypt("MIDNIGHT", 5, az26))
    console.log(Multiplicative.encrypt(az26, 5))
    console.log(Multiplicative.decrypt("EJOTYDINSXCHMRWBGLQVAFKPUZ", 5))
    console.log(Substitution.encrypt("MIDNIGHT", az26, Multiplicative.encrypt(az26, 5)))

    console.log(Multiplicative.encrypt("A SPACE HERE", 5, az26 + " ,"))
    console.log(Multiplicative.encrypt("NO ONE HERE", 9, az26 + " ,"))
    console.log(Multiplicative.encrypt("ONE, TWO, THREE", 8, az26 + " ,'"))
    console.log(Multiplicative.encrypt("I'M HIS, HE'S MINE", 7, az26 + " ,'."))
    console.log(Multiplicative.decrypt("CWAIZCMPIZEWMIACHE", 7, az26 + " ,'."))
}

// 3.4
{
    console.log(Multiplicative.decrypt("EJWAVDEOY", 5))
    console.log(Multiplicative.decrypt("MKCCKFI", 7))
    console.log(Multiplicative.decrypt("RDYRSCSPQ", 19))
    console.log(Multiplicative.decrypt("AWVFWYKLC", 11))
}

// 3.5
{
    const ct = "UQESF YFTGW SGPVS PPVQX QEDGR PMQFP YJSFG EORVQ DQBQF PVQWO MRTQW PUOTT SPPOM QWOFE TIXQS FIMLQ DYJUY FXQDO FCW".replaceAll(" ", "")
}

// 3.6
class Koblitz {
    static key(a, b, A, B) {
        const M = (A * B) - 1
        const e = (a * M) + A
        const d = (b * M) + B
        const n = ((e * d) - 1) / M
        return { M:M, e:e, d:d, n:n }
    }

    // TODO index the pt from az26 instead of from azN
    static encrypt(pt, e, n) {
        return Multiplicative.encrypt(pt, e, ABC.ascii(0,n)).map(v => v.charCodeAt(0))
    }

    static decrypt(ct, d, n) {
        return Multiplicative.decrypt(ct.map(v => String.fromCharCode(v)).join(""), d, ABC.ascii(0,n))
    }
}

{
    console.log(Koblitz.key(5, 7, 4, 3))
    console.log(Koblitz.encrypt("NUMERICAL", 59, 429))
    console.log(Koblitz.decrypt([404, 388, 345, 302, 211, 75, 184, 32, 286], 59, 429))

    console.log(Koblitz.key(3, 9, 5, 4))
    console.log(Koblitz.encrypt("PUBLIC", 62, 571))
}

// 3.9
{
    const ct = "TU2AK2326GR7F"
    const az = "0123456789 " + az26
    console.log(Caesar.decrypt(ct, 29, az))
}

{
    const ct = "$=Dollars?"
    const az = ABC.ascii(0, 127)
    console.log(ct.map(v => v.charCodeAt(0)))
    console.log(Caesar.encrypt(ct, 3, az).map(v => v.charCodeAt(0)))
}

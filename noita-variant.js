const eyes = decode(10, [0,1,2,3,4])

{
    const pt = ABC.filter("C equals P minus K".toUpperCase())
    const kt = "APPLE"
    console.log(pt.length / kt.length >> 0)
    console.log(Math.floor(pt.length / kt.length))
    console.log(pt.length % kt.length)

    console.log(Vigenere.decrypt("CLN", "A", az26))
    console.log(Vigenere.decrypt("ESU", "P", az26))
    console.log(Vigenere.decrypt("QPS", "P", az26))
    console.log(Vigenere.decrypt("UMK", "L", az26))
    console.log(Vigenere.decrypt("AI", "E", az26))

    console.log(pt.nth(1))
    console.log(Vigenere.decrypt(pt, "APPLE", az26))
    console.log(Variant.encrypt(pt, kt, az26))
    console.log(Variant.decrypt("CPBJWLDABENFDZ", kt, az26))
}

{
    const ct = Variant.encrypt(pt[0], az26, az83)
    console.log(new Frequencies(ct, az83))
    console.log(Variant.decrypt(ct, az26, az83))
}

{
    const e1 = split(eyes[0], 26)
    console.log(e1)
    console.log(Variant.decrypt(e1[0], e1[1], az83))
}

{
    eyes.forEach(v => console.log(split(v, 26)))
}
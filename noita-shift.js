const eyes = decode(10, [0,1,2,3,4])

{
    console.log(Vigenere.encrypt("ZEBRASEATGRASS", az26[15]))
    console.log(Vigenere.decrypt("OTQGPHTPIVGPHH", az26[15]))
    console.log(Vigenere.decrypt("BARFZN", az26[13]))
}

{
    // const ct = pt.map(v => Multiplicative.encrypt())
    console.log(Multiplicative.encrypt("ABCDIJA", 5, az26))
    // console.log(Multiplicative.encrypt("ABCDIJA", "A", 5, az26))
    console.log(Multiplicative.decrypt("AFKPOTA", 5, az26))
    // console.log(Multiplicative.decrypt("AFKPOTA", "A", 5, az26))

    console.log("Multiplicative")
    const ct = pt.map(v => Multiplicative.encrypt(v, 5, az83))
    ct.forEach(v => console.log(v))
    ct.forEach(v => console.log(Multiplicative.decrypt(v, 5, az83)))
}

{
    const ct = pt.map(v => Exponentiation.encrypt(v, "i!i", 5, az83))
    ct.forEach(v => console.log(v))
    ct.forEach(v => console.log(Exponentiation.decrypt(v, "i!i", 5, az83)))
}

{
    console.log("Multiple")
    console.log(Vigenere.encrypt("ABCDEF", "B", az26))
    console.log(Multiplicative.encrypt("BCDEFG", 3, az26))
    console.log(Shift.encrypt("ABCDEF", "B", az26, [Shift.additive, Shift.multiplicative(3)]))
    console.log(Shift.decrypt("DGJMPS", "B", az26, [Shift.additive, Multiplicative.f(3)]))

    console.log(Cipherkey.encrypt("UNICORN", az26[16], az26, Shift.chain(Shift.multiplicative(7), Shift.additive)))
    console.log(Cipherkey.decrypt("ANRFZOB", az26[16], az26, Shift.chain(Shift.multiplicative(7), Shift.additive)))
}

{
    const pt = "AAAAAAAAAA"
    console.log(Shift.encrypt(pt, "B", az26, [Shift.alternate(Shift.additive)]))
    console.log(Shift.encrypt(pt, "B", az26, [Shift.alternate(Shift.additive, 3)]))
    console.log(Shift.encrypt(pt, "B", az26, [Shift.additive, Shift.alternate(Shift.multiplicative(3), 3)]))
}

{
    console.log("Cipherkey")
    // const pt = ["QUICKBROWNFOX"]
    // const ct = pt.map(v => Cipherkey.encrypt(v, az83, az83, Vigenere))
    const kt = "i!i"
    const ct = pt.map(v => Cipherkey.decrypt(v, kt, az83, Shift.chain(Shift.alternating(Shift.multiplicative(30)), Shift.additive)))
    // const ct = pt.map(v => Cipherkey.encrypt(v, az83, az83, Shift.chain(Shift.additive)))
    ct.forEach(v => console.log(v))
    ct.forEach(v => console.log(Cipherkey.encrypt(v, kt, az83, Shift.chain(Shift.alternating(Shift.multiplicative(30)), Shift.additive))))
    // ct.forEach(v => console.log(Cipherkey.decrypt(v, kt, az83, Shift.chain(Shift.additive, Shift.alternating(Shift.exponetial(3))))))
    // ct.forEach(v => console.log(Cipherkey.decrypt(v, az83, az83, Shift.chain(Shift.additive))))

    console.log(new Frequencies(ct.join(""), az83))
    console.log(ct[0].ngrams(1))
    console.log(ct[0].ngrams(2))
    console.log(ct[0].ngrams(2, false))
    console.log(ct[0].ngrams(3, false))
    console.log(ct[0].ngrams(2, true, true))
    console.log(ct[3].ngrams(2, true, true))

    const isomorphs = ct.slice(0,2).isomorphs(4,15,2,16)
    console.log(isomorphs)
    console.log(Isomorphs.shared(isomorphs))
    const indexes = Isomorphs.index(isomorphs, ct.slice(0,2))
    console.log(indexes)

    // console.log(ct[0].gaps())
    // console.log(Gaps.counts(ct[0].gaps()))
    console.log(Gaps.sum(ct.map(v => Gaps.counts(v.gaps()))))

    // eyes.forEach(v => console.log(Cipherkey.decrypt(v, az83, az83, Shift.chain(Shift.exponetial(3)))))
    // eyes.forEach(v => console.log(Cipherkey.decrypt(v, "RUBEDO", az83, Shift.chain(Shift.additive, Shift.alternating(Shift.exponetial(3))))))
    // eyes.forEach(v => console.log(Cipherkey.encrypt(v, kt, az83, Shift.chain(Shift.alternating(Shift.exponetial(5)), Shift.additive))))
}

{
    const isomorphs = eyes.slice(1,3).isomorphs(6,23,4,23)
    console.log(isomorphs)
    console.log(Isomorphs.shared(isomorphs))
    const indexes = Isomorphs.index(isomorphs, eyes.slice(1,3))
    console.log(indexes)
    console.log(Gaps.sum(eyes.map(v => Gaps.counts(v.gaps()))))
}

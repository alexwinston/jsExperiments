// https://bribes.org/crypto/Vigenere36.html
{
    const ct = "HSKUS PMFHD UJJIX MSPTP OIPCI WKZVU \
    YPPNE USAIG BOOGA OPGPR HBOUC SHPVG \
    HQXZS ACKRK VBGHM VSFRY YTKHK VWZXV \
    LIJHW ARLKF IJSLT MHKAH QTUVT XSMEC \
    FCSKT GOOYB XZVLI JRYAC DWEJM SCAFP \
    IEAXO KAQDW EXPYP QHDNO JIXNZ JGNUD \
    OARFU ERJOY BDOKE IKDUV TDVEV LETDO \
    AFROU NYNBD VQOBE GGSHQ HXOPU ZCOCU \
    KKZLT PHKRT CCOAS BZUGB UBBUN OVTPO \
    VMIZD EPQFV KZ".filter()
    console.log(ct.ic(40, 50))
    console.log(Monograms.key(ct, 43))

    console.log(Vigenere.encrypt('jaienfinfinidecodermonprogrammedecryptage', 'fk45lch34', '9abcdefghijklmnopqrstuvwxyz012345678'))
}

{
    (async () => {
        const ct = "FMULRULJMTHWKOCTAVJKZGKPZXCW"

        await Quadgrams.load("http://localhost:3000/en_quadgrams.txt")
        console.log(Quadgrams.fitness("THIS"))
        console.log(Monograms.fitness("THIS"))
        console.log(Quadgrams.fitness("EVERYTHING"))
        console.log(Monograms.fitness("EVERYTHING"))
        console.log(Quadgrams.fitness("EVERYTHING".reverse()))
        console.log(Monograms.fitness("EVERYTHING".reverse()))
        console.log(Quadgrams.fitness("NEIBAVTUOT"))
        // console.log(Quadgrams.fitness(Vigenere.decrypt(ct, "CIPHAAA")))

        // console.log(Monograms.fitness("FYYFHPYMJJFXYBFQQTKYMJHFXYQJFYIFBS"))
    })//()
}

{
    console.log(["A"].equals(["A"]))
    console.log(["A"].equals(["B"]))
    console.log(["B"].equals(["A"]))
    console.log(["A", "A"].equals(["A", "A"]))
    console.log(["A", "B"].equals(["B", "A"]))
    console.log(["A", "B"].equals(["A", "B"]))
    console.log(["A", "B", "C"].equals(["A", "B"]))
    console.log(["A", "B"].equals(["A", "B", "C"]))
    console.log(["A", "B", "C"].equals(["A", "B", "C"]))

    console.log([["A", "B"], ["A", "C"]].has(["A", "B"]))
    console.log([["A", "B"], ["A", "C"]].has(["A", "C"]))
    console.log([["A", "B"], ["A", "C"]].has(["A", "B", "C"]))
    console.log([["A", "B"], ["A", "C"]].has(["B", "A"]))

    console.log([["A", "B"], ["A", "C"]].set())

    const az = "ABCD"
    console.log(az.permute(2).set())
}

{
    console.log("AB".enumerate(2))
    const az = '9abcdefghijklmnopqrstuvwxyz012345678'.toUpperCase()
    // console.log(az.enumerate(4)[0])

    console.log(az.enumerate(2))
    const enumerations = az.enumerate(4)
    for (var i = 0; i < enumerations.length; i++) {
        if (i % 100000 === 0) {
            console.log((enumerations[i] + "EEEEE").shift(4))
        }
    }
}

function brute(ct, quadgrams, az = az26) {
    let score = Number.MAX_VALUE
    let key = undefined

    const enumerations = az.enumerate(4)
    for (var i = 0; i < enumerations.length; i++) {
        const k = enumerations[i]
        const pt = Vigenere.decrypt(ct, k + "", az)
        const fitness = quadgrams.fitness(pt, 100)
        if (fitness < score) {
            score = fitness
            key = k
        }
    }
    console.log(score, key)
}

{
    (async () => {
        const ct = "pldaziqhaoyd9qfw79xxjj1uwamgxhaphkltv45cq".toUpperCase()
        console.log(ct.ic(3, 15))
        await Quadgrams.load("http://localhost:3000/fr_quadgrams.txt")
        console.log(Quadgrams.fitness("TOUTVABIEN", 100))
        console.log(Quadgrams.fitness("NEIBAVTUOT", 100))

        const az = '9abcdefghijklmnopqrstuvwxyz012345678'.toUpperCase()
        console.log(Quadgrams.fitness(Vigenere.decrypt(ct, "bk45eeeee".toUpperCase(), az), 100))
        // brute(messages[0].substring(0, 16), Quadgrams, az83)
        // console.log(Vigenere.decrypt(ct, "BK45EEEEE", az))
        console.log(Vigenere.decrypt(messages[0].substring(0, 16), "-+g7", az83))
    })()
}
// 4.1
{
    console.log(Linear.encrypt("MULTIPLY", 7, 2))
    console.log(Linear.encrypt("DECIMATE", 5, 8))
    console.log(Linear.encrypt("CONQUER", 9, 3))
}

// 4.2
{
    console.log(Numbers.gcd(14, 10))
    console.log(Numbers.gcd(35, 15))
    console.log(Numbers.gcd(16, 8))
    console.log(Numbers.gcd(69, 27))
    console.log(Numbers.gcd(182, 217))
    console.log(Numbers.gcd(5, 0))
    console.log(Numbers.gcd(15, 85))
}

// 4.4
{
    console.log(Linear.encrypt(az26, 19, 12))
    console.log(Linear.decrypt("EXQJCVOHATMFYRKDWPIBUNGZSL", 19, 12))

    console.log(Linear.encrypt("ADDITION", 19, 12))
    console.log(Linear.decrypt("EJJABAKR", 19, 12))
    console.log(Linear.decrypt("OXXMTMEB", 19, 12))

    console.log(Linear.encrypt("LINEAR", 14, 0, az26 + " "))
    console.log(Linear.decrypt("FRGPNI", 14, 0, az26 + " "))

    console.log(Linear.encrypt("CIPHER", 13, 4, az26 + "0123456"))
    console.log(Linear.decrypt("JVNICG", 13, 4, az26 + "0123456"))
}

// 4.5
{
    const ct = "UQESF YFTGW SGPVS PPVQX QEDGR PMQFP YJSFG EORVQ DQBQF PVQWO MRTQW PUOTT SPPOM QWOFE TIXQS FIMLQ DYJUY FXQDO FCW"
    console.log(ct)
    console.log(ct.ic(3,15))
    console.log(Linear.decrypt(ct, 3, 13))

    const pt = "We can only say that the decryptment of any cipher, even the simplest, will at times include a number of wonderings".toUpperCase()
    console.log(Linear.encrypt(pt, 3, 13))
    console.log(Substitution.encrypt(pt, az26, Linear.az(3, 13)))
}

{
    console.log(Linear.decrypt("VFQDYDMBMPO", 5, 20))
    console.log(Linear.decrypt(" 9AIBZE0ADZAEJBA9D66PL", 15, 9, "0123456789 " + az26))
    console.log(Linear.decrypt("5UHUEXUKELU5UH", 31, 17, "0123456789 " + az26))
    console.log(Linear.decrypt("L2 833 T20JIQ", 13, 20, "0123456789 " + az26))
    console.log(az26.map(v => (((az26.indexOf(v) + 1) * 7) + 9 - 1).mod(az26.length)).map(v => az26[v]).join(""))
    console.log(Linear.az(21, 0))
    console.log(Linear.az(7, 9))
}
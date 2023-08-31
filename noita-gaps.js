const eyes = decode(10, [0,1,2,3,4])

{
    // console.log(gaps(eyes[2], 1, 6))
    console.log(Gaps.counts(eyes[2].gaps()))
    console.log(Gaps.sum(eyes.map(v => Gaps.counts(v.gaps()))))

    const ct = Array(
        // eyes[0], eyes[1], eyes[2]
        // eyes[3], eyes[4], eyes[5]
        eyes[6], eyes[7], eyes[8]
    )
    const isomorphs = ct.isomorphs(4, 15, 2, 12)

    console.log(isomorphs)
    console.log(Isomorphs.shared(isomorphs))
    const indexes = Isomorphs.index(isomorphs, ct)
    console.log(indexes)

    // const isomorph = "ABCDECFAE" // 1,2,3
    // const isomorph = "ABCDEDFGHIJKLA" // 3,4,5
    const isomorph = "ABCDEFGHBIAD" // 6,7,8
    console.log(indexes.get(isomorph))

    const m = [
        "OMZdeo9FMiOd",
        "RY>gk:dVYXRg",
        "'B@>?3:(BN'>"
    ]
    console.log(Cipherkey.decrypt(m[0], m[1], az83))
}

{
    console.log(pt)
    // const az = shuffle(az83)
    const az = "VrYJkWThQq\"4Kd[H<!C03.l8e^mOG(9%E/g@S`?#f,L'+\\Rp-;b5_=:N]1UZPM2DI> 6$7icnXjB&ao*F)A"
    const ct = pt.map(v => Cipherkey.encrypt(v, "i!i", az))
    console.log(az)
    console.log(ct)
    console.log(Gaps.sum(ct.map(v => Gaps.counts(v.gaps()))))

    const ct3 = ct.slice(0,3)
    const isomorphs = ct3.isomorphs(4, 15, 2, 12)

    console.log(isomorphs)
    console.log(Isomorphs.shared(isomorphs))
    const indexes = Isomorphs.index(isomorphs, ct3)
    console.log(indexes)

    const m = [
        "DN1DoZ%'e*e",
        "!q4!Ed$FM/M",
        "nI nk$f_/W/"
    ]

    for (var i = 0; i < 10000; i++) {
        const az = shuffle(az83)
        const pt = Vigenere.decrypt(m[0], m[1], az)
        const d = pt.duplicates(1)
        for (const [k, v] of d) {
            if (v >= 7) {
                console.log("DUPLICATE", pt, az)
            }
        }
    }
    console.log(Cipherkey.decrypt(ct[0], "i!i", az))
    console.log(Cipherkey.decrypt(m[0], m[1], az83))
    console.log(Cipherkey.decrypt(m[0], m[1], ABC.key(m[0] + m[1] + m[2], az83)))
    // console.log(Cipherkey.decrypt(ct[0], m[0], ABC.key(m[0] + m[1] + m[2], az83)))
    const az_m = ABC.key(m[0] + m[1] + m[2], az83).shift(0)
    console.log(Cipherkey.decrypt(ct[0], "i!i", az_m))
}


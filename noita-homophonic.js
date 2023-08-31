const eyes = decode(10)

const expected = [0.0815,0.0144,0.0276,0.0379,0.1311,0.0292,0.0199,0.0526,0.0635,0.0013,0.0042,
    0.0339,0.0254,0.0710,0.08,0.0198,0.0012,0.0683,0.061,0.1047,0.0246,0.0092,
    0.0154,0.0017,0.0198,0.0008]

class Homophonic {
    static encrypt(pt) {
        // console.log(expected.length)
        // const az = expected.map(v => Math.round(83 * v))
        const az = [6, 1, 2, 3, 10, 2, 2, 4, 5, 1, 1, 3, 2, 6, 7, 2, 1, 6, 5, 8, 2, 1, 1, 1, 2, 1]
        // console.log("az", az)
        const offsets = [0].concat(az.map((s => a => s += a)(0))).slice(0, 26)
        // console.log(offsets)
        // console.log(az.reduce((a, c) => a + c, 0))

        // const pt = "THISISATESTOFTHEEMERGENCYBROADCASTSYSTEM"
        // const pt = "TTTTTTTTTTYYYYWWWW"
        var i = 0
        const ct = []
        for (var i = 0, j = 0; i < pt.length; i++) {
            const c = az26.indexOf(pt[i])
            const k = az[c]
            const offset = offsets[c] + (j++ % k)
            // console.log(pt[i], c, k, offsets[c], offset)
            ct.push(az83[offset])
        }
        return ct.join("")
    }
}

{
    // const pt = "THISISATESTOFTHEEMERGENCYBROADCASTSYSTEM"
    // const pt = "TTTTTTTTTTYYYYWWWWZZZ"
    // const pt = az26 + az26
    // const ct = encrypt(pt)
    const ct = pt.map(v => Homophonic.encrypt(v.replace(/[^A-Z]/g, '')))
    console.log(ct)
    console.log(new Frequencies(ct.join(""), az83))
    console.log(new Frequencies(eyes.join(""), az83))
}

{
    const pt =[
        "THEBESTTEST",
        "THESESTRESS",
        "THISISATEST"
    ]
    const ct = pt.map(v => Homophonic.encrypt(v))
    console.log(ct)
}
const trifid = new Trifid(5, az125)

const size = 3
const t1 = trifid.encrypt(trifid.encipher("A. Good help BBC LKSJD Same Need to add some emergency length!", size))
console.log(t1)
console.log(trifid.decrypt(t1, size))

const t2 = trifid.encrypt(trifid.encipher("B. Good test POIERY NM Same! Hope this helps solving the puzzle", size))
console.log(t2)
console.log(trifid.decrypt(t2, size))

const t3 = trifid.encrypt(trifid.encipher("1. TASE SHALL THEN PASS PASS the eyes are super annoying at this point", size))
console.log(t3)
console.log(trifid.decrypt(t3, size))

const t4 = trifid.encrypt(trifid.encipher("2. TEST SHALL MUST PASS please my eyes hurt why do I have to keep up", size))
console.log(t4)
console.log(trifid.decrypt(t4, size))

const t5 = trifid.encrypt(trifid.encipher("3. TEST WOULD THEN MUST PASS this needs to end otherwise eye might go", size))
console.log(t5)
console.log(trifid.decrypt(t5, size))

const text1 = "A Flash sales and promotions are the top reasons people B opt in to text messages from businesses. If you`re running a1  promotion and want your 3customers to take action immediately, there`s hardly a more proven 4method of getting the word out than text. You`re almost guaranteed7 a sharp boos8t in revenue and quick returns on 0your investment. Start 9by offering your customers a reward when they text in a keyword. This messageB can appear as a pop-up Con your Dwebsite with a widget that directly inputs the keyword on tFheir text messaginGg app."
const t6 = trifid.encrypt(trifid.encipher(text1, size))
console.log(t6)
const eyes = t6.split("").map(v => v.charCodeAt(0).toString(5).padStart(3, "0"))
console.log("eyes", split(eyes.join(""), 168).map(v => split(v, 3)))
console.log(trifid.decrypt(t6, size))

console.log(new Frequencies(t6, az125).f)

const tf = new Trifid(3)
console.log(tf.encrypt(tf.encipher("SECRETMESSAGE", 3)))

// http://practicalcryptography.com/ciphers/trifid-cipher/
const tf2 = new Trifid(3, "EPSDUCVWYM.ZLKXNBTFGORIJHAQ")
console.log(tf2.encrypt(tf2.encipher("DEFENDTHEEASTWALLOFTHECASTLE.", 5)))

{
    // https://en.wikipedia.org/wiki/Trifid_cipher
    const az = ABC.key("FELIXMARIEDELASTELLE", az26) + "."
    const size = 3
    const layers = []
    for (var i = 0; i < size; i++) {
        const az_slice = az.slice(i * size**2, (i + 1) * size**2)
        console.log(az_slice)
        layers.push(az_slice.chunk(size))
    }
    console.log(layers)
}

{
    const az = ABC.key("FELIXMARIEDELASTELLE", az26 + ".")
    // const az = ABC.ascii(32, 64)
    console.log(az)
    const size = 3
    const keys = new Map()
    const values = new Map()
    for (var i = 0; i < size**3; i++) {
        keys.set(i, i.toString(size).padStart(3, "0"))
        values.set(i.toString(size).padStart(3, "0"), i)
    }
    console.log(keys)
    const pt = "AIDETOILECIELTAIDERA"
    const k = pt.split("").map(v => keys.get(az.indexOf(v)))
    console.log(k)
    const group_size = 5
    const groups = k.chunk(group_size)
    console.log(groups)
    const ct = []
    for (var i = 0; i < groups.length; i++) {
        const trigrams = groups[i]
        console.log(trigrams)
        const group = [[],[],[]]
        for (var j = 0; j < trigrams.length; j++) {
            group[0].push(trigrams[j][0])
            group[1].push(trigrams[j][1])
            group[2].push(trigrams[j][2])
        }
        console.log(group)
        const regroup = group.map(v => v.join("")).join("").chunk(3)
        console.log(regroup)
        ct.push(...regroup.map(v => az[values.get(v)]))
    }
    console.log(ct.join(""))
}
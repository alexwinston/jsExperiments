
const alphabet = "0123456789!@#4%^&*()_+{}[]:'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ,. "
// const alphabet = [...Array(83)].map((v, i) => String.fromCharCode((i) + 32)).join('')
console.log(alphabet.length)

const message = 'To be concrete, descriptive writing has to offer specifics the reader can envision. Rather than Her eyes were the color of blue rocks Light blue, Dark blue, Marble, Slate, try instead, Her eyes sparkled like sapphires in the dark.'
// const message = 'Hello World'
function compress(s, base = 125n) {
    const values = s.split("").map(v => BigInt(alphabet.indexOf(v)))
    // console.log(values)

    let compressed = 0n
    for (var i = 0; i < values.length; i++) {
        compressed = compressed * base + values[i];
        // console.log(values[i], compressed)
    }
    return compressed
}

function cipher(n, base = 5n) {
    console.log("cipher1", n)
    const digits = []
    while (n) {
        // console.log(n)
        digits.push((n % base).toString())
        // n = Math.floor(n / base)
        n = n / base
    }
    console.log("digits1", digits)
    const ct = digits.reverse().join("").match(/.{1,3}/g)
    console.log(ct)
    return ct
}

function decipher(ct, base = 5n) {
    console.log("ct", ct)
    const a = ct.join("").split("")//.reverse()
    console.log(a)
    let b = 0n
    for (var i = 0; i < a.length; i++) {
        b = b * base + BigInt(a[i])
        // console.log(b)
    }
    // console.log(b)
    return b
}

function decompress(n, base = 125n) {
    // console.log(n)
    const d = []
    while (n) {
        d.push(n)
        // console.log(n)
        n = n / base
    }
    
    console.log("digits", d)
    console.log("indexes2", d.map(v => v % base))
    return d.map(v => alphabet[v % base]).reverse("").join("")
}

function decode(s, base = 5) {
    console.log(s)
    const d = s.split("").map(v => v.charCodeAt(0).toString(base))
    console.log(d) 
    return d
}

const base = 125n

function test(s) {
    // const ct = cipher(compress(message))
    // console.log(decompress(decipher(ct)))
    const ct = cipher(compress(s,base))
    console.log(ct.map(v => parseInt(v,5)))
    console.log(ct.map(v => String.fromCharCode(parseInt(v,5))).join(""))
    console.log("deciphered", decompress(decipher(ct),base))
    // console.log(decompress(decipher(decode("#8'Y 0';`b")),base))
}

test("A.HelloAlexJohnAlex")
test("B.HelloJohnAlex")
test('To be concrete, descriptive writing has to offer specifics the reader can envision. Rather than in Her eyes were the color of blue rocks Light blue, Dark blue, Marble, Slate, try instead, Her eyes sparkled like sapphires to be the dark.'.split(" ").join(""))

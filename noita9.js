
function compress(s) {
    const values = s.split("").map(v => BigInt(alphabet.indexOf(v)))
    console.log("compress", values)

    let compressed = 0n
    for (var i = 0; i < values.length; i++) {
        compressed = compressed * BigInt(length) + values[i];
        // console.log(values[i], compressed)
    }
    console.log(compressed)
    return compressed
}

function cipher(n, base = 83n) {
    // console.log("cipher1", n)
    const digits = []
    while (n) {
        // console.log(n)
        digits.push((n % base).toString())
        // n = Math.floor(n / base)
        // n = n / base
        n = n / base
    }
    // console.log("digits", digits)
    const ct = digits.reverse()//.join("").match(/.{1,3}/g)
    // console.log("cipher", ct)
    return ct
}

function encode(d, base = 5n) {
    const encoded = []
    return d.map(v => cipher(BigInt(v), base).join("").padStart(3,'0')).flat()
}

function decipher(ct, base = 83n) {
    console.log("decipher", ct)
    // const a = ct.join("").split("")//.reverse()
    // console.log(a)
    let b = 0n
    for (var i = 0; i < ct.length; i++) {
        // b = b * base + BigInt(a[i]) // len(alphabet)?
        b = b * base + BigInt(ct[i]) // len(alphabet)?
        // console.log(b)
    }
    // console.log(b)
    return b
}

function decompress(n) {
    const d = []
    while (n) {
        d.push(n)
        // console.log(n)
        n = n / BigInt(length)
    }
    
    // console.log("decompress", d)
    // console.log("indexes2", d.map(v => v % base))
    return d.map(v => alphabet[v % BigInt(length)]).reverse("").join("")
}

function decode(s, base = 5) {
    console.log(s)
    // const d = s.split("").map(v => v.charCodeAt(0).toString(base))
    // const d = s.map(v => decompress(BigInt(parseInt(v, base)),5n))
    const d = s.map(v => BigInt(parseInt(v, base)),5n)
    console.log("decode", d) 
    return d
}

function parse(s) {
    return s.split("").map(v => (v.charCodeAt(0) - 32).toString(5).padStart(3,'0'))
}

// const alphabet = " !@#$%^&*()_+0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ. "
// const alphabet = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ,. "
// const alphabet = "{}[]:\";'0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ,. !@#$%^&*()"
// const alphabet = "ijklmnopqrs!\"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefgh"
// const alphabet = " !\"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqr"
// const alphabet = [...Array(83)].map((v, i) => String.fromCharCode((i) + 32)).join('')
console.log(alphabet.length, alphabet)
const length = alphabet.length

function test(s, encrypt = true) {
    // const encoded = encode(cipher(compress(s,alphabet.length),base))
    const encoded = encode(cipher(compress(s)))
    // const ct = encode(cipher(compress("Hello World"),base))
    console.log(encoded)
    const ct = encrypt ? 
        encoded.join("").match(/.{1,3}/g).map(v => String.fromCharCode(parseInt(v,5) + 32)).join("") :
        s
    console.log(ct)
    console.log(parse(ct).map(v => parseInt(v,5)))
    // console.log("deciphered", decompress(decipher(decode(encoded),base),BigInt(alphabet.length)))
    console.log("deciphered", decompress(decipher(decode(parse(ct)))))
    // console.log(decompress(decipher(decode("#8'Y 0';`b")),base))
}



const message = 'To be concrete, descriptive writing has to offer specifics the reader can envision. Rather than in Her eyes were the color of blue rocks Light blue, Dark blue, Marble, Slate, try instead, Her eyes sparkled like sapphires to be the dark.'
// const message = "A. This is a test of the Emergency Broadcast System, EBS. "

test(message)
// test("Hello World")
// test("BAHELLOALEX")
// test("CBHELLOCOEN")
test("C.HELLOGODETHANJENNYHELL")
test("D.HELLOJENNYETHANGOD")
test('RAF#anf0H2\\O>)IWU]lgi3@qronC/-BUU*]Ke 5(W0`7J\'4c#TIhm25`H8Y7`I^%CHa"i!kPTK^RV6_74)_KGETd=\\\'3T:VcP(')
// test("Rb%P^-k=8]Jfb^@.q(/n\"=-Q!prH_q53 HSa:.5fOLPJ3P-O3Qh?%8#K[cAQI\\5:>%94g+jX$j3g$SIKphV_oq/0L?>,AY<-`KP",BigInt(alphabet.length))
// test("Rb%P^-k=8]Jfb^@.q(/n\"=-Q!prH_q53 HSa:.5fOLPJ3P-O3Qh?%8#K[cAQI\\5:>%94g+jX$j3g$SIKphV_oq/0L?>,AY<-`KP", false)
// test("pb%P^-k=8]Jfb^@.q(/n\"=-Q!=+>Tq53 9:V4.5fOLPJ3P-O3QL:[m`Ko<h`!>i7c&A9`qdN1D-15d-)NcYB^r/*i^\"+ahEL*Kd^)B2", false)
// test("mb%QkV\"\\=H\"W)/[2d#D%O\\5p!hW0rCY3!b2;G1jqG.n 9aKb`Fq78RY>gk:dVYXRgi.5(@:_%E3KbOUBb7i?VFmc+_o&65Sej5%1cE=5\\.rL>$4JC!?VN4H>", false)
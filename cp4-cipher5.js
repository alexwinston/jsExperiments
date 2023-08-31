// https://cp4space.hatsya.com/2012/11/27/cipher-5-99-problems-or-23/

// https://www.reddit.com/r/ciphers/comments/mdk7en/concepts_from_modern_encryption_to_strengthen/
// https://members.huntakiller.com/blog-articles/2020/4/7/cipher-answers

function az(n, az) {
    return az[az.indexOf(n)]
}

function substitute(s, az1, az2) {
    return s.split("").map(v => az1.indexOf(v) >= 0 ? az2[az1.indexOf(v)] : v)
}

// const frequencies = (s, az) => [...s].reduce((a, c) => az.indexOf(c) >= 0 ? (a[c] = ++a[c] || 1) && a : a, {})

const c5 = [
    "CRLHNMCHOHLQHNBX",
    "GRGYLNR.VCDWOCSB", 
    "ANNQNKCHNIDNDNNL",
    "OLMRMXHBQNRCKFSR",
    "XQCHCTYNBZQSMSXN",
    "SJRKHCRWRYD.ANQC",
    "NNCTXMMZFNEDXSRU",
    "RKGBMJSACAKXRUZR",
    "CQUHWNRRRMRLYNT.",
    "BNAQHRSXNUKBQXGC",
    "DQBZWUBOFBJHRSNR",
    "DEDEKXMJDARNSBAD",
    ".MPQMSQQRBNMDNWH",
    "BXSJMJDCONQNSRZB",
    "WNDKSYQSQDRFCCYD",
    "RRSJXNJRVAUXVXHA"
]
console.log(c5.join(""))

const f = new Frequencies(c5.join(""), az26)
console.log(f)
console.log(f.f)
console.log(f.az)
console.log(f.sorted)
console.log(f.substitute())
console.log(split(f.substitute(), 16))
// const ct = split(substitute(c5.join(""), "NRCQSDBHXAMJKLUWYOZFGETVIP", english).join(""), 16)
// const ct = split(substitute(c5.join(""), new Frequencies(c5.join(""), az26).az(), english).join(""), 16)
// const ct = split(f.substitute(), 16)
const ct = c5

console.log(ct)
console.log(f.substitute().split("").map(v => ["E", "T", "A", "O", "I"].includes(v) ? v : "_").join(""))

// const ct = [
//     "ATMHELAHYHMOHESR",
//     "BTBPMET.KANFYAIS",
//     "DEEOECAHEQNENEEM",
//     "YMLTLRHSOETACVIT",
//     "ROAHAXPESWOILIRE",
//     "IUTCHATFTPN.DEOA",
//     "EEAXRLLWVEJNRITG",
//     "TCBSLUIDADCRTGWT",
//     "AOGHFETTTLTMPEX.",
//     "SEDOHTIREGCSORBA",
//     "NOSWFGSYVSUHTIET",
//     "NJNJCRLUNDTEISDN",
//     ".LZOLIOOTSELNEFH",
//     "SRIULUNAYEOEITWS",
//     "FENCIPOIONTVAAPN",
//     "TTIUREUTKDGRKRHD",
// ]

const ct2 = ct.join("")
const ct3 = ct2.split(".")
console.log(ct2)
console.log(new Set(ct2))
console.log(ct3)
ct3.forEach(v => console.log(v.length))
// console.log(new Set(ct3[0]))

const ct4 = []
for (var i = 0; i < 16; i++) {
    for (var j = 0; j < 16; j++) {
        ct4.push(ct[j][i])
    }
}
console.log(ct4)
const ct5 = ct4.join("").split(".")
console.log(ct5)
ct5.forEach(v => console.log(v.length))

const ct6 = []
for (var i = 0; i < ct5[1].length; i+=2) {
   ct6.push(az26.indexOf(ct5[1][i]) + az26.indexOf(ct5[1][i+1]))
}
console.log(ct6.join(" "))

// console.log(decipher(ct3[2], ct3[3], az26))
for (var i = 0; i < ct3[3].length; i++) {
    const s = shift(ct3[3], i).join("")
    // console.log(decipher(ct3[2], s, az26))
}

const ct7 = (ct3[2] + ct3[3]).split("").map(v => az26.indexOf(v))
console.log(ct7)
for (var i = 1; i < ct7.length; i++) {
    // console.log(az26[ct7[i] + ct7[i-1]])
}

console.log(xor(String.fromCharCode(az26.indexOf("Z")), String.fromCharCode(az26.indexOf("D"))).charCodeAt(0))
const k1 = ct3[0].split("").map(v => az26.indexOf(v))
console.log(k1)

for (var i = 1; i < k1.length; i++) {
    // console.log(az26[xor(String.fromCharCode(ct7[i]), String.fromCharCode(k1[i])).charCodeAt(0)])
}

// console.log(think(c2, abc("LEFT", az26), tshift(abc("LEFT", az26), "BRAIN")))
// const t1 = tshift(abc(ct3[0], az26), ct3[0])
const t1 = tshift(az26, "JAYZ")
console.log(t1)
console.log(think(ct3[2] + ct3[3], az26, t1).join(""))
// console.log(think(ct3[2] + ct3[3], abc("HILBERT", az26), t1).join(""))

function wrap(i) {
    if (i >= 0) { return i }
    return i + 26 
}

// const euler = [5, 9, 13, 17, 21, 29, 33, 37, 41, 49]
const euler = [99, 98, 97, 96, 95, 94, 93, 92, 91, 90]
// const euler = "99989796959493929190"
// const euler = "25852016738884976640000"
// const euler = "271828182845904523536028747135266249775724709369995"
// const c4 = ct3[0].split("").map((v,i) => az26[wrap(az26.indexOf(v) - parseInt(euler[i]))]).join("")
const c4 = ct3[0].split("").map((v,i) => az26[(az26.indexOf(v) + euler[i]) % 26]).join("")
// const c4 = ct3[0].split("").map((v,i) => az26[(4 * (az26.indexOf(v) - 1)) % 26]).join("")
// const c4 = c2.split("").map((v,i) => az26.indexOf(v) - parseInt(pi[i]))
console.log("euler", c4)

// console.log(euler.map(v => az26[v % 26]))

console.log(new Set("CRLHNMCHOHLQHNBXGRGYLNR".split("")))
console.log(decipher("gwox{RgqssihYspOntqpxs}".toUpperCase().replace(/[^A-Z]/g, ''), "blorpy".toUpperCase(), az26))

// https://puzzling.stackexchange.com/questions/31612/hilberts-hopes
const text = [
    "EHT_SC_ECICSGROT",
    "FOSITIFONEISANEH",
    "NUIOAHTRURHTCITY",
    "DATNMEAMTEOFUNI_",
    "LAF__OATANNISIFO",
    "LEO_EFNUHEHES_MA",
    "AXNOGDART_TRCAMT",
    "CTKWLELPNINEITEH",
    "PMOAMTEHERANUSND",
    "LECYTINOTS_DO_AE",
    "ETULA_AMSAAMLATN",
    "LYFFHTNEDMNYZEHU",
    "IHTIYTNEEIGTITSS",
    "SH_LAHEWTFGICDAI",
    "GISSM_ECRYNISILE",
    "HMIIONNTU_BRCIPS"
]
console.log(text.join(""))

const h1 = text.map(v => v.split(""))

// https://stackoverflow.com/questions/42519/how-do-you-rotate-a-two-dimensional-array
const transpose = m => m[0].map((x,i) => m.map(x => x[i]))

const h2 = transpose(h1).reverse()
console.log(h2)
// const h2 = transpose(h1.slice().reverse())
// const h2 = transpose(transpose(h1.slice().reverse()).slice().reverse())

const hc1 = ct.map(v => v.split(""))
// const hc2 = h2
const hc2 = hc1
// const hc2 = transpose(hc1).reverse()
// const hc2 = transpose(transpose(hc1.slice().reverse()).slice().reverse())
// const hc2 = transpose(hc1.slice().reverse())
console.log("hc2", hc2)
const r1 = hc2.map(v => v.join("")).join("").split(".")
console.log(r1)
console.log(r1.map(v => v.length))
console.log(new Frequencies(r1.join(""), az26).substitute())

function rotate(t, n) {
    // console.log("rotate", t, n)
    switch (n) {
        case 1: 
            return transpose(t).reverse().slice()
        case 2:
            return transpose(transpose(t.slice().reverse()).slice().reverse()).slice()
        case 3: 
            return transpose(t.slice().reverse()).slice()
        default:
            return t
    } 
}

function curve(t, n) {
    const h = []
    for (var i = 0; i < 256; i++) {
        const hc = HilbertCurve.point(i, n)
        // console.log(hc)
        h.push(t[hc.y][hc.x])
    }
    return h.join("")
}

const c1 = curve(h2, 4)
console.log(c1)

console.log(new Frequencies(c1, az26).substitute())
console.log(c1.split(".").map(v => v.length))

console.log([1, 2, 6, 7, 8, 13, 16, 19, 21, 22].map(v => c5.join("").charAt(v)))
console.log([3, 7, 10, 14, 17, 18, 19, 20].map(v => c5.join("").charAt(v-1)))

const ct10 = split(new Frequencies(ct5[1], az26).substitute(), 10)
// const ct10 = split(ct5[1], 10)
console.log(ct10)

console.log(ct2.split("").map(v => az26[(3 * az26.indexOf(v) - 1) % 26]))

console.log(ct3)
console.log(new Frequencies(ct3[0] + ct3[2] + ct3[3], az26).substitute())

const t5 = c5.map(v => v.split(""))
console.log(t5)

const f1 = new Frequencies(curve(rotate(t5, 0), 4)).substitute()
const f2 = new Frequencies(curve(rotate(t5, 1), 4)).substitute()
const f3 = new Frequencies(curve(rotate(t5, 2), 4)).substitute()
const f4 = new Frequencies(curve(rotate(t5, 3), 4)).substitute()

console.log(f1)
console.log(f1.split(".").map(v => v.length))
console.log(f2)
console.log(f2.split(".").map(v => v.length))
console.log(f3)
console.log(f3.split(".").map(v => v.length))
console.log(f4)
console.log(f4.split(".").map(v => v.length))

console.log(curve(rotate(rotate(rotate(rotate(h2, 1), 2), 3), 2), 4))

console.log(curve(t5, 4))
console.log(curve(t5, 4).split(".").map(v => v.length))

console.log("23", new Frequencies(ct3[0]).az)
console.log("23", new Frequencies(ct3[0]).substitute())
console.log("99", new Frequencies(ct3[2] + ct3[3]).az)
console.log("99", new Frequencies(ct3[2] + ct3[3]).substitute())
console.log(curve(split(new Frequencies(c5.join("")).substitute("RNBAXDQCMSUKZEJHTFGWLYO"), 16).map(v => v.split("")), 4))

// const s99 = new Frequencies(c5.join(""))
// for (var i = 0; i < 100; i++) {
//     const az = shuffle(az26)
//     console.log(az, s99.substitute(az))
// }

const kryptos = abc("HILBERT", az26)
console.log(Vigenere.decrypt(ct3[2] + ct3[3], ct3[0], kryptos))

console.log(new Frequencies(ct3[0] + ct3[2] + ct3[3]).substitute())

const etaoi = f.substitute().split("").map(v => ["E", "T", "A", "O", "I", "N", "S", "R", "H"].includes(v) ? v : "_")
console.log(etaoi)
console.log(curve(rotate(split(etaoi.join(""), 16).map(v => v.split("")), 4), 4))
console.log(curve(rotate(split(etaoi.join(""), 16).map(v => v.split("")), 1), 4))
console.log(curve(rotate(split(etaoi.join(""), 16).map(v => v.split("")), 2), 4))
// console.log(curve(rotate(split(etaoi.join(""), 16).map(v => v.split("")), 3), 4))

const primes = [1, 5, 9, 13, 17, 21, 25, 29, 33, 37, 41, 45, 49, 53, 57, 61, 65, 69, 73, 77, 81, 85, 89, 93, 97, 101, 105, 109, 113, 117, 121, 125, 129, 133, 137, 141, 145, 149, 153, 157, 161, 165, 169, 173, 177, 181, 185, 189, 193, 197, 201, 205, 209, 213, 217, 221, 225, 229, 233, 237]
console.log(ct2.split("").map((v,i) => ct2.charAt(primes[i])).join(""))
console.log(new Frequencies(ct2.split("").map((v,i) => ct2.charAt(primes[i])).join("")).substitute())

{
    const ct = c5.join("")
    console.log(ct)
    const ct_split = ct.split(".")
    console.log(ct_split)
    const ct3 = ct_split[2] + ct_split[3]
    console.log(ct3)
    console.log(ct3.ic(2, 99, az26))
    const k = Chi.key(ct3, 99, az26)
    console.log(k)
    console.log(Vigenere.decrypt(ct, k))

    // const isomorphs = ct.isomorphs(5, 15, 2, 23)
    const isomorphs = ct_split.slice(1,3).isomorphs(4, 18, 2, 23)
    console.log(isomorphs)
    const indexes = Isomorphs.prune(Isomorphs.index(isomorphs, ct_split.slice(1,3)))
    console.log(indexes)
    "CRLHNMCHOHLQHNBXGRGYLNR.VCDWOCSBANNQNKCHNIDNDNNLOLMRMXHBQNRCKFSRXQCHCTYNBZQSMSXNSJRKHCRWRYD.ANQCNNCTXMMZFNEDXSRURKGBMJSACAKXRUZRCQUHWNRRRMRLYNT.BNAQHRSXNUKBQXGCDQBZWUBOFBJHRSNRDEDEKXMJDARNSBAD.MPQMSQQRBNMDNWHBXSJMJDCONQNSRZBWNDKSYQSQDRFCCYDRRSJXNJRVAUXVXHA"

    console.log(Vigenere.decrypt("QCHCTYNBZQSMS", "SRURKGBMJSACA", az26))

    const ct_hilbert = "TMETOCUNOCIZHSRNKINRAIEDFLIWRNKUSFMLMETOTTSYRHCIANIOHHCGOSECIOTJDNIYTREIEHEBTFSJAASLDNGWRLMETONOTORDNTEVAXESIGPTURLETCRDNBEFHTADEBTRWGNIONKUSTSOFWTFTIAESOEDHUNEBOTPEORSREAYLIPNMEATNQEIEJALYLTAHEPEUEHSLALREGTMWDOHHCHSLAXALATUXRVAEUTEOCISYDEPHTIEVGLPTTVA"
    console.log(Isomorphs.index([ct_hilbert.isomorphs(5,18,2)], [ct_hilbert]))
    console.log(Vigenere.decrypt("HCHSLAXA", "EUEHSLAL", az26)) // HCHSLAXA
}

{
    const ct = c5.join("")
    console.log(Gronsfeld.decrypt(new Frequencies(ct.split(".")[0]).substitute(), [99, 98, 97, 96, 95]))
}

{
    const ct = c5.join("").split(".")[4]
    console.log(ct.ic(1, 15, az26))
    for (var i = 0; i < 40; i++) {
        const k = Chi.key(ct, i, az26)
        // console.log(Vigenere.decrypt(ct, k, az26))
    }
}

class Matrix {
    static transpose = m => m[0].map((x,i) => m.map(x => x[i]))

    constructor(mx) {
        this.mx = mx
    }

    rotate(n = 1) {
        for (var i = 0; i < n; i++) {
            this.mx = Matrix.transpose(this.mx.slice().reverse())
        }
        return this
    }

    flip() {
        const flipped = []
        for (var i = 0; i < this.mx.length; i++) {
            for (var j = 0; j < this.mx[i].length; j++) {
                flipped.push(this.mx[j][i])
            }
        }
        this.mx = chunk(flipped, this.mx.length)
        return this
    }

    join() {
        return this.mx.map(v => v.join("")).join("")
    }

    lengths(seperator) {
        return this.join().split(seperator).map(v => v.length)
    }
}

{
    const gt = split(Gronsfeld.decrypt(c5.join(""), Hilbert.sequence(256)), 16).map(v => v.split(""))
    console.log("GT", gt)

    // const ct = new Matrix(c5.map(v => v.split("")))
    const ct = new Matrix(gt)
    console.log(ct.flip().mx)
    for (var i = 0; i < 4; i++) {
        console.log(ct.join())
        const hc = curve(ct.mx, 4)
        console.log("PT", hc)
        const f = new Frequencies(hc, az26).substitute()
        console.log("FT", f)
        console.log(ct.lengths("."))
        
        ct.rotate()
        // ct.flip()
    }

    console.log(curve(new Matrix(text.map(v => v.split(""))).rotate(3).mx, 4))
}

{
    console.log(Hilbert.sequence(100))
    console.log(Numbers.gcf([8, 12, 20]))
    console.log(Numbers.gcf([8, 12, 20, 9]))
    console.log(Numbers.gcf([50, 40, 20, 90, 10]))
    console.log(Numbers.gcf([20, 100]))
    console.log(Numbers.gcf([3, 12, 66, 99, 9, 6, 6, 3, 12]))
    console.log(Numbers.primes(84))
    console.log([5, 9, 13, 17, 21, 29, 33, 37, 41, 49, 53, 57, 61, 69, 73, 77, 89, 93, 97, 101, 109, 113, 121, 129, 133, 137, 141, 149, 157, 161, 173, 177, 181, 193, 197, 201, 209, 213, 217, 229, 233, 237, 241, 249, 253, 257, 269, 277, 281, 293, 301, 309, 313, 317, 321, 329])
}

{
    function curve2d(s) {
        const ct = rotate(s.map(v => v.split("")), 2)
        // const ct = c5
        const hilbert = new Hilbert2d(256)
        console.log(hilbert)
        const pt = []
        for (var i = 0; i < 256; i++) {
            const p = hilbert.d2xy(i)
            pt.push(ct[p.x][p.y])
        }
        return pt.join("")
    }

    const az = az26

    // const t1 = new Frequencies(pt.join("")).substitute()
    const t1 = curve2d(c5)
    const t1a = curve(rotate(c5.map(v => v.split("")), 4), 4)
    console.log("CURVE", t1)

    const t2 = Vigenere.decrypt(t1, "JZ", az)
    const t2a = Vigenere.decrypt(t1a, "JZ", az)
    console.log("VIGENERE", t2)
    console.log(t2.split("."))
    console.log(Vigenere.decrypt(c5.join(""), "JZ", az))

    console.log(Vigenere.decrypt(ct3[0], "JZ"))
    console.log(Vigenere.decrypt(ct3[1], "JZ"))
    console.log(Vigenere.decrypt(ct3[2], "JZ"))
    console.log(Vigenere.decrypt(ct3[3], "JZ"))
    console.log(Vigenere.decrypt(ct3[4], "JZ"))
    console.log(ct3)

    console.log(Vigenere.decrypt("T.E.S.T", "JZ"))
    console.log(t2.chunk(16).join("\n"))

    function solve(ct, pt) {
        ct = ct.split("")
        for (var i = 0; i < pt.length; i++) {
            if (ct.indexOf(pt[i]) == -1) { console.assert(false) }
            ct.splice(ct.indexOf(pt[i]), 1)
            // console.log(ct)
        }
        return pt + " " + ct.join("")
    }

    console.log(solve("RIPESINAIOUTTDOW", "ITWASNOT"))
    console.log(solve("OGIVRWHEEPICEREN", "VIGENERECIPHER"))
    console.log(solve("EIASREWCLOINILSM", "REALISM"))
    console.log(solve("POORITSTEBUSTHK.", "THEPOORISBUT"))
    console.log(solve("IVIALSOTEBDTORTO", "TOSOLVEITABORT"))
    console.log(solve("ITEMSYSTTOYPUOWL", "PUTSYSTEM"))
    console.log(solve("TSUONRCETIFWEJER", "JUSTENTERFOR"))
    console.log(solve("SSPAHT.EVEOLROWD", "THEPASSWORD.LOVE"))
    console.log(solve("RADTANONTITUPSNO", "SORTITUPAND"))
    console.log(solve("SITI.ITSENEMELON", "ITIS.ISEEMTO"))
    console.log(solve("INERPICHISTHROCP", "ISNOTCIPHER"))
    console.log(solve("OTARTIBSTUSHBOES", "STARTTOUSE")) //SORTABOUTTHE
    console.log(solve("TRECUEVRSEVAHBLI", "HILBERTCURVESAVE"))
    console.log(solve("NIIOISOTSPANOVNL", "POSITION"))
    console.log(solve("DNATHRTEHTIKEZJY", "JZKEYHADTHEN"))
    console.log(solve("ATULARGTON.CNOIS", "CONGRATULATIONS."))

    console.log(solve(
        "RIPESINAIOUTTDOWOGIVRWHEEPICERENEIASREWCLOINILSMPOORITSTEBUSTHK",
        "NOTUSETHEVIGENERECIPHERBUTWORRIEDTESTSPOILRISKCLAIMWAS"
    ))

    function transposed(t, a, b) {
        const pt = Array.from({ length: 16 }, (_, i) => [])
        for (var i of a) {
            for (var j of b) {
                pt[i].push(t[i][j])
            }
        }
        return pt.map(v => v.join("")).filter(v => v.length)
    }

    const t99 = t2a.chunk(16)
    console.log(t99.join("\n"))
    const s1 = transposed(t99, [0,2,5,7,8,13,15], [0,3,2,1,14,15,12,13,8,11,10,9,6,7,4,5])
    console.log(s1.join("\n"))
    const s2 = transposed(t99, [4,6,12,14,10], [10,11,8,9,6,5,4,7,2,3,0,1,14,13,12,15])
    console.log(s2.join("\n"))
    const s3 = transposed(t99, [1,3,9,11], [10,9,8,11,12,15,14,13,2,1,0,3,4,7,6,5])
    console.log(s3.join("\n"))
    console.log(s1[0])
    console.log(s3[1])
    console.log(s1[1])
    console.log(s3[0])
    console.log(s2[4])
    console.log(s1[6])
    console.log(s2[3])
    console.log(s1[5])
    console.log(s1[4])
    console.log(s3[3])
}

{
    // NOTE Something like this is actually supposed to be the solution I think
    ct3.forEach(v => console.log(Vigenere.decrypt(v, "JZ")))
    const ct = Vigenere.decrypt(c5.join(""), "JZ", az26)
    console.log(ct)
    console.log(curve(rotate(ct.chunk(16).map(v => v.split("")), 2), 6))
}
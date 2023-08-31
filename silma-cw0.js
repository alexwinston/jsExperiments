// https://discord.com/channels/453998283174576133/817530812454010910/1105910655057412167
const pt1 = "THISISALONGPHRASEFORTESTINGPURPOSES"
const pt2 = pt1.repeat(100)
const ct1 = Vigenere.encrypt(pt2, "A" + pt2, az26)
console.log(split(ct1, pt1.length))

const ct2 = Autokey.encrypt(pt2, "A")
console.log(split(ct2, pt1.length))
console.log(Autokey.decrypt(ct2, "A"))

const ct3 = Cipherkey.encrypt(pt2, "A")
console.log(split(ct3, pt1.length))
console.log(Cipherkey.decrypt(ct3, "A"))

const ct4 = Autokey.encrypt(pt1, "A")
console.log(ct4)
console.log(Autokey.decrypt(ct4, "A"))

console.log(Cipherkey.encrypt("ABCTESTBAD", "XYZ"))
console.log(Cipherkey.decrypt("XZBUYQJKKN", "XYZ"))

console.log(Cipherkey.encrypt("AAAAAAAAAAAAAA", "BB"))
console.log(Cipherkey.decrypt("BBBBBBBBBBBBBB", "BB"))

console.log(Cipherkey.encrypt(az26.split("").reverse().join(""), az26))
console.log(Cipherkey.decrypt("ZZZZZZZZZZZZZZZZZZZZZZZZZZ", az26))

// https://discordapp.com/channels/453998283174576133/817530812454010910/1120457777253449891
{
    const pt = "ONCEQUESTIONABLESHRIMPFOREVERQUESTIONABLESHRIMP"
    const ct = Vigenere.encrypt(pt, az26, az26)
    console.log(ct)
    const isomorphs = ct.isomorphs(5, 18, 2, 13)
    console.log(isomorphs)
}

String.prototype.ngrams = function(length, min = 1, sliding = true, repeats = false) {
    const ngrams = new Map()
    for (var i = 0; i <= this.length - length; i += sliding ? 1 : length) {
        const ngram = this.slice(i, i + length)
        if (repeats && new Set(ngram).size > 1) { continue }
        if (!ngrams.has(ngram)) { ngrams.set(ngram, new Ngram(ngram) )}
        ngrams.get(ngram).indexes.add(i)
    }
    return [...ngrams.values()].filter(v => v.indexes.size >= min)
}

class Ngram {
    constructor(s) {
        this.s = s
        this.indexes = new Set()
    }
}

class Ngrams {
    static union(maps) {
        const m = new Map()
        for (var i = 0; i < maps.length; i++) {
            for (const j of maps[i]) {
                if (!m.has(j[0])) { m.set(j[0], 0) }
                m.set(j[0], m.get(j[0]) + j[1])
            }
        }
        return [...m].sort((a, b) => b[1] - a[1])
    }
}

// https://discord.com/channels/453998283174576133/817530812454010910/1141505694026178690
// https://www.reddit.com/r/codes/comments/159icwg/unsolved_ancient_italian_cryptogram/
{
    // const az = ABC.ascii(65, 30)
    const az = "ABCDEFGHILMNOPQRSTUVZ123456789"
    console.log(az)
    const ct = "05 08 06 20 09 18 05 10 14 26 22 17 18 14 28 21 18 18 10 21 09 22 05 24 10 17 14 17 19 22 11 10 05 15 03 23 14 07 08 13 18 15 22 09 23 19 29 19 09 11 08 19 05 18 22 09 04 23 18 22 07 09 19 28 17 14 20 28 22 07 08 09 11 19 25 17 19 22 23 28 09 14 06 22 17 10 09 14 11 11 15 17 07 08 11 24 16 09 19 26 05 13 09 08 10 11 14 09 18 08 19 20 05 16 19 15 08 11 14 14 02 21 13 09 07 17 19 19 05 17 07 16 20 19 07 17 13 25 23 13 23 23 23 18 13 06 17 23 14 07 15 05 18 13 12 13 22 06 27 21 20 20 10 14 09 18 22 09 05 15 14 19 15 18 30 21 14 22 14 26 13 13 05 22 14 14 13 18 07 08 26 17 15 09 01 10 26 16 10 26 21 06 27 04 29 11 27 16"
    console.log([...new Set(ct.split(" ").map(v => parseInt(v)))].sort((a,b) => a - b))
    console.log(ct.chunk(33).map(w => w.split(" ").map(v => az[parseInt(v) - 1]).join("")).join("\n"))
    const ct2 = ct.split(" ").map(v => az[parseInt(v) - 1]).join("")
    console.log(ct2)
    const ngrams = ct2.ngrams(3,2)
    console.log(ngrams)
    const isomorphs = ct2.isomorphs(10)
    console.log(isomorphs)
    console.log(new Set(isomorphs.map(v => v.pattern())))
}

{
    console.log(Vigenere.encrypt("THEWHEATSTONECIPHER", "A?ZZYXWWVVUTSRRRQPP", "ABCDEFGHIJKLMNOPQRSTUVWXYZ?"))
}

{
    const az30 = "ABCDEFGHILMNOPQRSTUVZ123456789"
    const az21 = "FBSDEAGHILMNOPQRCTUVZ"
    const ct = "EHFVITELP51STP7ZTTLZI1E3LSPSU1MLEQC2PGHOTQ1I2U8UIMHUET1ID2T1GIU7SPV71GHIMU4SU127IPF1SLIPMMQSGHM3RIU5EOIHLMPITHUVERUQHMPPBZOIGSUUESGRVUGSO42O222TOFS2PGQETONO1F6ZVVLPIT1IEQPUQT9ZP1P5OOE1PPOTGH5SQIAL5RL5ZF6D8M6R"
    const pt = Homophonic.decrypt(ct, [3,1,1,1,2,1,1,1,3,1,1,1,2,1,1,2,2,2,1,1,1], az30, az21)
    console.log(new Frequencies(pt, az21).substitute("IAEROTSNCMLGPDVUBZFHQ"))
}

// https://discord.com/channels/453998283174576133/817530812454010910/946611687581171752
{
    console.log(Cipherkey.encrypt("CIPHERTEXTAUTOKEY", "EGODKOFYCZSSMFTDH", az26))
    console.log(Cipherkey.encrypt("CIPHERTEXTAUTOKEY", "JLTIPTKDHEXXRKYIM", az26))
    console.log(Vigenere.decrypt("EGODKOFYCZSSMFTDH", "JLTIPTKDHEXXRKYIM", az26))

    console.log(Trithemius.encrypt("PROGRESSIVEALPHABET", "DEFGHIJKLMNOPQRSTUV", az26))
    console.log(Trithemius.encrypt("PROGRESSIVEALPHABET", "MNOPQRSTUVWXYZABCDE", az26))
    console.log(Vigenere.decrypt("SVTMYMBCTHROAFYSUYO", "BECVHVKLCQAXJOHBDHX", az26))

    console.log(Vigenere.encrypt("WADSWORTHCIPHERDEVICE", "A0000QQQG666WMMCCC2SS", az26 + "0123456789"))
    console.log(Vigenere.encrypt("WADSWORTHCIPHERDEVICE", "MCCCC222SIII8YYOOOE44", az26 + "0123456789"))
    console.log(Vigenere.decrypt("W03IM479N8EL3Q3FGXAUW", "8CFUYGJLZKQXF2FRS9M68", az26 + "0123456789"))

    console.log(Isomorphs.shared(["W03IM479N8EL3Q3FGXAUW", "8CFUYGJLZKQXF2FRS9M68"].map(v => v.isomorphs(21))))
}

// TODO https://discord.com/channels/453998283174576133/817530812454010910/1126072344272707724

// TODO https://discord.com/channels/453998283174576133/817530812454010910/949479453766062152

// TODO https://discord.com/channels/453998283174576133/817530812454010910/957738101227261966

// TODO https://discord.com/channels/453998283174576133/817530812454010910/958871483508203541

// TODO https://discord.com/channels/453998283174576133/817530812454010910/960230201449676900

// TODO https://discord.com/channels/453998283174576133/817530812454010910/961923285539495957

// TODO pg 35

// pg 41 
const pt1 = "THIRDREGIMENTCOMMANDPOSTMOVING"

const ct1 = "QXFWZQUAIUYLEGUGSSFIXLDWIWRZMS"
console.log(ct1)
console.log(Cipherkey.encrypt(pt1, "X", az26, Vigenere))
console.log("1 - THIRD", Cipherkey.decrypt(ct1, "X", az26, Vigenere))

const ct2 = "YVZKXEIEDLOKXKSPXOXAZGHQALVHTN"
console.log(ct2)
console.log(Cipherkey.encrypt(pt1, "FORTUNE", az26, Vigenere, Cipherkey.word))
console.log("2 - THIRD", Cipherkey.decrypt(ct2, "FORTUNE", az26, Vigenere, Cipherkey.word))

const ct3 = "YVZKXEIOWIMZSUIUGGTWLZRKWKFNAG"
console.log(ct3)
console.log(Cipherkey.encrypt(pt1, "FORTUNE", az26, Vigenere))
console.log("3 - THIRD", Cipherkey.decrypt(ct3, "FORTUNE", az26, Vigenere))

const ct4 = "QAPZUUVKOUQRGVQAYMNQSDGLFAJDVT"
console.log(ct4)
console.log(Autokey.encrypt(pt1, "X", az26, Vigenere))

const ct5 = "YVZKXEIZPUVQKGUUYEAWRCEFMBYXBY"
console.log(ct5)
console.log(Autokey.encrypt(pt1, "FORTUNE", az26, Vigenere))


const ct6az = ABC.key("ZHYDRAULIC", az26)
const ct6 = "TVACFMHJTFVJBPEHNTGMCHTOIZVATC"
console.log(ct6)
console.log(Cipherkey.encrypt(pt1, "Z", ct6az, Vigenere))

const ct7 = "QXFWZQUAIUYLEGUGSSFI"
// console.log("HIRD", Cipherkey.decrypt(ct7, ct7.shift(1), az26, Beaufort))
console.log("HIRD", Cipherkey.decrypt(ct7.shift(1), ct7, az26, Vigenere))

const pt2 = "BEGINARTILLERYFIREAT"
const ct8 = "BPAUVNLFJALYMLQNAELR"
console.log("ILLERY", Cipherkey.decrypt(ct8.shift(8), ct8, az26, Vigenere))
console.log("ALUMINUM", Cipherkey.decrypt(ct8, "ALUMINUM", az26, Vigenere, Cipherkey.word))
console.log("ALUMINUM", Cipherkey.encrypt(pt2, "ALUMINUM", az26, Vigenere, Cipherkey.word))

// console.log(Beaufort.encrypt(pt2, "ALUMINUM", az26))
// console.log(Beaufort.decrypt("ZHOEVNDTSAJIRPPEJHUT", "ALUMINUM", az26))
// console.log(Autokey.encrypt(pt2, "ALUMINUM", az26, Beaufort))
// console.log(Autokey.decrypt("ZHOEVNDTTTVEWCMLRHLL", "ALUMINUM", az26, Beaufort))

const pt3 = "RECEIVINGCONTINUOUSF"
const ct9 = "DITGCMGTZBPCVDQKYSKP"
console.log(Cipherkey.decrypt(ct9.shift(1), ct9, az26, Vigenere))
console.log("RECEIV", Cipherkey.encrypt(pt3, "MERCURY", az26, Vigenere))
console.log(Cipherkey.decrypt(ct9, "MERCURY", az26, Vigenere))

console.log(Vigenere.encrypt("RECEIVINGCONTINUOUSF", "MERCURY", az26))
console.log(Vigenere.decrypt("DITGCMGZKTQHKGZYFWMW", "MERCURY", az26))

console.log(Beaufort.encrypt("RECEIVINGCONTINUOUSF", "MERCURY", az26))
console.log(Beaufort.decrypt("VAPYMWQZYPOHYQZKDICM", "MERCURY", az26))

console.log(Cipherkey.encrypt(pt3, "MERCURY", az26, Beaufort, Cipherkey.word))
console.log(Cipherkey.decrypt("VAPYMWQIUNKZDIVAZQHY", "MERCURY", az26, Beaufort, Cipherkey.word))
console.log(Cipherkey.encrypt(pt3, "MERCURY", az26, Beaufort, Cipherkey.word))
console.log(Cipherkey.decrypt("VAPYMWQDXVHUBTGMYEMH", "MERCURY", az26, Beaufort))

const az = shuffle(az83)
const t1 = Cipherkey.encrypt("1. TEST KNOWLEDGE POWER", "i!i", az, Vigenere, Cipherkey.word)
console.log(t1)
console.log(Cipherkey.decrypt(t1.shift(3), t1, az))

const underwood = ABC.key("UNDERWOODTYPEWRITERCOMPANY", az26).shift(13)
const a = "IJXWXEECDACNQETUKNMVDIWPPQZSXDHIFELNNJJIDIVEYGTCZMEHHLMRVCURGDIEQSGTARJJQQYCARPHMGLDYFYTCDGYFKRFKSETTDIQKKMLTURQGGNKMKIXJXWKAOKNTBTZJOQYSCDIDGETXG"

const hydraulic = ABC.key("HYDRAULIC", az26)

// console.log(Cipherkey.encrypt("RIGHTFAIRLYQUIE", "K", "MABFGHJKLQSVXZUNDERWOTYPIC", Vigenere))
const ct10 = Cipherkey.encrypt("IFTHEHYPOTHESIS", "X", hydraulic, Vigenere)
console.log(ct10)
console.log("IFTHE", Cipherkey.decrypt(ct10.shift(1), ct10, hydraulic, Vigenere))
const t2 = "UNFFTTVKUHHEAFU"
// console.log(Cipherkey.decrypt(t2, "X", ABC.key("HYDRAULIC", az26), Vigenere))
console.log(Cipherkey.decrypt(t2.shift(1), t2, hydraulic, Vigenere))

const pt4 = "RELIABLEINFORMATION"
console.log(Cipherkey.encrypt(pt4, "XZ", az26, Vigenere))

const quick = "THEQUICKBROWNFOXJUMPEDOVERTHEZOO"
const qbc = ABC.key("THEQUICKFOX", az26)
const q1 = [
    Cipherkey.encrypt(quick, "K", az26, Vigenere),
    Cipherkey.encrypt(quick, "KZ", az26, Vigenere),
    Cipherkey.encrypt(quick, "K", qbc, Vigenere),
    Cipherkey.encrypt(quick, "KZ", qbc, Vigenere),
]
console.log(q1)

const q2 = [
    Cipherkey.decrypt(q1[0], "K", az26, Vigenere),
    Cipherkey.decrypt(q1[1], "KZ", az26, Vigenere),
    Cipherkey.decrypt(q1[2], "K", qbc, Vigenere),
    Cipherkey.decrypt(q1[3], "KZ", qbc, Vigenere),
]
console.log(q2)

// https://www.staff.uni-mainz.de/pommeren/Cryptology/Classic/7_Aperiodic/Autokey.html
console.log(Cipherkey.encrypt("PLAINTEXT", "XY", az26, Vigenere))
console.log(Cipherkey.decrypt("MJJREXBYR", "XY", az26, Vigenere))
console.log(Cipherkey.encrypt("PLAINTEXT", "XY", az26, Vigenere, Cipherkey.word))
console.log(Cipherkey.decrypt("MJMRZKDHW", "XY", az26, Vigenere, Cipherkey.word))
// http://www.davidmeyercreations.com/mysteries-of-history/beale-codes-solving-an-unsolvable-code/
const t10 = "IHTYEVNQEWKOGIVMZVPMWRIXDOSDIXFKJRMHZBVRTLKMSFEUKEVSIVKGZNUXKMWEPOQEDVRARBXNUJJXBTMQBZT"
console.log(Cipherkey.decrypt(t10, "THEUNITEDSTATES", az26, Vigenere, Cipherkey.word))

// https://courses.engr.illinois.edu/cs461/fa2010/slides/Symetric%20Cryptography.pdf
console.log(Cipherkey.decrypt("QXBCQOVVNGNRTTM", "X", az26))

// https://www.reddit.com/r/codes/comments/11o9off/this_cipher_is_really_stumping_me/
console.log(Cipherkey.decrypt("WALWWERKIWQFWATMK", "A", az26))

const u2 = "MABFGHJKLQSVXZUNDERWOTYPIC"
const mab = new ABC(az26, "MABFGHJKLQSVXZUNDERWOTYPIC")
console.log(mab.cipher(a))
// const t11 = "IJXWXEECDACNQET"
// console.log(Cipherkey.decrypt(t11.shift(3), t11, az26, Vigenere))
console.log(underwood)
const u3 = ABC.key("UNDERWOODTYPEWRITERCOMPANY", az26)
console.log(Vigenere.decrypt("Y", "H", az26))
console.log(Vigenere.decrypt("G", "Y", az26))
console.log(Vigenere.decrypt("M", "G", az26))

// pg 54
console.log(Cipherkey.decrypt(mab.decipher(a), mab.decipher("K"), az26, Vigenere))
console.log(mab.cipher(Cipherkey.encrypt("RIGHTFAIRLYQUIETTILLFIVE", mab.decipher("K"), az26, Vigenere)))
console.log(Cipherkey.decrypt(mab.decipher("RWKAOLTCJMZDKVU"), mab.decipher("R"), az26, Vigenere))

// TODO pg 56

// pg 58
const ct11 = "USYPWTRXDIMLEXRKVDBDDQGSU"
const az11 = new ABC(az26, hydraulic)
console.log(Cipherkey.decrypt(az11.decipher(ct11), az11.decipher("WICKER"), az26, Vigenere))
console.log(az11.cipher(Cipherkey.encrypt("INTENSIVEFIREOFLIGHTARTIL", az11.decipher("WICKER"), az26, Vigenere)))

console.log(Cipherkey.decrypt(az11.decipher("BIIBFGRXLGHOUZO"), az11.decipher("PROMISE"), az26, Vigenere))
console.log(Cipherkey.decrypt(az11.decipher("HALOZJRRVMMHCVB"), az11.decipher("CHARGED"), az26, Vigenere))

// pg 60
const ct12 = "TSBJSMMNRULPUIHJBTXFINNRMDWIQV"
console.log(Cipherkey.decrypt(ct12, "PENCE", hydraulic, Vigenere, Cipherkey.word))

// REQUESTINFORMATIONOFSITUATIONI

// pg 366
const eyes0 = "Rb%P^-k=8]Jfb^@.q(/n\"=-Q!prH_q53 HSa:.5fOLPJ3P-O3Qh?%8#K[cAQI\\5:>%94g+jX$j3g$SIKphV_oq/0L?>,AY<-`KP"
const g1 = eyes0.split("").map(v => v.charCodeAt(0).toString(5).padStart(3, "0"))
// const g2 = eyes0.split("").map(v => v.charCodeAt(0).toString(2).padStart(7, "0"))
const g2 = eyes0.split("").map(v => (v.charCodeAt(0) - 32).toString().padStart(2, "0"))
console.log(new Frequencies(g1.join(""), "01234"))
console.log(new Frequencies(g2.join(""), "0123456789"))

// MILCRYP1 pg 41
const f3 = new Frequencies("OWQWZAEDTDQHHOBAWFTZWODEQTUWRQBDQROXHQDAGTBDHPZRDK")
console.log(f3.ic())
// 1.6342857142857143

const f4 = new Frequencies("AQUICKBROWNFOXJUMPSOVERTHELAZYDOG")
console.log(f4)
console.log(f4.ic())

// pg 397

const i1 = [
    "90723781689484915771168441745466220883128710345436",
    "51844807259535125207710624389767340609210598685348",
    "28147157335829345515052068833734666198956781809150",
    "66954133216179175797514143197986210856277109558825",
    "20894169660908759634801498288081862774700132013674",
    "11794578372484906800005201961390147160452015035129",
    "06260723649199117821621943651606329856109045805395",
    "55013358009235404365928869622520858059260026438137",
    "8165345991268649768606029443277466265027"
]

console.log(new Frequencies(i1.join(""), "0123456789").ic(20))
console.log(new Frequencies(i1.join(""), "0123456789").ic(30))

// pg 345
const f2 = new Frequencies("PYLPPNAFTHTKSSFZPMYXXXJNUYAQDXRUHBSQIEBSFMVWCFYDTFDFIJBYAQDXXOJOCNXWNNPRUJSJIHHWBNPVBVCGKYHSTZVYCFYDVNEUMOOOZGBUZPIYMHHJWDZDUCCEFNQIKGFNGCSJUQUKTVXRDQYYMTMZRUCWFIHYLEGGGAXKLFZZQTOQGTRYTZYBRXDZIGMSOMLY")
console.log("0.97", f2.ic())
console.log("1.55", f2.ic(26)) // Divisor is calculated based on ct columns? 

// TODO pg 346 isomorphs

// pg 348
const f6 = new Frequencies("DLHGIHXNYTVPIZMBIFCSHTKXMTHKCSLCCXZXDSOXGFIOJLFYAXZMUXTHJZTBUMZELCLKSITOQKTRXMIAXNCLLGTZDLMBJACTAGIFRIXWVGBASFFFYOIAZZCCXFXHCWFEHNIKEXZWYYAFSXOPAVUMZZZSICUJSTPIOMEURNTHHHWEDGEQUSNZFNBBOTARAZLNKMFCBURR")
console.log(f6)
console.log(f6.ic()) // 1.075

// pg 349
const i2 = [
    "41", "70", "19", "05", "97", "76", "72", "58", "07", "21", "11", "07", "54", "46", "74", "07", "40", "57", "35", "56",
    "20", "13", "07", "81", "18", "44", "07", "02", "56", "91", "38", "22", "17", "43", "57", "41", "98", "34", "79", "29",
    "76", "44", "97", "96", "03", "81", "06", "86", "71", "68", "88", "13", "16", "47", "46", "13", "51", "78", "29", "13",
    "34", "05", "42", "65", "56", "55", "14", "72", "46", "25", "81", "21", "44", "11", "61", "85", "16", "16", "42", "65",
    "52", "44", "41", "08", "59", "26", "14", "00", "90", "07", "30", "16", "28", "09", "43", "51", "30", "89", "12", "23",
    "82", "06", "32", "39", "09", "49", "25", "98", "15", "22", "88", "33", "26", "65", "64", "42", "46", "76", "53", "53",
    "28", "28", "33", "17", "32", "41", "36", "96", "20", "01", "41", "87", "72", "60", "16", "31", "65", "28", "39", "74",
    "49", "68", "51", "99", "72", "24", "55", "63", "16", "86", "33", "37", "42", "82", "27", "58", "28", "70", "98", "10",
    "14", "48", "31", "90", "72", "78", "61", "19", "67", "22", "92", "26", "44", "37", "29"
]
const m1 = i2.map(v => String.fromCharCode(parseInt(v)))
console.log(m1)
const az100 = Array.from({ length: 100 }, (_, i) => String.fromCharCode(i))
const f5 = new Frequencies(m1, az100)
console.log(f5)
console.log(f5.ic())

function dinome_delta(a, b) {
    // console.log(a, b)
    const i_a = a.split("").map(v => parseInt(v))
    const i_b = b.split("").map(v => parseInt(v))
    const d = []
    d.push((i_b[0] < i_a[0] ? i_b[0] + 10 : i_b[0]) - i_a[0])
    d.push((i_b[1] < i_a[1] ? i_b[1] + 10 : i_b[1]) - i_a[1])
    return d.join("")
}

function dinome_deltas(a, n) {
    return a.slice(n).map((v,i) => dinome_delta(a[i], v))
}

function dd_duplicates(a, n, min, max) {
    // console.log("d1", d1)
    const d = dinome_deltas(a, n)
    const s_d = d.map(v => String.fromCharCode(parseInt(v))).join("")
    // console.log(s_d1)
    return [...s_d.duplicates(min,max).keys()]//[0].split("").map(v => v.charCodeAt(0))
}

const d1 = dd_duplicates(i2, 12, 9, 9)
console.log(d1)
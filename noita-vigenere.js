const d = decode(10, [0,1,2,3,4])

console.log(d.reduce((v, c) => v + c[0], ""))

console.log(az83)
console.log(az83.length)

const k1 = "6DFSKLJHAShad0!V"
const ct1 = Vigenere.encrypt("1. SEEK THE TRUTH!", k1, az83).join("")
const ct2 = Vigenere.encrypt("2. SEEK YOER RUTE?", k1, az83).join("")

console.log(ct1)
console.log(ct2)
console.log(Vigenere.decrypt(ct2, k1, az83).join(""))

const kryptos = abc("KRYPTOS", az26) //"KRYPTOSABCDEFGHIJLMNQUVWXZ"
// const kryptos = az83
console.log(think("EMUFPHZLRFAXYUSDJKZLDKRNSHG", kryptos, tshift(kryptos, "PALIMPSEST")))
console.log(Vigenere.decrypt("EMUFPHZLRFAXYUSDJKZLDKRNSHG", "PALIMPSEST", kryptos).join(""))

const az93 = Array.from({ length:94 }, (_, i) => String.fromCharCode(i + 33)).join("")
console.log(az93)
const ct3 = Vigenere.encrypt("ABC1$#", "SA4$#*", az93).join("")
console.log(ct3)

const k2 = "9KH&12356dflkjNCSA*nwod"
console.log(Autokey.encrypt("1. TESTY", "A", az83))
console.log(Autokey.decrypt("R?.T&%4:", "A", az83))
console.log("a1", Autokey.encrypt("1T.. DESKS! FOR GREAT", k2, az83))
console.log("a2", Autokey.encrypt("2T.. BESTS? THE GREAT", k2, az83))
console.log(Autokey.decrypt("KYV&SWfii0fM@<Nj2fKO", k2, az83))

console.log(Cipherkey.decrypt(d[0], d[5], az83))
console.log(Cipherkey.decrypt(d[1], d[5], az83))
console.log(Cipherkey.decrypt(d[2], d[5], az83))

// https://macs4200.org/chapters/07/4/autokey-cipher.html
console.log(Autokey.encrypt("ACCEPTTHEGREATERCHALLANGE", "UNICORN", az26))
console.log(Autokey.decrypt("UPKGDKGHGIVTTMLVIYELEIEIL", "UNICORN", az26))

function inverse(a, m) {
    for(let x = 1; x < m; x++)
        if (((a % m) * (x % m)) % m == 1)
            return x;

    return 0
}

const m26 = [1, 3, 5, 7, 9, 11, 15, 17, 19, 21, 23]
for (var i = 0; i < m26.length; i++) {
    // console.log(m26[i], inverse(m26[i], 26))
}

const inverses = new Map()
for (var i = 0; i < 83; i++) {
    inverses.set(inverse(i, 83), i)
}
console.log(d[0])
console.log(d[0].split("").map(v => az83[inverses.get(v.charCodeAt(0) - 32)]).join(""))

// const k = "RpDl_B;mA"

console.log(Autokey.encrypt("1. TEST MEN HELPING TEST", "RT%", az83))
console.log(Autokey.encrypt("2. TEST DON HELPING TEST", "DT%", az83))
console.log(Cipherkey.encrypt("1. TEST MEN HELPING TEST", "RT%", az83))
console.log(Cipherkey.encrypt("2. TEST DON HELPING TEST", "DT%", az83))
console.log(Autokey.decrypt("c?.T&%4TMr NHmq)&$\"", "Q", az83))
console.log(Autokey.decrypt("Vp%fSS5E$0ND$ L%n'$I/lS5", "Ca$", az83))
console.log(Autokey.decrypt("Vb%fSS5E$0ND$ L%n'$I/lS5", "DT%", az83))

const pt = "1. TEST MEN HELPING TEST"
const ct4 = Autokey.encrypt(pt.repeat(100), "RT%1234567890abcQWERTYUIOPASDFGHJ", az83)
console.log(split(ct4, pt.length))

console.log(Autokey.encrypt("THEQUICKBROWNFOX", "ABC", az26))

console.log(d[0])
const r1 = d[0].replace(/(.{1})./g,"$1")
console.log(r1)
const r2 = d[0].substring(1).replace(/(.{1})./g,"$1")
console.log(r2)
console.log(Cipherkey.decrypt(r1, "AB", az83))
console.log(Autokey.decrypt(r1, r2, az83))
console.log(Vigenere.decrypt(r1, r2, az83))
console.log(xor(r1,r2))

const v1 = Vigenere.decrypt(d[0], "i", az83).join("")
console.log(v1)
const v2 = Vigenere.decrypt(v1, "!", az83).join("")
const v3 = Vigenere.decrypt(v2, "i", az83).join("")
console.log(v3)

console.log(Vigenere.decrypt(Vigenere.decrypt(d[0], d[1], az83).join(""), d[3], az83))

// https://macs4200.org/chapters/08/3/kasiski-test.html

console.log(az83)
console.log(d[0])
console.log(d[1])
console.log(Vigenere.encrypt("1. SHALL A QUICK YOU NOTE THE YOUR GOD! QUICK.", "AT%p6<\.?+-:l@1", az83).join(""))
console.log(Vigenere.encrypt("2. SHALL I QUICK NOT KNOW THE ANSWERS? AQUICKY", "^T%p6<\.?+-:l@1", az83).join(""))

console.log("3", Autokey.decrypt("Rb%P^]Zk+N:J\"Zd,%Veq.mZa_l!YfT^Lkn.fZQ;lqfj$P+", "BB%p6", az83))

console.log(Autokey.decrypt(d[0], az83, az83))

console.log(Vigenere.encrypt("CALLMEATNINE", "ATTACK", az26).join(""))
console.log(Autokey.encrypt("CALLMEATNINE", "ATTACK", az26))

const az36 = az26 + "0123456789"
console.log(Vigenere.encrypt("CALLMEAT9", "ATTACK", az36).join(""))

const abc1 =  ABC.shift(az83, "i")
console.log(abc1)
const alt0 = d[0].split("").reduce((a,c,i) => { i % 2 === 0 ? a[0].push(c) : a[1].push(c); return a }, [[],[]])
console.log(alt0)
console.log(Vigenere.decrypt(alt0[0].join(""), "!", abc1).join(""))
console.log(Vigenere.decrypt(alt0[1].join(""), "!", abc1).join(""))

// console.log(Vigenere.decrypt(d[0], "i!", cshift(az83, "i").join("")).join(""))
console.log(Vigenere.decrypt(d[0], d[0].split("").reverse().join(""), az83).join(""))

// for (var i = 0; i < az83.length; i++) {
//     console.log(Vigenere.decrypt(d[0], "!", cshift(az83, az83.charAt(i)).join("")).join(""))
// }

const i73 = az83.substring(1,74)
const iii = i73.split("").reverse().join("") + i73.substring(1)
console.log(iii)
console.log(Vigenere.decrypt(d[0], iii, az83).join(""))

console.log("------ Glyphs")
d.forEach(v => console.log(v.length))
console.log(d.join("\r\n"))
// const az09 = " !\"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqr"
console.log(new Set(d.join("")))

console.log("------ Encrypted")
const az09 = "n!)b$-&RpDl_B;mA0123456789:^%=>?@/,C\"# G]TQKLMNkrJ'SPFXWaYZ[\\H(+`VEcdefghijU*.<oOqI"
console.log(new Set(az09))
// const az09 = " !\"#$%&RpDl_B;mA0123456789:-<=>?@/,C)bFGHIJKLMNOPQ'STUVWXYZ[\\]^+`aEcdefghijk*.no(qr"
console.log(az83)
console.log(az09)
const k = "i!i!eiM@G1NarYnUm83rZ" + az09
const ct = []
ct.push(Vigenere.encrypt("1) STARTBYTHINKINGSOMETHINGWHETHERYOUREALLYWANTTOGODOWNFORTHISPATHANDGODKNOWSTHESEARCHFORKNOWLEDGE[]ISPOWERFORTECHNOLOGY", k, az09).join(""))
ct.push(Vigenere.encrypt("2) STARTBYTHINKINGSOMETHING IFYOU`RE VISITINGTHISPATHAND, YOU`RELIKELYHEREYOU`RESEARCHFORKNOWLEDGE A RANDOM NEEDLEINHAYSTACK", k, az09).join(""))
ct.push(Vigenere.encrypt("3) STARTBYTHINKINGSOMETHING SOMETIMES A RANDOMWORD JUST ISN'T ENOUGH, AND!@#$%^&*()09123456789THATISWHERE THE RANDOM SENTENCEGENERATOR COMES INTO PLAY.", k, az09).join(""))
ct.push(Vigenere.encrypt("4) THEIR ARE MANYPRODUCING RANDOM SENTENCESCANBEHELPFUL IN A NUMBEROFDIFFERENT WAYS. ZOOXYLOPHONE", k, az09).join(""))
ct.push(Vigenere.encrypt("5) THEN ONE FOR WRITERS,ARANDOM SENTENCE CAN HELP THEM GET THEIR CREATIVEJUICESFLOWING!EXTRA,NEXT", k, az09).join(""))
ct.push(Vigenere.encrypt("6) THOSE WHO ARE MANY THEREAREANUMBEROFDIFFERENTWAYS A WRITER: CANUSE AN UNUSUALSENTENCEFORINSPIRATION.", k, az09).join(""))
ct.push(Vigenere.encrypt("7) THEN YOU TEST A FORTHOSEWRITERSMUCH MORECANDIFFICULTCHALLENGEISTOUSE ITTOENDASTORY QUIXOTIC ZEEBRA ZINCOXIDECRYPTOGRAPHY", k, az09).join(""))
ct.push(Vigenere.encrypt("8) THEN GO PRAYING FORTHOSEWRITERSWHOHAVEWRITERS \"<*>\" BLOCK,THISCANBE AN EXCELLENT WAY TOTAKE AMASTERTOCRUMBLING THOSE WALLS.", k, az09).join(""))
ct.push(Vigenere.encrypt("9) THEN BY PRAYING FORTHOSERANDOMSENTENCES CANALSOSPURACREATIVITYINTHEOTHERTYPES;OFPROJECTSBEINGDONE!JAZZY$MASTERA WALLS", k, az09).join(""))
// ct.forEach(v => console.log(v))
console.log(ct.map(v => v.split("").map(w => w.charCodeAt(0) - 32)))
console.log(ct.map(v => v.split("").map(w => (w.charCodeAt(0) - 32).toString(5).padStart(3,"0"))))
console.log(ct.join("\r\n"))
console.log(new Set(ct.join("")))
console.log(new Frequencies(ct.join(""), az09).sorted)

console.log("------ Decrypted")
ct.forEach(v => console.log(Vigenere.decrypt(v, k, az09).join("")))

d.forEach(v => console.log(Vigenere.decrypt(v, k, az09).join("")))

const az3 = " !\"#$%&'()*+,-./0123456789:;<=>?@lBCDEFGHIJKLMNOPQdSTUVWXYZ[\\]^_`abcRpfghijmAknoeqr"
console.log(az3)
const k3 = "SILMA!"
console.log(Vigenere.encrypt("1) THIS", k3, az3).join(""))
console.log(Vigenere.encrypt("2) THEY", k3, az3).join(""))
console.log(Vigenere.encrypt("8) SEEK", k3, az3).join(""))
console.log(Vigenere.encrypt("9) KNOW", k3, az3).join(""))

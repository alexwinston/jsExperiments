const d = decode(10, [0,1,2,3,4])

console.log(Beaufort.encrypt("DEFENDTHEEASTWALLOFTHECASTLE", "FORTIFICATION", az26))
console.log(Beaufort.encrypt("CKMPVCPVWPIWUJOGIUAPVWRIWUUK", "FORTIFICATION", az26))

console.log(Beaufort.encrypt("ATHISIZAABTESTZ", "ABCXYZ", az26))
console.log(Beaufort.decrypt("AIVPGRBBCWFVIID", "ABCXYZ", az26))

console.log(az83)

console.log(Beaufort.encrypt("The qick bron fo jmp oer he la dog.", "Te HELP", az83))
console.log(Beaufort.decrypt(" p.HGV`\\e1IIQPai QKOPX !HPZP[$ WIXB", "Te HELP", az83))

console.log(Beaufort.encrypt("1. TEST! HEabc !@#%^ P.", "1234567890ABC!@#", az83))
console.log(Beaufort.decrypt(" $3ScVV79[oTT1@\"d/.I5Y)", "1234567890ABC!@#", az83))

const abc1 =  cshift(az83, "!").join("")
console.log(Beaufort.decrypt(d[0], "i", abc1))
console.log(Beaufort.decrypt(d[0], "i!", az83))

console.log(Beaufort.encrypt("1. THOU SHALL NOT SOLVE!", "J*#!1248KVNSabc", az83))
console.log(Beaufort.encrypt("2. THOU SHOULD NOT HAVE!", "A*#!1248KVNSabc", az83))
console.log(Beaufort.decrypt("/o#@\\VR8k.rq5>cfNB!\\dQfJ", "A*#!1248KVNSabc", az83))

const az54 = " abcdefghijklmnopqrstuvwxyz1234567890~!@#$%^&*(){}:\"<>"
console.log(Beaufort.encrypt("the quick brown fox jumps over lazy dogs", "cryptii", az54))
console.log(Beaufort.decrypt("~jtpc%  gynb{#^rsa:i>0ei\"t{$< yds~!cnjia", "cryptii", az54))

console.log(Trithemius.encrypt("the quick brown fox jumps over lazy dogs", az54))
console.log(Trithemius.decrypt("tigcuzojsil3102ov6%s4%9@^y$}7)4^7ee9#<*d", az54))

console.log(Trithemius.decrypt(d[0], az83))
console.log(Trithemius.decrypt(d[0], az83.split("").reverse().join("")))

console.log(Vigenere.decrypt(d[0], ABC.shift(az83, "i"), ABC.shift(az83, "!")))
console.log(Vigenere.decrypt(d[0], az83, ABC.shift(az83, "i")))

console.log(Beaufort.encrypt("THE QUICK BROWN FOX JUMPS OVER THE LAZY DOGS THE", "i", az83))

const kp = 7
const w1 = Multiplicative.encrypt("IAMSTUDYING", "MOBILE", kp, az26)
console.log(w1)
console.log(Multiplicative.decrypt(w1, "MOBILE", kp, az26))

console.log(az83)
// console.log(ABC.shift(az83, "i"))
// console.log(ABC.shift(az83, "!"))
console.log("N.", Multiplicative.encrypt("1) SHALL TEST", az83, 30, ABC.shift(az83, "R")))
console.log("N.", Multiplicative.encrypt("2) SHOULD NOT", az83, 30, ABC.shift(az83, "R")))
console.log("N.", Multiplicative.encrypt("3) SEE TEST T", az83, 40, ABC.shift(az83, "d")))
console.log("N.", Multiplicative.encrypt("4) TESTS DONT", az83, 40, ABC.shift(az83, "d")))
console.log("N.", Multiplicative.encrypt("5) TEASE DOES", az83, 50, ABC.shift(az83, "F")))
console.log("N.", Multiplicative.encrypt("6) TENSE DONE", az83, 50, ABC.shift(az83, "F")))
console.log(["S", "r", ">", "]", ")", "H"].map(v => v.charCodeAt(0)))

const primes = [3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97]
// primes.forEach(v => console.log(Multiplicative.decrypt(d[1], az83, v, ABC.shift(az83, "!"))))

const t1 = Multiplicative.encrypt("THE QUICK BROWN FOX JUMPS OVER THE LAZY DOGS THE", az83.split("").reverse().join(""), 3, ABC.shift(az83, "I"))
console.log(t1)
// primes.forEach(v => console.log(v, Multiplicative.decrypt(t1, az83, v, ABC.shift(az83, "I"))))

const i73 = az83.substring(1,74)
const iii = i73.split("").reverse().join("") + i73.substring(1)
console.log(iii)

console.log(Multiplicative.decrypt(d[0], iii, 31, az83))
// console.log(Multiplicative.decrypt(d[0], ABC.shift(az83, "i"), 31, ABC.shift(az83, "!")))

console.log(Multiplicative.encrypt("QUICKBROWNFOX!", az83, 8953851, az83))
console.log(Multiplicative.decrypt("C#'Gq0H#M_Zm-*", az83, 8953851, az83))

// https://macs4200.org/chapters/07/1/tabula-recta.html
console.log(Vigenere.encrypt("EQUALITY", "DK", az26))

const a1 = Multiplicative.encrypt(az83, "i!i", 6, ABC.shift(az83, "!"))
console.log(a1)
console.log(Multiplicative.decrypt(a1, "i!i", 6, ABC.shift(az83, "!")))

console.log(Vigenere.encrypt("B", "B", az26))
console.log(Beaufort.encrypt("B", "B", az26))

d.forEach(v => console.log(v))

// for (var i = 0; i < az83.length; i++) {
//     for (var j = 0; j < az83.length; j++) {
//         const abc1 = ABC.shift(az83, String.fromCharCode(i + 32))
//         const abc2 = ABC.shift(az83, String.fromCharCode(j + 32))

//         // const k = 53
//         for (var k = 0; k < az83.length; k++) {
//             const ct1 = Multiplicative.encrypt("3) SHALL TEST", "i!i", k, abc1)
//             const ct2 = Multiplicative.encrypt("4) SAID TRUST", "i!i", k, abc1)
//             // if (ct1[0] === 'R' && ct2[0] === 'p') {
//             if (ct1[0] === 'D' && ct2[0] === 'l') {
//             // if (ct1[0] === ';' && ct2[0] === 'm') {
//                 console.log(k, String.fromCharCode(i + 32), String.fromCharCode(j + 32), ct1, ct2); 
//                 console.log(Multiplicative.decrypt(ct1, abc1, k, abc2))
//                 console.log(Multiplicative.decrypt(ct2, abc1, k, abc2))
//             }
//         }
//     }
// }

// for (var i = 0; i < az83.length; i++) {
//     for (var j = 0; j < az83.length; j++) {
//         const abc1 = ABC.shift(az83, String.fromCharCode(i + 32))
//         const abc2 = ABC.shift(az83, String.fromCharCode(j + 32))

//         for (var l = 0; l < az83.length; l++) {
//         for (var k = 1; k <= az83.length; k++) {
//             const ct1 = Multiplicative.encrypt("1" + String.fromCharCode(l + 32) + String.fromCharCode(j + 32) + String.fromCharCode(i + 32), abc1, k, abc2)
//             if (ct1[0] == "R" && ct1[1] == "b" && ct1[2] == "%" && ct1[3] == "P") {
//                 console.log(k, ct1); 
//                 console.log(Multiplicative.decrypt(ct1, abc1, k, abc2))
//             }
//         }
//         }
//     }
// }

console.log(az125)
// const az3 =" !\"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqr"
// const az3 = shuffle(" !\"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqr")
// const az3 = shuffle(" *+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\]^`abcdefghijklmnopqrstuvwxyz{|")
const az3 = ".KU95JN '!F@2qn80>O$o34=dla(LVABiR&:Z%fM?Gc)\\CWS+D\"p6[em;<h7Y*#r^E_T,IPX1gHj-`]bkQ/"
// const az3 = "QPejfYm\\rXUhJ&4S\"nV,`97.5aDG;g](b'Kd-_F=OC0A3)1L/?:Mq8N6^iTp+$EI[HZ! >R#<%ck@Bl2oW*"
//     .swap("+", "R")
//     .swap("@", "p")
//     .swap("N", "D")
//     .swap("L", "l")
//     .swap("B", "_")
//     .swap("f", "B")
//     .swap("#", ";")
//     .swap("W", "m")
//     .swap(" ", "A")
//     .swap("9", "b")
//     .swap("M", "%")
//     .swap(":", "P")
//     .swap("&", "Q")

// Cipherkey ;f\R(lpa!%@Wb2PU3KF0M1o$.kCcVNhBA`H/eQ?,J'id Og)L-9q"4j8+_:XZDm^]TnYGSI[r=#E*7<&65>

console.log("------ Encrypt")
// const az3 = az83
console.log("abc", az3)
const k3 = "i!i"
// pt.forEach(v => console.log(Cipherkey.encrypt(v, k3, az3)))
// console.log(pt.map(v => Multiplicative.encrypt(v, k3, 37, az3)).join(""))

for (var i = 0; i < 10000; i++) {
    const az = shuffle(" !\"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqr")
    // const t = pt.map(v => Vigenere.encrypt(v, k3, az).join(""))
    const t = pt.map(v => Cipherkey.encrypt(v, k3, az, Vigenere))
    // console.log(t.map(v => v.split("").map(w => w.charCodeAt(0) - 32)))
    // console.log(t)
    // console.log(t.join("\r\n"))

    // NOTE Repeats are explained in MILCRYP3 pg 48
    const f = new Frequencies(t.join(""), az).sorted
    if (f[0][1] < 30 && t[0][70] == t[1][70] && t[0][71] == t[1][71] && t[6][40] == t[8][40]) {
        console.log("az", az)
        t.forEach(v => console.log(v))
        console.log(t.map(v => v.split("").map(w => w.charCodeAt(0) - 32)))
        console.log(f)
        console.log(Cipherkey.decrypt(t[0], k3, az, Vigenere))
        console.log(Cipherkey.decrypt(t[8], k3, az, Vigenere))
    }
}

const f1 = new Frequencies(Cipherkey.decrypt(d[0], k3, az3), az3)
console.log(f1)
console.log(f1.ic())

const f_pt2 = new Frequencies(pt[2])
console.log(f_pt2)
console.log(f_pt2.ic())

for (var i = 0; i < 10; i++) {
    const az = shuffle(" !\"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqr")
    const ct = d[4]
    // const ct = Cipherkey.decrypt(d[0], k3, az)
    // const ct = "36M9P>\"&Eca>9!FbU) l^WA3 qe>'g<+Ar?hYFj4\"]mO+ef4?Q0E.W6#kAXNm;#k) HES@-=;O!$%PX`2h9,&j<(4'mcY=Jf+_0.E(OdcPJW="

    for (var j = 1; j < 15; j++) {
        const pt = Cipherkey.decrypt(ct.shift(j), ct, az, Vigenere)
        // console.log(pt)
        // const f = new Frequencies(pt.substring(0,50), az)
        const l = 30
        const f = Frequencies.occurance(pt.substring(0, l), 65, 90)
        // if (f.ic() > .055) {
        if (f > .70) {
            console.log("az", az)
            console.log("pt", pt)
            console.log("r", f)
            console.log("f", new Frequencies(pt.substring(0, l), az).ic())
            console.log("f", chi_squared(pt.substring(0, l)))
        }
    }
}
console.log("DONE")

// const ct = "36M9P>\"&Eca>9!FbU) l^WA3 qe>'g<+Ar?hYFj4\"]mO+ef4?Q0E.W6#kAXNm;#k) HES@-=;O!$%PX`2h9,&j<(4'mcY=Jf+_0.E(OdcPJW="
// console.log(Cipherkey.decrypt(ct, k3, az3, Vigenere))
// console.log(Cipherkey.decrypt(ct.shift(1), ct, az3, Vigenere))

console.log(Cipherkey.encrypt("QUICKBROWNFOXJUMPEDOVERTHEDOG", "i!i", az3, Vigenere, Cipherkey.word))
const ct = "A@Oj2DlA2B?A$Cihind\")N.(kE-8="
const f = new Frequencies(Cipherkey.decrypt(ct.shift(3), ct, az3, Vigenere), az83)
console.log(ct, f.ic())

console.log(Frequencies.occurance("ABCDEF4321", 65, 90))

// console.log(chi_squared("PJJ2<ZC\\VP+GSRVC(NHTSrDKHRL=HZEF"))

console.log("FGBCBAAAEFGEBAAA".duplicates(1,4))
console.log("AABEEEEAB".duplicates(1,4))
console.log(d[0].duplicates(2,13))
console.log((d[0] + d[1] + d[8]).duplicates(2,24))

const dd = d[3]
// const dd = "TIRf<qpj_oo#rhk(=/cedD5[=\\Wj'm%IFbC@\"GAfcq.)k=;f/?dKY5>T75hh;4%5)(=Wf4b\\BU9bG;OfZZNZgT5=#@4?%0r^L\\epinF*Y#/1X FOH'+B[CVr]X&ZO1oZdh5N0`"
console.log(dd)
const d0 = dd.split("").map(v => (v.charCodeAt(0) - 32).toString().padStart(2,"0"))
for (var i = 1; i < 80; i++) {
    console.log(i, dd_duplicates(d0, i, 3, 10))
}
// console.log(dd_duplicates(d0, 13, 3, 10)[0].ascii(32))
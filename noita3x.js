// https://en.wikipedia.org/wiki/Trifid_cipher
const key = 5
const offset = { 3: 65, 4: 32, 5: 0}
const length = key**key
// const ascii = Array.from({ length }, (_, i) => i + 0x16a0)
const tabula = Array.from({ length }, (_, i) => i + offset[key])
const z = Array(key).fill().map(e => Array(key).fill().map(e => Array(key).fill("").map(e => e)));

let c = 0
for (var i = 0; i < key; i++) {
    for (var j = 0; j < key; j++) {
        for (let k = 0; k < key; k++) {
            const char = String.fromCharCode(tabula[c++])
            // console.log(i,j,k,char)
            z[i][j][k] = char
        }
    }
}

console.log([z])

function scan(c, reverse = false) {
    for (var i = 0; i < key; i++) {
        for (var j = 0; j < key; j++) {
            for (let k = 0; k < key; k++) {
                if (z[i][j][k] === c) {
                    const s = i.toString() + j.toString() + k.toString()
                    // console.log(c, i, j, k, s)
                    return reverse ? s.split("").reverse().join("") : s
                }
            }
        }
    }
    console.log("undefined", c)
    return undefined
}

function encipher(s, size) {
    let encipher = []
    Array.from(s).forEach(c => { encipher.push(scan(c)) })
    console.log("encipher", encipher)

    const groupings = Math.floor(s.length / size)
    console.log("groupings", groupings)
    const remainder = s.length % (groupings * size)
    // console.log(groupings, remainder)
    let groups = Array.from(Array(3), _ => Array())
    for (var i = 0; i < encipher.length; i++) {
        groups[0].push(encipher[i].charAt(0))
        groups[1].push(encipher[i].charAt(1))
        groups[2].push(encipher[i].charAt(2))
    }
    console.log("groups", groups)

    let grouped = Array.from(Array(groupings), _ => Array.from(Array(3), _ => ""))
    for (var i = 0; i < groupings; i++) {
        groups[i]
        for (var j = 0; j < size; j++) {
            grouped[i][0] += groups[0][(i * size) + j]
            grouped[i][1] += groups[1][(i * size) + j]
            grouped[i][2] += groups[2][(i * size) + j]
        }
    }
    console.log("grouped", grouped)

    let remainders = Array.from(Array(3), _ => "")
    for (var j = groupings * size; j < s.length; j++) {
        remainders[0] += groups[0][j]
        remainders[1] += groups[1][j]
        remainders[2] += groups[2][j]
    }
    // console.log(remainders)

    return [size, grouped, remainder, remainders]
}

function encrypt(cipher) {
    console.log("cipher", cipher)

    const size = cipher[0]
    const grouped = cipher[1]
    const remain = cipher[2]
    const remainders = cipher[3]

    let ct = ""
    for (var i = 0; i < grouped.length; i++) {
        const group = grouped[i].join("")
        // console.log(group)
        for (var j = 0; j < size; j++) {
            const a = parseInt(group.charAt((j * 3) + 0))
            const b = parseInt(group.charAt((j * 3) + 1))
            const c = parseInt(group.charAt((j * 3) + 2))
            // console.log(a, b, c)
            ct += z[a][b][c]
        }
    }

    const remainder = remainders.join("")
    console.log("remainder", remainder)
    for (var i = 0; i < remain; i++) {
        const a = parseInt(remainder.charAt((i * 3) + 0))
        const b = parseInt(remainder.charAt((i * 3) + 1))
        const c = parseInt(remainder.charAt((i * 3) + 2))
        // console.log(a, b, c)
        ct += z[a][b][c]
    }

    return ct
}

function decrypt(s, size, reverse = false) {
    const groupings = Math.floor(s.length / size)
    const remainder = s.length % (groupings * size)
    console.log(groupings, remainder)

    let groups = ""
    for (var i = 0; i < s.length; i++) {
        groups += scan(s.charAt(i), false)
    }
    const grouped = groups.match(new RegExp('.{1,' + (3 * size) + '}', 'g'));
    console.log("grouped", grouped)

    let decrypted = ""
    for (var i = 0; i < groupings; i++) {
        const group = grouped[i].match(new RegExp('.{1,' + (size) + '}', 'g'))
        for (var j = 0; j < size; j++) {
            // NOTE Reversed index
            const a = group[reverse ? 2 : 0].charAt(j)
            const b = group[1].charAt(j)
            const c = group[reverse ? 0 : 2].charAt(j)
            decrypted += z[a][b][c]
        }
    }

    if (remainder) {
        const group = grouped[i].match(new RegExp('.{1,' + (remainder) + '}', 'g'))
        for (var i = 0; i < remainder; i++) {
            // NOTE Reversed index
            const a = group[reverse ? 2 : 0].charAt(i)
            const b = group[1].charAt(i)
            const c = group[reverse ? 0 : 2].charAt(i)
            decrypted += z[a][b][c]
        }
    }

    console.log("decrypted", decrypted)
    return decrypted
}

const size = 3
const t1 = encrypt(encipher("A. Good help BBC LKSJD Same Need to add some emergency length!", size))
console.log(t1)
console.log(decrypt(t1, size))
const t2 = encrypt(encipher("B. Good test POIERY NM Same! Hope this helps solving the puzzle", size))
console.log(t2)
console.log(decrypt(t2, size))
const t3 = encrypt(encipher("1. TASE SHALL THEN PASS PASS the eyes are super annoying at this point", size))
console.log(t3)
console.log(decrypt(t3, size))
const t4 = encrypt(encipher("2. TEST SHALL MUST PASS please my eyes hurt why do I have to keep up", size))
console.log(t4)
console.log(decrypt(t4, size))
const t5 = encrypt(encipher("3. TEST WOULD THEN MUST PASS this needs to end otherwise eye might go", size))
console.log(t5)
console.log(decrypt(t5, size))
const text1 = "A Flash sales and promotions are the top reasons people B opt in to text messages from businesses. If you`re running a1  promotion and want your 3customers to take action immediately, there`s hardly a more proven 4method of getting the word out than text. You`re almost guaranteed7 a sharp boos8t in revenue and quick returns on 0your investment. Start 9by offering your customers a reward when they text in a keyword. This messageB can appear as a pop-up Con your Dwebsite with a widget that directly inputs the keyword on tFheir text messaginGg app."
const t6 = encrypt(encipher(text1, size))
console.log(t6)
console.log(t6.split("").map(v => v.charCodeAt(0).toString(5)).join(" "))
console.log(decrypt(t6, size))

// const s = new Set()
// t6.split("").forEach(v => s.add(v.charCodeAt(0) - 32))
// console.log([...s].sort((a, b) =>  a - b))
const d1 = "50 82 1 116 62 65 75 21 24 57 38 102 58 62 36 70 81 40 3 18 10 21 17 121 5 28 86 76 67 33 9 95 0 76 55 77 30 70 9 102 39 96 44 86 23 116 17 111 23 121 64 31 1 120 15 91 71 87 41 121 33 52 9 6 26 25 25 100 59 55 74 32 20 122 23 107 20 7 33 91 76 112 70 67 95 33 3 80 48 31 26 60 41 37 40 65 72 91 44"

// const m3 = m1.split(" ").filter(i => i).map(v => parseInt(v).toString(5).padStart(3,'0')).join('')
const e1 = d1.split(" ").filter(i => i).map(v => parseInt(v))
const e2 = e1.map(v => String.fromCharCode(v)).join("")
console.log("e2", e2)
// console.log(decrypt(e2, size))

function mod(i, j) {
    return ((i % j) + j) % j
}

function cipher(pt, kt, az) {
    const k = kt.split("").map(v => az.indexOf(v))
    const pi = pt.split("").map(v => az.indexOf(v))
    const ki = pi.map((v, i) => k[i % (k.length)])
    const sums = pi.map((v, i) => pi[i] + ki[i])
    // const mods = sums.map((v, i) => (v + sums.length + i) % (az.length - 1))
    const mods = sums.map(v => v % (az.length))
    const ct = mods.map(v => az[v])

    return ct
}

function decipher(ct, kt, az) {
    const k = kt.split("").map(v => az.indexOf(v))
    const ci = ct.split("").map(v => az.indexOf(v))
    const ki = ci.map((v, i) => k[i % (k.length)])
    const subs = ci.map((v, i) => ci[i] - ki[i])
    // const mods = subs.map((v, i) => mod(v - subs.length - i, az.length - 1))
    const mods = subs.map(v => mod(v, az.length))
    const pt = mods.map(v => az[v])

    return pt
}

// https://www.ijeat.org/wp-content/uploads/papers/v9i5/E9941069520.pdf
const az = Array.from({ length:83 }, (_, i) => String.fromCharCode(i + 42)).join("")
// const az = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789~`!@#$%^&*()-_+={}[]|\\:;\"' <>,.?/"
console.log(az)
const kt = "KOTBARI"

const ct = cipher("COMILLAUNIVERSITY", kt, az).join("")
console.log(ct)
const pt = decipher(ct, kt, az)
console.log(pt)

console.log(cipher("ABCDEFGHIJKLMNOP", "i!i", az).join(""))
console.log(cipher("A.ThouShaltNotNot?", "023579!#%&(ACDGIKPRXZacegklopwyz", az).join(""))
console.log(cipher("B.ThenMightNot", "023579!#%&(ACDGIKPRXZacegklopwyz", az).join(""))
console.log(cipher("C.ThusYouWillANot", "023579!#%&(ACDGIKPRXZacegklopwyz", az).join(""))
console.log(cipher("d..Thus Go To Not Pay!", "023579!#%&(ACDGIKPRXZacegklopwyz", az).join(""))
const ct1 = cipher("E_.Shus_Go_To_Not_Pay|", "023579!#%&(ACDGIKPRXZacegklopwyz", az)
console.log(ct1.join(""))
console.log(decipher(ct1.join(""), "023579!#%&(ACDGIKPRXZacegklopwyz", az).join(""))

console.log("Rb", decipher("Rb%P^-k=8]Jfb^@.q(/n\"=-Q!prH_q53 HSa:.5fOLPJ3P-O3Qh?%8#K[cAQI\\5:>%94g+jX$j3g$SIKphV_oq/0L?>,AY<-`KP", "i!i", az).join(""))

const m1 = "Rb%P^-k=8]Jfb^@.q(/n\"=-Q!prH_q53 HSa:.5fOLPJ3P-O3Qh?%8#K[cAQI\\5:>%94g+jX$j3g$SIKphV_oq/0L?>,AY<-`KP"
// const m1 = "J:wL>o1_d?R6:>\\n+tm.z_oK{,*T=+gi|TI;bng6MPLRiLoMiK4]wdyQA9[KS@gb^wch5q2Dx2i5xISQ,4F=-+mlP]^p[C`o<QL"
// console.log(cipher(m1, "RpDl_B;mA", az).join(""))
console.log("iosis", decipher(m1, "iosis", az).join(""))

// const text2 = cipher(text1.replaceAll(" ",""), "*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|", az).join("")
const text2 = cipher(text1.replaceAll(" ",""), "DIAMOND", az).join("")
console.log(text2)
// console.log(decipher(text2, "*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|", az).join(""))
console.log(decipher(text2, "DIAMOND", az).join(""))
console.log(cipher("1 am just \"plain\" text ~ 12345", "P@55w0rd!~", "N$~O?c/3(0SFsWKJ6 hP\"b^85@H-doT+1}v&p'.MDRU7jgeizY[`#4V9Qnf]u\\>)AI*|xyB%Lw!G:aXE2C;Zq_{l<tm,rk=").join(""))


// https://www.online-python.com/online_python_compiler
function cipher2(pt, kt, az) {
    const k = kt.split("").map(v => az.indexOf(v))
    console.log(k)
    const pi = pt.split("").map(v => az.indexOf(v))
    console.log(pi)
    const sums = pi.map((v, i) => (pi[i] + k[i % k.length]) % az.length)
    console.log(sums)
    const ct = sums.map(v => az[v])

    return ct.join("")
}

function decipher2(ct, kt, az) {
    const k = kt.split("").map(v => az.indexOf(v))
    console.log(k)
    const ci = ct.split("").map(v => az.indexOf(v))
    console.log(ci)
    // const sums = ci.map((v, i) => az.indexOf(v))
    const pt = ci.map((v, i) => az[(((v - k[i % k.length])) + az.length) % az.length])
    // plaintext += self.alphabet[int(ciphertextnum[i]) - int(keynum[i % len(keynum)])]
    // console.log(pt)

    return pt//.join("")
}

const az2 = "N$~O?c/3(0SFsWKJ6 hP\"b^85@H-doT+1}v&p'.MDRU7jgeizY[`#4V9Qnf]u\\>)AI*|xyB%Lw!G:aXE2C;Zq_{l<tm,rk="
const k2 = "P@55w0rd!~"
const ct2 = cipher2("1 am just \"plain\" text ~ 12345", k2, az2)
console.log(ct2)
console.log(decipher2(ct2, k2, az2))

const az3 = "*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|"
// const az85 = "()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|"
const k3 = "DIAMOND"

console.log(cipher2("ATESTTHISSUCKSGOD", k3, az3))
console.log(cipher2("BTESTSUCKSTHISGOD", k3, az3))
console.log(cipher2("DTHISSUCKSTESTGOD", k3, az3))
console.log(decipher2(m1, k3, az3))

console.log("az", az.length, az)

const az125 = Array.from({ length:125 }, (_, i) => String.fromCharCode(i)).join("")
const az83 = Array.from({ length:83 }, (_, i) => String.fromCharCode(i + 32)).join("")
console.log("az83", az83.length, az83)
const az85 = Array.from({ length:85 }, (_, i) => String.fromCharCode(i + 40)).join("")
const az42 = Array.from({ length:83 }, (_, i) => String.fromCharCode(i + 42)).join('')
console.log("az42", az42.length, az42)

// const g2 = "J:wL>o1_d?R6:>\\n+tm.z_oK{,*T=+gi|TI;bng6MPLRiLoMiK4]wdyQA9[KS@gb^wch5q2Dx2i5xISQ,4F=-+mlP]^p[C`o<QL"
const g2 = "Rb%P^-k=8]Jfb^@.q(/n\"=-Q!prH_q53 HSa:.5fOLPJ3P-O3Qh?%8#K[cAQI\\5:>%94g+jX$j3g$SIKphV_oq/0L?>,AY<-`KP"
// const g2 = "pb%P^-k=8]Jfb^@.q(/n\"=-Q!=+>Tq53 9:V4.5fOLPJ3P-O3QL:[m`Ko<h`!>i7c&A9`qdN1D-15d-)NcYB^r/*i^\"+ahEL*Kd^)B2"
// pb%P^-k=8]Jfb^@.q(/n"=-Q!=+>Tq53 9:V4.5fOLPJ3P-O3QL:[m`Ko<h`!>i7c&A9`qdN1D-15d-)NcYB^r/*i^"+ahEL*Kd^)B2
// const g2 = "Db%P^-k=8]Jfb^@.q(/n\"=-Q!elT)Pbp6`YHQn#0X3OHp&-`=Q`_&Q?-0*M8:m*\\q]BVf5/$bmJE>6 +IhY47YaI72hJ%#:n(%VMm9`]0LVS4_9+:MU\\FB"

// console.log(decipher(g2, "_b%QkV\"\\=HnO\\kcg\\\"a'O.Mj[Ip-\\-q6CRHG\"[P?l\"pk!Xc+5(HaMkWG\\J-#6Y\"&Z)f!ZX_d9o'43`\"bi>g0,>aE4-6_2N`[Iqr6nDO1$&1%Do_!`e/K$ZX?.`Z2Lne! N4gi9C(8", az83))
// console.log(decipher2(g2, "i!i", az83))
console.log("g2", decipher2(g2, "KNOWLEDGE THROUGH PAIN WISDOM THROUGH SACRIFICE", az83))

// J:wL>o1_d?R6:>\n+tm.z_oK{,*T=+gi|TI;bng6MPLRiLoMiK4]wdyQA9[KS@gb^wch5q2Dx2i5xISQ,4F=-+mlP]^p[C`o<QL
// ,:wL>o1_d?R6:>\n+tm.z_oK{_q^H+gi|cbFhng6MPLRiLoMiKPbA/<Q-`4<{^3e9v[c<+8NkXokg8osN9CZ>*mr3>zq;4WPrQ8>sZj
// X:wL>o1_d?R6:>\n+tm.z_oK{70HsL:,f<CTK.ylDiMT,vo<_K<=vK]olrOdb/r@+?ZF6gmx:/RW^f|qS4CheC;Sej4Rwyb.twFO/c<?lPFIh=cqbOG@VZ

// console.log(decrypt(g2, 1))

const i1 = [0,1,2,3,4]
const i2 = [-2,-1,0,1,2]
// console.log(i2[3]*5**2 + i2[1]*5**1 + i2[2]*5**0)

const az26 = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
// const az26 = "HYDRAULICBEFGJKMNOPQSTVWXZ"
// console.log(decipher("XFWZQUAIUYLEGUGSSFI", "QXFWZQUAIUYLEGUGSSFI", az26))
console.log(decipher("PMQQPPZFGTRIRZNDPQLJYMLLHXQWGP", "XPMQQPPZFGTRIRZNDPQLJYMLLHXQWGP", az26))
// console.log(decipher("KSBHBHLALIDMVGKYZKYAHXUAAWGM", "HOWDOESTHEDUCKKNOWTHATSAIDVI", az26))
// console.log(decipher(
//     "YOFWKNXDYJQSOKGODIPACDNXBCEOLDVTAOZNAOVSVSWQTWNVTXUFFYDRHPHXPIVAEFZUTLWEEWTTEZPRCUCLBDPQSFEMHFCNMRW",
//     "YCK",
// az26))
 
const eyes = [
    "Rb%P^-k=8]Jfb^@.q(/n\"=-Q!prH_q53 HSa:.5fOLPJ3P-O3Qh?%8#K[cAQI\\5:>%94g+jX$j3g$SIKphV_oq/0L?>,AY<-`KP",
    "pb%P^-k=8]Jfb^@.q(/n\"=-Q!=+>Tq53 9:V4.5fOLPJ3P-O3QL:[m`Ko<h`!>i7c&A9`qdN1D-15d-)NcYB^r/*i^\"+ahEL*Kd^)B2",
    "Db%P^-k=8]Jfb^@.q(/n\"=-Q!elT)Pbp6`YHQn#0X3OHp&-`=Q`_&Q?-0*M8:m*\\q]BVf5/$bmJE>6 +IhY47YaI72hJ%#:n(%VMm9`]0LVS4_9+:MU\\FB",
    "lb%QkVeN@!J\\:PRp@8W]O,5,QVB9D/XW4)(^-r)L=\\UrJp%Kg#pmOnB9^2*Q^`Tq+b^-O1Tf:7@?`7C@R&!9(EOK:ladp1'M_.U_\\0",
    "_b%QkV\"\\=HnO\\kcg\\\"a'O.Mj[Ip-\\-q6CRHG\"[P?l\"pk!Xc+5(HaMkWG\\J-#6Y\"&Z)f!ZX_d9o'43`\"bi>g0,>aE4-6_2N`[Iqr6nDO1$&1%Do_!`e/K$ZX?.`Z2Lne! N4gi9C(8",
    "Bb%QkV7j+-<:3PcYE\\B<j*1@+23K3qJ$^)NQ@SlZ$KO1co5@L0>E:<IdYBS*ef(&NK2GOK/-A>C^E E%FWE-H9)5+`%oJd+g+P#c]H6.CR]G+\"bQSU1iDkjV8>Vf",
    ";b%QkV\"\\=H\"W)/[2d#D%OmLF!2<l$B\\_Zp1VokPVW3^`.OSfk%+OMZdeo9FMiOdRBMn:oY$X6\\2kK\\[c_JQAHaom'#:^?n:YeH$7:-cJFh+Ga\\9&pbdm[n3",
    "mb%QkV\"\\=H\"W)/[2d#D%O\\5p!hW0rCY3!b2;G1jqG.n 9aKb`Fq78RY>gk:dVYXRgi.5(@:_%E3KbOUBb7i?VFmc+_o&65Sej5%1cE=5\\.rL>$4JC!?VN4H>",
    "Ab%QkV\"\\=H\"W)/[2d#D%OA5[L2<l[B\\_o;,V%QPVWT^he*Y6ZPcU'B@>?3:(BN'>gWBkV)&\\%79MJp9,6l4S^5H)I*Li(Afi&?5h%H]SJb`j]9_J8I"
]

// const eyes = [
//     "aSM(,_9o`5hH]c,B&sk2;$P.q Jps]08H bR+=g4JQKOQ2P,Q3@g4)K#eYPB]H:5%>49+g[gj$j0V!IKfr`Utl/0BI*@Z@-<L_#)",
//     "aqM(,_9o`5hH]c,B&sk2;$P.:$?*rS089 S=*8g4JQKOQ2P,Q3=IoYL_=n^j? 7i'b<>t]PbE02,b7(.bO@[r^*/_h,!fcJGH-_cB)##",
//     "bDM(,_9o`5hH]c,B&sk2;$P.b$SmQ(qa^8JWoP2!0[JM%q_.Q=`_N)+A+/4Ql;\\*]qVB4g 3lcEJ4@*!gJ6WZ6Hb27Jh (l<(%QR;k`]I3VS\\7*:N9_RAG",
//     "blM)RoQb\"?^HN<pR6B\\X,O+6VQ=>0CXW%8_'s,L)`9sTrHH(!ikrmP=>1_M.^`rSb+,_1OhR5<@?8_>E%S: F'JPl:ad/rO%-`_U/]",
//     "d]M)Ro^ L9Pmk\\hb ^%c,QfQLX*s*_5rRCCLY$AN!mkpX!,b&7aHkMC[H^#-Y6'!([ gZXd_k=6%`3c!Af0g@*Cc*7^7P0[`qI6rFl1O)!'/lG#]e`H2[#?X`.2ZoK$bM!f5<f%F$$",
//     "e?M)Roi8+-<:Q2Yc^C=A.f@10-L2t0\"L'`NQT?XnL#1Ome?63IC@:<bK@[+Rja(&IPF3JP*2A>\\E\"C'CZC,F9H8&].k)cKg+N-d\"I\\,8RCD`!,NeSUh2lCVjB4jR",
//     "c:M)Ro^ L9Y 3%3Z#d&CmOGK0#n:B$\\_sWT3okUQ/[^`Q,gR%kN,WPde=kPCPhUaQ><l[m[!^4n/_HeYK^BPaHom\"(];lAX;La8#+<JciED.\\a%:aqncoZ$#",
//     "clM)Ro^ L9Y 3%3Z#d&C^Mq4g\"/XEp1[b!<13Etg.G#ka9dIG_5sV4@Wlfb<[TSWgi8+A']<C'L2NcAV5dAgGUcm]-)l65bV8g/'Ec8:*`Jt BH6 DSB5M>H",
//     "d?M)Ro^ L9Y 3%3Z#d&C@PX83Kn:B[\\_=mT.M)UQRYh^.a6YPZTd@)@>0B&<Q?@%Xfo>)V]%4(M9rH*;m5R56]%L+HjKA(fi?&g6H%S]cIj`:\\K^L5"
// ]

console.log(eyes[0].match(/.{1,26}/g))

// console.log(decipher("Rb%P^-k=8]Jfb^@.q(/n\"=-Q!p", "rH_q53 HSa:.5fOLPJ3P-O3Qh?".split("").reverse().join(""), az83))
console.log(decipher(eyes[0], eyes[4].split("").reverse().join(""), az83))

// const ct3 = cipher("THISISAGOODMAYHAVEEMERGENCYFEELSGLASSWHYNOTTAKEABREAKINSTEADTHENGOTOTHESTOREINSTEAD", shift(eyes2.split(""), -50).join(""), az83).join("")
// const ct3 = shift(cipher("THISIzAGOODMAYHAVEEMERGENCYFEELSGLASSWHYNOTTAKEABREAKINSTEADTHENGOTOTHESTOREINSTEAD", eyes[0], az42), -10).join("")
const ct3 = shift(cipher("THISIzAGOODMAYHAVEEMERGENCYFEELSGLASSWHYNOTTAKEABREAKINSTEADTHENGOTOTHESTOREINSTEAD", "ALEXWINSTON", az83), 0).join("")
const ct4 = shift(cipher("THISISANOTHEREXAMPLEOFANEMERGENCYMESSAGEINSTEAD", "ALEXWINSTON", az83), 0).join("")
console.log(ct3)
// console.log(decipher(ct3, eyes[0], az42))
console.log(decipher(ct3, "ALEXWINSTON", az83))

const decoded = decode(10, [4,3,2,1,0], az125)
// const eyes1 = ct3
const eyes1 = decoded[0].split("").map(v => az42[v.charCodeAt(0) - 42]).join("")
// const eyes1 = shift(eyes[0].split(""), -50).join("")
const eyes2 = decoded[1].split("").map(v => az42[v.charCodeAt(0) - 42]).join("")
// const eyes2 = az83.split("").reverse().join("")
// const eyes2 = eyes[1].split("").reverse().join("")

// console.log(eyes1)
// console.log(eyes2)
for (var i = 0; i < eyes2.length; i++) {
    const eyes3 = shift(eyes2.split(""), -i).join("")
    // console.log(eyes3)
    // console.log(decipher(eyes1, eyes3, az42).join(""))
    // console.log(decipher(eyes1, eyes3, az42).join(""))
    // console.log(xor(eyes1, eyes3))
}

// const rb3 = cipher("THISISATESTMAYBEINEMERGENCYBREAKGLASS", eyes1, az83).join("")
// console.log(rb3)
// console.log(decipher(rb3, eyes1, az83))


const crib = "diamond"
// const xor1 = xor(ct3, ct4)
for (var i = 0; i < eyes[0].length; i++) {
    const s = shift(eyes[0], -i).join("")
    // console.log(decipher(s, crib, az83).join(""))
    // console.log(xor(s, crib))
    // console.log(xor(crib.charAt(i % crib.length), eyes[0][i]))
}
// console.log(decipher(eyes[0], "ANA", az83))

console.log(xor("W", String.fromCharCode(parseInt("11110011", 2))).charCodeAt(0).toString(2))
console.log(eyes[0].split("").map(v => v.charCodeAt(0).toString(2)))
console.log(eyes[0].match(/.{1,26}/g)[0].split("").map(v => v.charCodeAt(0).toString(16)).join(""))

// Diamond eye overlap between adjacent eye glyphs
const az25 = "ABCDEFGHIKLMNOPQRSTUVWXYZ"
const o1 = eyes[0].split("").map(v => (v.charCodeAt(0) - 32).toString(5).padStart(3,"0"))
const u1 = []
for (var i = 0; i < o1.length - 1; i++) {
    const g1 = o1[i+1].split("")[2] + o1[i].split("")[2]
    u1.push(az25[parseInt(g1, 5)])
    // o2.push(parseInt(g1, 5))
    // u1.push(g1)
}
const o2 = decoded[0].split("").map(v => (v.charCodeAt(0) - 32).toString(5).padStart(3,"0"))
const u2 = []
for (var i = 0; i < o2.length - 1; i++) {
    const g1 = o2[i+1].split("")[2] + o2[i].split("")[2]
    u2.push(az25[parseInt(g1, 5)])
    // o2.push(parseInt(g1, 5))
    // u2.push(g1)
}
// console.log(u2.join(""))

for (var i = 0; i < u1.length; i++) {
    const u3 = shift(u2, -i)
    // console.log(eyes3)
    // console.log(decipher(u1.join(""), u3.join(""), az25).join(""))
    // console.log(decipher(eyes1, eyes3, az83).join(""))
    // console.log(xor(eyes1, eyes3))
}

const c1 = "WII MJCVKWV FZN ZQLHWMH HA ZLH GMFKTJQ DKOQXT XM UNN LAADANPNFT EOWZXJRX UR. ULNJM QO MS OTZGVIWWJT, ZJQS LW MUXHRVJBSLE HW IRFVQOLOH QRNGCOPNGFLTRF AYFYTRYZTNWP ELQOGW. DX BYCP, BPG QMUIPK VJLAQRH OP WESRRLNEJUY (XZHQ GW LUY EQEZUJW KDBEIHN IVEESME TQL AOMJWHUI GOQJMV) DNRP CPGRBJZLLOZ LFKS. UQ ADLEBT XMK WWQBKAU' DVKA, HRBKS CHYWULTNV QPUR WQH VAZUCOTH YSSNRA."
console.log(c1)
const s1 = c1.split(" ")
console.log(s1)
const c2 = c1.split("").filter((v,i) => az26.split("").includes(v)).join("")
console.log(c2)
console.log(decipher(c2, "BRAIN", az26).join(""))
// console.log(xor(c2,"LEFTBRAIN").split("").map(v => az26.charAt(v.charCodeAt(0))))
console.log(xor(c2,"LEFTBRAIN").split("").map(v => v))
// const c3 = c2.split("").map(v => az26.indexOf(v))
// const c3 = c2.split("").map(v => v.charCodeAt(0))
const c3 = c2.split("").map(v => Math.ceil(v.charCodeAt(0) / 4.5))
console.log("c3", c3)

for (var i = 0; i < az26.length; i++) {
    const x1 = Array(c2.length).fill(az26.charAt(i)).join("")
    // console.log(x1.join(""))
    // console.log(xor(c2, x1).split("").map(v => az26.charAt(v.charCodeAt(0))))
}
const k = []
k.push(String.fromCharCode(29))
k.push(String.fromCharCode(62))
k.push(String.fromCharCode(134))

const x1 = xor("XOR",k.join(""))
console.log(xor(x1,k.join("")))

const cshift = (a,n) => { n = a.indexOf(n); return [...a.slice(n, a.length), ...a.slice(0, n)] }

function tshift(abc, s) {
    const t = []
    for (var i = 0; i < s.length; i++) {
        t.push(cshift(abc, s[i]))
    }
    return t
}

function think(ct, abc, table) {
    // console.log(abc)
    // console.log(table)
    const pt = []
    for (var i = 0; i < ct.length; i++) {
        const c = ct[i]
        const j = table[i % table.length].indexOf(c)
        pt.push(abc[j])
    }
    return pt
}

function abc(key, alphabet) {
    const s = new Set(key)
    alphabet.split("").forEach(v => s.add(v))
    return [...s]
}

// const az4 = "THINKABCDEFGJLMOPQRSUVWXYZ"
// const v4 = tshift(az4, "RATIONALLY")
const v4 = tshift(abc("LEFT", az26), "BRAIN")

const az4 = "LEFTABCDGHIJKMNOPQRSUVWXYZ"
console.log(think(c2, az4, v4))

const kryptos = abc("KRYPTOS", az26) //"KRYPTOSABCDEFGHIJLMNQUVWXZ"
console.log(think("EMUFPHZLRFAXYUSDJKZLDKRNSHG", kryptos, tshift(kryptos, "PALIMPSEST")))

const d = []
for (var i = 0; i < c2.length; i+=2) {
    d.push(xor(c2[i],c2[i+1]).charCodeAt(0))
    // d.push(az26[Math.abs(c2[i].charCodeAt(0) - c2[i+1].charCodeAt(0))])
}
console.log("d", d)

console.log(think(c2, abc("LEFT", az26), tshift(abc("LEFT", az26), "BRAIN")))

console.log(c2.split("").map(v => az26[25 - (v.charCodeAt(0) % 26)]).join(""))

console.log(c2.split("").map(v => v.charCodeAt(0)))
const s2 = s1.map(v => v.split("").map(w => w.charCodeAt(0)).reduce((a,n) => a + n, 0))
console.log(s2.map((v,i) => String.fromCharCode(Math.floor(v / s1[i].length))))
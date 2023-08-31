function flip(c) {
    const a = new Map()
    a.set("4", "0") // 42
    a.set("3", "1")
    a.set("1", "3")
    a.set("0", "4")
    if (a.has(c)) {
        return a.get(c)
    }
    return c
}

function eye(i) {
    // if (i === '') { return '0' }
    if (i === '') { return '' }
    // const positions = [1,2,0,3,4] // 87
    // const positions = [4,3,2,1,0] // 83 Shifted 42
    // const positions = [2,3,4,1,0] // 83
    const positions = [0,1,2,3,4]
    // const positions = [2,1,0,3,4] // 89/83
    // NOTE When 83 is flipped it shifts char codes by 42
    // return flip(positions[i].toString())
    return positions[i].toString()
}

function parse(e1, e2) {
    let eyes = []
    for (var i = 0; i < e1.length; i+=3) {
        // 83
        const g1 = eye(e1.charAt(i + 0)) + eye(e2.charAt(i + 0)) + eye(e1.charAt(i + 1))
        const g2 = eye(e2.charAt(i + 1)) + eye(e1.charAt(i + 2)) + eye(e2.charAt(i + 2))

        // const g1 = eye(e1.charAt(i + 0)) + eye(e2.charAt(i + 0)) + eye(e1.charAt(i + 1))
        // const g2 = eye(e2.charAt(i + 0)) + eye(e1.charAt(i + 1)) + eye(e2.charAt(i + 1))
        // 85
        // const g1 = eye(e1.charAt(i + 0)) + eye(e1.charAt(i + 1)) + eye(e1.charAt(i + 2))
        // const g2 = eye(e2.charAt(i + 0)) + eye(e2.charAt(i + 1)) + eye(e2.charAt(i + 2))
        // 99
        // const g1 = eye(e1.charAt(i + 0)) + eye(e2.charAt(i + 1)) + eye(e1.charAt(i + 2))
        // const g2 = eye(e2.charAt(i + 0)) + eye(e1.charAt(i + 1)) + eye(e2.charAt(i + 2))
        // 85
        // const g1 = e2.charAt(i + 0) + e2.charAt(i + 1) + e2.charAt(i + 2)
        // const g2 = e1.charAt(i + 0) + e1.charAt(i + 1) + e1.charAt(i + 2)

        const i1 = g1.charAt(0), i2 = g1.charAt(1), i3 = g1.charAt(2)
        eyes.push(i1 + i2 + i3)
        if (g2 === '') { break; }

        const j1 = g2.charAt(0), j2 = g2.charAt(1), j3 = g2.charAt(2)
        eyes.push(j1 + j2 + j3)
    }

    return eyes
}

// const factorial = n =>  n - 1n > 0 ? n * factorial(n - 1n) : n;
const factorial = n => !n ? 1n : n * factorial(--n);

function encode(eyes) {
    // console.log(eyes)
    let encodings = []

    let permutations = [[0,1,2], [0,2,1], [1,0,2], [1,2,0], [2,0,1], [2,1,0]]
    for (var p = 0; p < permutations.length; p++) {
        encodings[p] = []
        for (var i = 0; i < eyes.length; i++) {
            const i1 = eyes[i].charAt(permutations[p][0])
            const i2 = eyes[i].charAt(permutations[p][1])
            const i3 = eyes[i].charAt(permutations[p][2])

            encodings[p].push(parseInt(i1 + i2 + i3, 5) + 0) // Decimal
        }
    }
    console.log("encodings", encodings)
    return encodings
}

function rotate(encodings) {
    const rotations = []
    for (var i = 0; i < encodings.length; i++) {
        for (var j = 0; j < encodings.length; j++) {
            rotations.push([i,j])
        }
    }
    // console.log("rotations", rotations)

    const ordered = []
    for (var r = 0; r < rotations.length; r++) {
        ordered[r] = []
        for (var i = 0; i < encodings[0].length; i++) {
            ordered[r].push(encodings[rotations[r][i % rotations[0].length]][i])
        }
    }
    // console.log(ordered)
    // return encoded.join("")
    return ordered
}

function ascii(encodings) {
    const chars = []
    for (var i = 0; i < encodings.length; i++) {
        chars[i] = []
        for (var j = 0; j < encodings[i].length; j++) {
            // chars[i].push(encodings[i][j])
            chars[i].push(String.fromCharCode(encodings[i][j]))
            // chars[i].push(String.fromCharCode(((encodings[i][j]) % 83) + 32))
        }
    }
    // console.log(chars)
    return chars
}

const m = [
    ['20101322330404113023211431303300402400031022104400020010404014414203302203424101400321211413004111010024124100403100113331220330103113111211210322314',
    '0320412200014222421222201100032013411132313131300311321201422313314413414412110403314323411221010100401204124424424021310424224130304110203123204313'],
    
    ['31101322330404113023211431303300402400402020104400010404404014414203302203413121222330324400024323111022123103102204302414221422203024200123212402323201403',
    '0320412200014222421222201100032013411011112131300011020201422313314413414414014034314012221113402103014133412213301323101322112130203222200422310313224113'],
    
    ['121013223304041130232114313033004024004302013230044210143001214140311024104223014113030144102020311114241034232132112001132210042231043242013103010200300221034201043101100200124',
    '132041220001422242122220110003201341132102441113222231403330130231010322441422141120120040103022122402040000103221040020142240312031330231000103310441201422131402022020141322311'],
    
    ['301014304231111130103200114211142042144110120210044012022014100202130013243312143110223024224201021223142200103111223122201000012143101233312010224203221',
    '132041002441200222141013240022220120402401130112010322313431422313213031100003203401230041222213132220230242140211440011010101321231103032030241320322030'],
    
    ['22101430400010030222023122223214414421131322331212013400414130231000123104313014021422202304200121424121122310401003400124024102023204304303122413131230114200103012422122403300321102421313323100104124012304',
    '3320410022224313410032420000102200424310200201400020212123111000031122201100320030210313002122103100003123320032404222323111302110210202223414121132403212304102101033004320314121114223304034000410423010104'],
    
    ['111014304044023101033232120113240032023033031134224144111303003142234042131112103133214200230011143034143033110122120120120123130011024014133021023002220044120224022234203033120244040200',
    '432041002342120301441212222401420211130431413200210141202112431230203111430021101132211120442310131321231020311022200210312220001440122003232142141332131220002121100141102242103402411442'],
    
    ['10101430400010000001021323312014213300310100422321003430014421422402220030002214323430012024223011030130200104003013021222214313030201310211310223000310323212202423010131123221303',
    '2320410022224312124304303001102034211303034110223132024033020302224411420101410123324013413413024413014124122223033224323314110324032001221031124314401202313421210220100323034034'],
    
    ['301014304000100000010213233120140040002211310214001032122241124300100131223313040210240103202210243021012103012033232204233241203302023301041204241012232101224314114042121114140130',
    '232041002222431212430430300110222113142030221230132301430413420300032332421140402211103132412102142440311122021431141311140311421232122410240132440030221440020231000031000102140011'],
    
    ['111014304000100000010213233120143044133101214223302024014144212222230212213233014110114103111010240110204010013100130102041041221134130133013243011042010221131224220222041',
    '332041002222431212430430300110211112430303411022401202041302002242420240341202211211130110441211112403410122040041213020203002240010120442311042111142031102232442101331431']
]

// m.forEach(v => console.log(v[0].concat(v[1]).length))
const e1 = ascii(rotate(encode(parse(m[0][0],m[0][1]))))
const w1 = ascii(rotate(encode(parse(m[1][0],m[1][1]))))
const e2 = ascii(rotate(encode(parse(m[2][0],m[2][1]))))
const w2 = ascii(rotate(encode(parse(m[3][0],m[3][1]))))
const e3 = ascii(rotate(encode(parse(m[4][0],m[4][1]))))
const w3 = ascii(rotate(encode(parse(m[5][0],m[5][1]))))
const e4 = ascii(rotate(encode(parse(m[6][0],m[6][1]))))
const w4 = ascii(rotate(encode(parse(m[7][0],m[7][1]))))
const e5 = ascii(rotate(encode(parse(m[8][0],m[8][1]))))

const t = [e1,w1,e2,w2,e3,w3,e4,w4,e5]
// const t = [e1,w1,e2]

const t2 = []

for (var i = 0; i < t.length; i++) {
    t2[i] = []

    for (var j = 0; j < t[i].length; j++) {
        t2[i].push(t[i][j])
    }
}
// console.log(t2)

const stats = []
for (var i = 0; i < t2.length; i++) {
    for (var j = 0; j < t2[i].length; j++) {
        if (stats[j] === undefined) { stats[j] = [] }
        stats[j].push(t2[i][j])
    }
}

console.log("stats", stats)
for (var i = 0; i < stats.length; i++) {
    const s = new Set()
    for (var j = 0; j < stats[i].length; j++) {
        stats[i][j].forEach(k => { s.add(k) })
    }
    const s2 = [...s]
    const min = Math.min(...s2.map(c => c.charCodeAt(0)))
    const max = Math.max(...s2.map(c => c.charCodeAt(0)))
    const unused = (max - min + 1) - s2.length
    // console.log(i)
    const total = max - min + 1
    console.log(i, s2.length, min, max, total, unused)
    const o = [...s].map(v => v.charCodeAt(0)).sort((a, b) =>  a - b)
    console.log("o", o)
    const o1 = []
    for (var j = 0; j < o.length; j++) {
        const d = o[j+1] - o[j]
        if (d > 1) { o1.push([o[j],d]); }
    }
    console.log(o1)
}

const chunk = (a, n) =>
    Array.from(
        new Array(Math.ceil(a.length / n)),
        (_, i) => a.slice(i * n, i * n + n)
    );

function base(digits, srcb, destb){
    let val = 0n
    srcb = BigInt(srcb)
    destb = BigInt(destb)
    for(let i = 0; i < digits.length; i++){
        val = val * srcb + BigInt(digits[i])
    }
    let res = []
    while(val !== 0n){
        res.unshift(Number(val % destb))
        val = val / destb
    }
    if (res.length == 1) { res.unshift(0)}
    return res
}

const xor = (a, b) => {
    let s = '';
    // use the longer of the two words to calculate the length of the result
    for (let i = 0; i < Math.max(a.length, b.length); i++) {
      // append the result of the char from the code-point that results from
      // XORing the char codes (or 0 if one string is too short)
      s += String.fromCharCode(a.charCodeAt(i) ^ b.charCodeAt(i));
    }
    return s;
};

const size = 125
const abc125 = [...Array(size)].map((v, i) => String.fromCharCode(i + 32)).join('')
// const abc26 = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
const abc26 = "abcdefghijklmnopqrstuvwxyz"
const abc36 = "abcdefghijklmnopqrstuvwxyz0123456789"
console.log("abc125", abc125)

const all = []
const pattern = 0
for (var i = 0; i < stats[pattern].length; i++) {
    const order  = [0,1,2,3,4,5,6,7,8]

    const p = stats[pattern][order[i]]
    console.log(p)
    // console.log(abc125[p[p[0].charCodeAt(0)].charCodeAt(0)])
    
    console.log(p.map(v => v.charCodeAt(0).toString(5).padStart(3,'0'))) // Base5
    console.log(p.map(v => v.charCodeAt(0).toString(2).padStart(7,'0'))) // Base2
    // console.log(p.map(v => v.charCodeAt(0)).join(" ")) // Decimal
    console.log(chunk(p.map(v => base([v.charCodeAt(0)], 83, 26)), 26))
    console.log(p.map(v => v.charCodeAt(0)).join(" ")) // Decimal
    // const ascii = p.map(v => abc[v.charCodeAt(0)]).join("") // Ascii
    const ascii = p.map(v => abc125[v.charCodeAt(0)]).join("").match(/.{1,26}/g) // Ascii
    // const ascii = p.map(v => v).join("") // Ascii 42
    console.log(ascii)
    console.log(ascii.map(v => v.split("").map(w => w.charCodeAt(0) - 32)))

    console.log(p.map(v => abc36[v.charCodeAt(0) % 36]).join(""))
    console.log(p.map(v => abc26[v.charCodeAt(0) % 26]).join(""))

    const m = ["","","","",""]
    p.forEach(v => {
        const u = base([v.charCodeAt(0)], 83, 26)
        m[u[0]] = m[u[0]] + abc26[u[1]]
    })
    console.log(m)

    const s = new Set()
    p.forEach(v => s.add(v.charCodeAt(0)))
    console.log([...s].sort((a, b) =>  a - b))

    console.log(p.map(v => v.charCodeAt(0)).reduce((a,c) => a + c) / p.length)

    all.push(ascii)
}
console.log(all.map(v => v.join("")))

const az = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
const abc83 = (az + az + az + "ABCDE").split("")

// const shift = (a,n) => { a.push(...a.splice(0, (-n % a.length + a.length) % a.length)); return a }
const shift = (a,n) => [...a.slice(n, a.length), ...a.slice(0, n)]

const r1 = shift([...Array(83)].map((v, i) => i), 50)
const r2 = shift([...Array(83)].map((v, i) => i), 66)
const r3 = shift([...Array(83)].map((v, i) => i), 5)

// console.log(all[0][0].charCodeAt(1) - 32)
// console.log(all[0][1].charCodeAt(1) - 32)
// console.log(all[0][2].charCodeAt(1) - 32)
console.log(abc83)
console.log(r1.indexOf(48))
console.log(r2.indexOf(62))
console.log(r3.indexOf(13))
console.log(r3)

console.log(xor("Hello","wORLD"))
console.log(xor(
    // "J:wL>o1_d?R6:>\\n+tm.z_oK{,*T=+gi|TI;bng6MPLRiLoMiK4]wdyQA9[KS@gb^wch5q2Dx2i5xISQ,4F=-+mlP]^p[C`o<QL",
    "Rb%P^-k=8]Jfb^@.q(/n\"=-Q!prH_q53 HSa:.5fOLPJ3P-O3Qh?%8#K[cAQI\\5:>%94g+jX$j3g$SIKphV_oq/0L?>,AY<-`KP",
    "pb%P^-k=8]Jfb^@.q(/n\"=-Q!=+>Tq53 9:V4.5fOLPJ3P-O3QL:[m`Ko<h`!>i7c&A9`qdN1D-15d-)NcYB^r/*i^\"+ahEL*Kd^)B2"
).split("").map(v => v.charCodeAt(0)))
const p1 = stats[pattern][0].join("")
console.log(p1.split("").map(v => base([v.charCodeAt(0)], 83, 50)))
// const p1 = stats[pattern][0].join("").match(/.{1,26}/g)
const p2 = stats[pattern][1].join("")
console.log(p2.split("").map(v => base([v.charCodeAt(0)], 83, 80)))
// const p2 = stats[pattern][1].join("").match(/.{1,26}/g)
// console.log(xor(p1[0],p1[1]))
// console.log(xor(p2,p1).split("").map(v => v.charCodeAt(0)))
// console.log(xor(p2,p1).split("").map(v => az[v.charCodeAt(0) % 26]).join(""))

const x1 = "b%P^-k=8]Jfb^@.q(/n\"=-Q!prH_q53 HSa:.5fOLPJ3P-O3Qh?%8#K[cAQI\\5:>%94g+jX$j3g$SIKphV_oq/0L?>,AY<-`KP"
// console.log(x1.split("").map(v => xor(v, "R").charCodeAt(0).toString(2)))

// console.log(xor("b","R").charCodeAt(0).toString(2))
// console.log("abcd".split("").map(v => xor(v, "E")))

// console.log(base([1,3,7,1], 10, 26))
// console.log(base("36 66 5 48 62 13 75 29 24 61 42 70 66 62 32 14 81 8 15 78 2 29 13 49 1 69".split(" "), 83, 26).map(v => abc26[v]))



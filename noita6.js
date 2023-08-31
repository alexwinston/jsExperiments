function flip(c, invert = false) {
    const a = new Map()
    if (invert) {
        a.set("4", "0") // 42
        a.set("3", "1")
        a.set("1", "3")
        a.set("0", "4")
    }

    if (a.has(c)) {
        return a.get(c)
    }
    return c
}

function eye(i, invert = false) {
    // if (i === '') { return '0' }
    if (i === '') { return '' }
    const positions = [0,1,2,3,4]
    // NOTE When 83 is flipped it shifts char codes by 42
    // return flip(positions[i].toString(), true)
    return positions[i].toString()
}

function parse(e1, e2) {
    // e1 = e1.split("").reverse().join("")
    // e2 = e2.split("").reverse().join("")
    // const e = e1.concat(e2)

    let eyes = []
    for (var i = 0; i < e1.length; i+=3) {
    // for (var i = 0; i < e1.length; i+=1) {
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
    // return encoded.join("")
    return eyes
}

// const factorial = n =>  n - 1n > 0 ? n * factorial(n - 1n) : n;
const factorial = n => !n ? 1n : n * factorial(--n);

function parse2(eyes) {
    const encoded = []
    for (var i = 0; i < eyes[0].length; i+=3) {
        const i1 = []
        const i2 = []
        for (j = 0; j < eyes.length; j+=2) {
            const a1 = eyes[j][i + 0] + eyes[j+1][i + 0] + eyes[j][i + 1]
            if (!Number.isNaN(a1)) { i1.push(a1) }

            const a2 = eyes[j+1][i + 1] + eyes[j][i + 2] + eyes[j+1][i + 2]
            if (!Number.isNaN(a2)) { i2.push(a2) }
        }
        encoded.push(i1)
        encoded.push(i2.reverse())
    }
    // console.log(encoded.flat())
    return encoded.flat()
}

function parse3(eyes) {
    console.log("eyes", eyes)
    const encoded = []
    const alt = eyes.map((v,i) => i % 2 === 0 ? v : v.split("").reverse().join("")).join("")
    // const alt = eyes.map((v,i) => v).join("")
    console.log("alt", alt.length, alt)

    for (var i = 0, j = 0; i < alt.length; i+=3) {
        const a1 = eye(alt[i + 0]) + eye(alt[i + 1]) + eye(alt[i + 2])
        encoded.push(a1)
        // encoded.push(i % 2 === 0 ? a1 : a1.split("").reverse().join(""))
    }
    // console.log(encoded.flat())
    return encoded
}

function encode(eyes) {
    console.log(eyes)
    // eyes = eyes.filter((v, i) => i % 2 === 1 )
    let encodings = []

    let permutations = [[0,1,2], [0,2,1], [1,0,2], [1,2,0], [2,0,1], [2,1,0]]
    for (var p = 0; p < permutations.length; p++) {
        encodings[p] = []
        for (var i = 0; i < eyes.length; i++) {
            const i1 = eyes[i].charAt(permutations[p][0])
            const i2 = eyes[i].charAt(permutations[p][1])
            const i3 = eyes[i].charAt(permutations[p][2])

            // encoded.push(i1 + i2 + i3) // Positions
            // encoded.push(parseInt(i1 + i2 + i3, 5).toString(2))
            encodings[p].push(parseInt(i1 + i2 + i3, 5) + 0) // Decimal
            // encodings[p].push(parseInt(i1) + factorial(parseInt(i2)) + parseInt(i3)) // Decimal
            // encoded.push(parseInt(i1 + i2 + i3, 5).toString(16))
            // encoded.push(String.fromCharCode(parseInt(i1 + i2 + i3, 5) + offset)) // Ascii
        }
    }
    console.log("encodings", encodings)
    return encodings
}

function rotate(encodings) {
    const rotations = []
    for (var i = 0; i < encodings.length; i++) {
        for (var j = 0; j < encodings.length; j++) {
        // for (var k = 0; k < encodings.length; k++) {
        // for (var l = 0; l < encodings.length; l++) {
        // for (var m = 0; m < encodings.length; m++) {
        // for (var n = 0; n < encodings.length; n++) {
            rotations.push([i,j])
        // }
        // }
        // }
        // }
        }
    }
    console.log("rotations", rotations)

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

const m2 = [
    ["201013223304041130232114313033004024000",
    "032041220001422242122220110003201341113",
    "310221044000200104040144142033022034241",
    "231313130031132120142231331441341441211",
    "014003212114130041110100241241004031001",
    "040331432341122101010040120412442442402",
    "13331220330103113111211210322314",
    "1310424224130304110203123204313"],
    ["311013223304041130232114313033004024004",
    "032041220001422242122220110003201341101",
    "020201044000104044040144142033022034131",
    "111213130001102020142231331441341441401",
    "212223303244000243231110221231031022043",
    "403431401222111340210301413341221330132",
    "02414221422203024200123212402323201403",
    "3101322112130203222200422310313224113"],
    ["121013223304041130232114313033004024004",
    "132041220001422242122220110003201341132",
    "302013230044210143001214140311024104223",
    "102441113222231403330130231010322441422",
    "014113030144102020311114241034232132112",
    "141120120040103022122402040000103221040",
    "001132210042231043242013103010200300221",
    "020142240312031330231000103310441201422",
    "034201043101100200124",
    "131402022020141322311"],
    ["301014304231111130103200114211142042144",
    "132041002441200222141013240022220120402",
    "110120210044012022014100202130013243312",
    "401130112010322313431422313213031100003",
    "143110223024224201021223142200103111223",
    "203401230041222213132220230242140211440",
    "122201000012143101233312010224203221",
    "011010101321231103032030241320322030"],
    ["221014304000100302220231222232144144211",
    "332041002222431341003242000010220042431",
    "313223312120134004141302310001231043130",
    "020020140002021212311100003112220110032",
    "140214222023042001214241211223104010034",
    "003021031300212210310000312332003240422",
    "001240241020232043043031224131312301142",
    "232311130211021020222341412113240321230",
    "001030124221224033003211024213133231001",
    "410210103300432031412111422330403400041",
    "04124012304",
    "0423010104"],
    ["111014304044023101033232120113240032023",
    "432041002342120301441212222401420211130",
    "033031134224144111303003142234042131112",
    "431413200210141202112431230203111430021",
    "103133214200230011143034143033110122120",
    "101132211120442310131321231020311022200",
    "120120123130011024014133021023002220044",
    "210312220001440122003232142141332131220",
    "120224022234203033120244040200",
    "002121100141102242103402411442"],
    ["101014304000100000010213233120142133003",
    "232041002222431212430430300110203421130",
    "101004223210034300144214224022200300022",
    "303411022313202403302030222441142010141",
    "143234300120242230110301302001040030130",
    "012332401341341302441301412412222303322",
    "212222143130302013102113102230003103232",
    "432331411032403200122103112431440120231",
    "12202423010131123221303",
    "3421210220100323034034"],
    ["301014304000100000010213233120140040002",
    "232041002222431212430430300110222113142",
    "211310214001032122241124300100131223313",
    "030221230132301430413420300032332421140",
    "040210240103202210243021012103012033232",
    "402211103132412102142440311122021431141",
    "204233241203302023301041204241012232101",
    "311140311421232122410240132440030221440",
    "224314114042121114140130",
    "020231000031000102140011"],
    ["111014304000100000010213233120143044133",
    "332041002222431212430430300110211112430",
    "101214223302024014144212222230212213233",
    "303411022401202041302002242420240341202",
    "014110114103111010240110204010013100130",
    "211211130110441211112403410122040041213",
    "102041041221134130133013243011042010221",
    "020203002240010120442311042111142031102",
    "131224220222041",
    "232442101331431"]
]

// m.forEach(v => console.log(v[0].concat(v[1]).length))
// const e1 = ascii(rotate(encode(parse(m[0][0],m[0][1]))))
// const w1 = ascii(rotate(encode(parse(m[1][0],m[1][1]))))
// const e2 = ascii(rotate(encode(parse(m[2][0],m[2][1]))))
// const w2 = ascii(rotate(encode(parse(m[3][0],m[3][1]))))
// const e3 = ascii(rotate(encode(parse(m[4][0],m[4][1]))))
// const w3 = ascii(rotate(encode(parse(m[5][0],m[5][1]))))
// const e4 = ascii(rotate(encode(parse(m[6][0],m[6][1]))))
// const w4 = ascii(rotate(encode(parse(m[7][0],m[7][1]))))
// const e5 = ascii(rotate(encode(parse(m[8][0],m[8][1]))))

const e1 = ascii(rotate(encode(parse3(m2[0]))))
const w1 = ascii(rotate(encode(parse3(m2[1]))))
const e2 = ascii(rotate(encode(parse3(m2[2]))))
const w2 = ascii(rotate(encode(parse3(m2[3]))))
const e3 = ascii(rotate(encode(parse3(m2[4]))))
const w3 = ascii(rotate(encode(parse3(m2[5]))))
const e4 = ascii(rotate(encode(parse3(m2[6]))))
const w4 = ascii(rotate(encode(parse3(m2[7]))))
const e5 = ascii(rotate(encode(parse3(m2[8]))))

const t = [e1,w1,e2,w2,e3,w3,e4,w4,e5]
const t2 = []

for (var i = 0; i < t.length; i++) {
    t2[i] = []

    for (var j = 0; j < t[i].length; j++) {
        // for (var k = 0; k < t[i][j].length; k++) {
            // s.add(t[i][j][k])
            t2[i].push(t[i][j])
        // }
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
    // if (!unused) {
        console.log(i, s2.length, min, max, total, unused)
        const o = [...s].map(v => v.charCodeAt(0)).sort((a, b) =>  a - b)
        console.log("o", o)
        const o1 = []
        for (var j = 0; j < o.length; j++) {
            const d = o[j+1] - o[j]
            if (d > 1) { o1.push([o[j],d]); }
        }
        console.log(o1)
    // }

    // const alpha = [...Array(max)].map((v, i) => String.fromCharCode(i))
    // // console.log(alpha)
    // const u2 = []
    // alpha.forEach(v => { if (!s.has(v)) { u2.push(v) } })
    // // console.log(u2)
    // console.log(s2.map(v => v.charCodeAt(0)).sort((a, b) =>  a - b).map(v => String.fromCharCode(v + 32 + 12)).join(""))
}

const size = 125
const alpha = [...Array(size)].map((v, i) => String.fromCharCode(i + 0)).join('')
console.log(alpha)
const alphaAZ = [...Array(26)].map((v, i) => String.fromCharCode(i + 65)).join('')
const alpha09 = [...Array(10)].map((v, i) => String.fromCharCode(i + 48)).join('')
console.log(alphaAZ)

const alphaA9 = alphaAZ.concat(alpha09)


const a = [...Array(size)].map((v, i) => String.fromCharCode(i + 33)).join('').match(/.{1,72}/g)
const a0 = [...Array(size)].map((v, i) => String.fromCharCode(i + 33)).join('')
const a1 = a[1].concat(a[0])
const a2 = a[0].concat(a[1])
console.log(a1)
console.log(a2)

function abcde(i) {
    const abcde = "ABCDE".split("")
    const i1 = parseInt(i.charAt(0))
    const i2 = parseInt(i.charAt(1))
    const i3 = parseInt(i.charAt(2))
    return abcde[i1] + abcde[i2] + abcde[i3]
}

const all = []
const pattern = 0
for (var i = 0; i < stats[pattern].length; i++) {
    // const order  = [0,1,2,3,6,7,4,8,5]
    const order  = [0,1,2,3,4,5,6,7,8]
    
    console.log(stats[pattern][order[i]].map(v => v.charCodeAt(0).toString(5).padStart(3,'0'))) // Base5
    const ascii = stats[pattern][order[i]].map(v => alpha[v.charCodeAt(0)]).join("") // Ascii
    // const ascii = stats[pattern][order[i]].map(v => v).join("") // Ascii 42
    console.log(ascii)
    all.push(ascii)
    console.log(stats[pattern][order[i]].map(v => v.charCodeAt(0)).join(" ")) // Decimal

    const p = stats[pattern][order[i]]
    // console.log(p.map(v => String.fromCharCode(p[v.charCodeAt(0)].charCodeAt(0) +32)).join(""))
    // console.log("p", alpha[p[p[0].charCodeAt(0)].charCodeAt(0)])
    // console.log(stats[pattern][order[i]][stats[pattern[order[i]]].charCodeAt(0)]) // Decimal
    
    // console.log(stats[pattern][order[i]].map(v => alphaAZ[v.charCodeAt(0) % 26])) // Ascii
    // console.log(stats[pattern][order[i]].map(v => a85[v.charCodeAt(0) % size]))
    // console.log(stats[pattern][order[i]].map(v => v.charCodeAt(0).toString(5)))
    // console.log(stats[pattern][order[i]].map(v => String.fromCharCode(v.charCodeAt(0) + 32)).join(""))
    // console.log(stats[pattern][order[i]].map(v => v.charCodeAt(0) + 32))
    // console.log(stats[pattern][order[i]].map(v => alpha[v.charCodeAt(0)])) // Ascii
    // console.log(stats[pattern][order[i]].map(v => alpha[v.charCodeAt(0) % size]).join("")) // Ascii
}
console.log(all.join("\r\n"))

const abc = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
const p1 = stats[pattern]

const az85 = Array.from({ length:85 }, (_, i) => String.fromCharCode(i + 40)).join("")

const b = []
for (var i = 0; i < 9; i++) {
    const r1 = stats[pattern][i].map(v => v.charAt(0).charCodeAt(0))
    // console.log(r1)
    const r = []
    for (var j = 0, k = r1[0]; j < r1.length; j++) {
    // for (var j = 1, k = 0; j < r1.length; j++) {
        // r.push(alpha[Math.abs((r1[j] + k)) % 85]) // Ascii ABC
        // r.push(alpha[r1[j]]) // Ascii 83
        // r.push(String.fromCharCode(r1[j])) // Ascii CharCode
    }
    b.push(r.join(""))
    console.log(r.join(""))
}
console.log(b.join(""))

function ii() { 
    const e1 = parse(m[0][0],m[0][1])
    const w1 = parse(m[1][0],m[1][1])
    const e2 = parse(m[2][0],m[2][1])
    const w2 = parse(m[3][0],m[3][1])
    const e3 = parse(m[4][0],m[4][1])
    const w3 = parse(m[5][0],m[5][1])
    const e4 = parse(m[6][0],m[6][1])
    const w4 = parse(m[7][0],m[7][1])
    const e5 = parse(m[8][0],m[8][1])

    const abc = "ABCDEFGHIKLMNOPQRSTUVWXYZ"

    const a = [e1,w1,e2,w2,e3,w3,e4,w4,e5]
    console.log(a)

    const b = a.map(v => v.map((u,i) => {
        return i % 2 === 0 ? u.charAt(1) + u.charAt(2) : u.charAt(1) + u.charAt(2)
        // return i % 2 === 0 ? u.charAt(0) + u.charAt(2) + u.charAt(1) : u.charAt(2) + u.charAt(0) + u.charAt(1)
        // return u.charAt((i + 2) % 3) + u.charAt((i + 1) % 3) + u.charAt((i + 0) % 3)
    }))
    // const b = a.map(v => v.map((u,i) => u.charAt(0) + u.charAt(1) + u.charAt(2)))
    // Middle eye removed
    console.log(b)
    const s = new Set()
    b.forEach(v => v.forEach(w => s.add(w)))
    console.log(s)
    
    const c = b.map(v => v.map(u => abc.charAt(parseInt(u, 5))))
    console.log(c)

    const d = c.map(v => v.join(""))
    console.log(d.join(""))
}
ii()

// E1 broken out into rows of 26
// const p2 = parse(m2[0])
const p2 = rotate(encode(parse(m[0][0],m[0][1])))[10].map(v => v.toString(5).padStart(3, "0"))
console.log("p2", p2)
const p3 = p2.map((_, i) => p2.slice(i * 26, (i + 1) * 26)).filter(v => v.filter(w => w).length)
console.log(p3)

const s1 = new Set()
p3[0].forEach(v => s1.add(v))
console.log("s", s1)
console.log("i", p3[0].map(v => parseInt(v, 5)).sort((a, b) =>  a - b))

// Going down, up, down with eyes stacked "i!i"
console.log("Up/Down")
for (var i = 0; i < stats[pattern].length; i++) {
    const p = stats[pattern][i].map(v => v.charCodeAt(0).toString(5).padStart(3,"0"))
    console.log(p)

    const stacked = [[],[],[]]
    for (var j = 0; j < p.length; j++) {
        stacked[0].push(p[j].charAt(0))
        stacked[1].push(p[j].charAt(1))
        stacked[2].push(p[j].charAt(2))
    }
    // console.log(stacked)
    const s2 = []
    for (var j = 0; j < p.length; j+=3) {
        s2.push(alpha[parseInt(stacked[0][j] + stacked[0][j + 1] + stacked[0][j + 2], 5)])
    }
    console.log(s2)
}


function vernam(plain,key) {
    let cipher="";
    const lenplain=plain.length;
    const lenkey=key.length;
    let keypointer=0;
    for (i=0;i<lenplain;i++)
        {
         if (keypointer > (lenkey-1) ) keypointer=0;
         const plainchar=plain.charAt(i);
         const keychar=key.substr(keypointer,1);
         const cipherchar=String.fromCharCode( ( plainchar.charCodeAt(0) ^ keychar.charCodeAt(0) ) +32);
         cipher=cipher+cipherchar;
         keypointer++;
        }
    
     return cipher;
    }
    
    function devernam(cipher,key) {
    let plain2="";
    let keypointer=0;
    const lencipher=cipher.length;
    const lenkey=key.length;
    for (i=0;i<lencipher;i++)
         {
          if (keypointer > (lenkey-1)) keypointer=0;
          const cipherchar=cipher.substr(i,1);
          const keychar=key.substr(keypointer,1);
          const plainchar=String.fromCharCode( ((cipherchar.charCodeAt(0)-32) ^ keychar.charCodeAt(0)) );
          plain2=plain2+plainchar;
          keypointer++;
         }
    return plain2;
    }
    
    const k1 = " !\"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqr"
    console.log(vernam("RMy GOD ThenThen"," !\"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqr").split("").map(v => v.charCodeAt(0)))
    console.log(vernam("b%PMy GUNSThenThen"," !\"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqr").split("").map(v => v.charCodeAt(0)))
    const v1 = vernam("Lorem ipsum dolor sit amet . The graphic and typographic operators know this well, in reality all the professions dealing with the universe of communication have a stable relationship with these words, but what is it? Lorem ipsum is a dummy text without any sense. It is a sequence of Latin words that, as they are positioned, do not form sentences with a complete sense, but give life to a test text useful to fill spaces that will subsequently be occupied from ad hoc texts composed by communication professionals.",
    k1)//.split("").map(v => String.fromCharCode(v.charCodeAt(0) + 32)).join("")
    console.log(v1)
    console.log(devernam(v1,k1))
    // const v1 = vernam("b%PMy GUNSThenThen","abcdefghijklmnopqr").split("").map(v => v.charCodeAt(0))
    const v2 = vernam("?cbbc%PMy GUNSThenThen!?0","diamond")
    console.log(devernam(v2,"diamond"))
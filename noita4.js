function eye(i) {
    if (i === '') { return '' }
    const positions = [0,1,2,3,4]
    return positions[i].toString()
}

function parse(e1, e2) {
    // e1 = e1.split("").reverse().join("")
    // e2 = e2.split("").reverse().join("")
    // const e = e1.concat(e2)

    let eyes = []
    for (var i = 0; i < e1.length; i+=3) {
        // 83
        const g1 = eye(e1.charAt(i + 0)) + eye(e2.charAt(i + 0)) + eye(e1.charAt(i + 1))
        const g2 = eye(e2.charAt(i + 1)) + eye(e1.charAt(i + 2)) + eye(e2.charAt(i + 2))
        // 85
        // const g1 = e1.charAt(i + 0) + e1.charAt(i + 1) + e1.charAt(i + 2)
        // const g2 = e2.charAt(i + 0) + e2.charAt(i + 1) + e2.charAt(i + 2)
        // 99
        // const g1 = e1.charAt(i + 0) + e2.charAt(i + 1) + e1.charAt(i + 2)
        // const g2 = e2.charAt(i + 0) + e1.charAt(i + 1) + e2.charAt(i + 2)
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

function encode(eyes) {
    console.log(eyes)
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
            // encoded.push(parseInt(i1 + i2 + i3, 5).toString(16))
            // encoded.push(String.fromCharCode(parseInt(i1 + i2 + i3, 5) + offset)) // Ascii
        }
    }
    // console.log("encodings", encodings)
    
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

m.forEach(v => console.log(v[0].concat(v[1]).length))
const e1 = ascii(encode(parse(m[0][0],m[0][1])))
const w1 = ascii(encode(parse(m[1][0],m[1][1])))
const e2 = ascii(encode(parse(m[2][0],m[2][1])))
const w2 = ascii(encode(parse(m[3][0],m[3][1])))
const e3 = ascii(encode(parse(m[4][0],m[4][1])))
const w3 = ascii(encode(parse(m[5][0],m[5][1])))
const e4 = ascii(encode(parse(m[6][0],m[6][1])))
const w4 = ascii(encode(parse(m[7][0],m[7][1])))
const e5 = ascii(encode(parse(m[8][0],m[8][1])))

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
    console.log(i, s2.length, min, max, total, unused)
    console.log([...s2].sort().map(v => v.charCodeAt(0)))
    // console.log(s)

    const alpha = [...Array(max)].map((v, i) => String.fromCharCode(i))
    // console.log(alpha)
    const u2 = []
    alpha.forEach(v => { if (!s.has(v)) { u2.push(v) } })
    // console.log(u2)
}

const size = 83
const alpha = [...Array(size)].map((v, i) => String.fromCharCode(i + 32)).join('')
console.log(alpha)
const alphaAZ = [...Array(26)].map((v, i) => String.fromCharCode(i + 65)).join('')
const alpha09 = [...Array(10)].map((v, i) => String.fromCharCode(i + 48)).join('')
console.log(alphaAZ)

const alpha2 = [...Array(83)].map((v, i) => String.fromCharCode(i + 161)).join('')

const alphaA9 = alphaAZ.concat(alpha09)

const pattern = 10
for (var i = 0; i < stats[pattern].length; i++) {
    // const order  = [0,1,2,3,6,7,4,8,5]
    const order  = [0,1,2,3,4,5,6,7,8]
    // console.log(stats[pattern][order[i]].map(v => String.fromCharCode(v.charCodeAt(0) + 32)).join(""))
    // console.log(stats[pattern][order[i]].map(v => v.charCodeAt(0) + 32))
    // console.log(stats[pattern][order[i]].map(v => alpha[v.charCodeAt(0)])) // Ascii
    // console.log(stats[pattern][order[i]].map(v => alpha[v.charCodeAt(0) % size]).join("")) // Ascii
    console.log(stats[pattern][order[i]].map(v => v.charCodeAt(0).toString(5).padStart(3,'0'))) // Ascii
    console.log(stats[pattern][order[i]].map(v => alpha[v.charCodeAt(0) % size])) // Ascii
    // console.log(stats[pattern][order[i]].map((v,i) => (i % 2 === 0 ? alpha2 : alpha)[v.charCodeAt(0) % size])) // Ascii
    console.log(stats[pattern][order[i]].map(v => v.charCodeAt(0))) // Decimal

    // console.log(stats[pattern][order[i]].map(v => a85[v.charCodeAt(0) % size]))
    // console.log(stats[pattern][order[i]].map(v => v.charCodeAt(0).toString(5)))
}

// for (var i = 0; i < 9; i++) {
for (var i = 0; i < 1; i++) {
    const r1 = stats[pattern][i].map(v => v.charAt(0).charCodeAt(0))
    console.log(r1)
    const r = []
    for (var j = 0, k = 0; j < r1.length; j++) {
    // for (var j = 1, k = 0; j < r1.length; j++) {
        // r.push(alpha[(r1[j].charCodeAt(0) + (k+=0)) % 26]) // Ascii
        // r.push((r1[j].charCodeAt(0) + (k+=0)) % 85) // Decimal
        // r.push(alpha[(r1[j].charCodeAt(0) + (k+=r1[j-1].charCodeAt(0))) % 85])
        r.push(alpha[(r1[j] + (k+=3)) % 83])

        // r.push(alpha[r1[r2[j].charCodeAt(0)].charCodeAt(0)])

        // r.push(alpha[(r1[j].charCodeAt(0) + 32 + (k+=0)) % 26])

        // r.push(r1[j]) // Decimal
        // r.push(alpha[r1[j]]) // Ascii
        // r.push(r1[j].charCodeAt(0).toString(2)) // Binary
        // r.push(alpha[((r1[j].charCodeAt(0) + (k+=1)) % 26) + 33]) // Ascii A-Z
    }
    console.log(r.join(""))
}

const m0 = m[0]
const e0 = [[],[],[]]
for (var i = 0; i < m0[0].length; i+=3) {
    e0[0].push(m0[0][i])
    e0[0].push(m0[1][i+2])

    e0[1].push(m0[0][i])
    e0[1].push(m0[1][i+1])

    e0[2].push(m0[0][i+1])
    e0[2].push(m0[1][i+2])
}
e0[1] = e0[1].reverse()
console.log("e0", e0)
const m1 = e0[0].join("").match(/.{1,3}/g)
// const m2 = m1.reduce((r, e, i) => (i % 3 ? r[r.length - 1].push(e) : r.push([e])) && r, [])
const m2 = m1.map((v,i) => parseInt(v,5))
console.log(m2)
console.log(m2.map(v => String.fromCharCode(v)))

const god = []
for (var i = 0; i < e0[0].length; i+=3) {
    // console.log(i)
    const a = parseInt(e0[0][i] + e0[0][i+1] + e0[0][i+2],5)
    const b = parseInt(e0[1][i+2] + e0[1][i+1] + e0[1][i],5)
    const c = parseInt(e0[2][i] + e0[2][i+1] + e0[2][i+2],5)
    god.push(String.fromCharCode(a+32))
    god.push(String.fromCharCode(b+32))
    god.push(String.fromCharCode(c+32))
}
// console.log(god) 
for (var i = 0; i < 30; i++) {
    const a = (i * i)/3
    if (a % 3 === 0) {
    console.log(i, i*i, a)
    }
}

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
    // const positions = [4,3,2,1,0] // 83 Shifts 42
    // const positions = [2,3,4,1,0] // 83
    const positions = [0,1,2,3,4]
    // const positions = [2,1,0,3,4] // 85
    // NOTE When 83 is flipped it shifts char codes by 42
    // return flip(positions[i].toString())
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
        // eyes.push(i1 + (4-parseInt(i2)) + i3)
        eyes.push(i1 + i2 + i3)
        if (g2 === '') { break; }

        const j1 = g2.charAt(0), j2 = g2.charAt(1), j3 = g2.charAt(2)
        // eyes.push(j1 + (4-parseInt(j2)) + j3)
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
const e1 = ascii(rotate(encode(parse(m[0][0],m[0][1]))))
const w1 = ascii(rotate(encode(parse(m[1][0],m[1][1]))))
const e2 = ascii(rotate(encode(parse(m[2][0],m[2][1]))))
const w2 = ascii(rotate(encode(parse(m[3][0],m[3][1]))))
const e3 = ascii(rotate(encode(parse(m[4][0],m[4][1]))))
const w3 = ascii(rotate(encode(parse(m[5][0],m[5][1]))))
const e4 = ascii(rotate(encode(parse(m[6][0],m[6][1]))))
const w4 = ascii(rotate(encode(parse(m[7][0],m[7][1]))))
const e5 = ascii(rotate(encode(parse(m[8][0],m[8][1]))))

// const e1 = ascii(rotate(encode(parse3(m2[0]))))
// const w1 = ascii(rotate(encode(parse3(m2[1]))))
// const e2 = ascii(rotate(encode(parse3(m2[2]))))
// const w2 = ascii(rotate(encode(parse3(m2[3]))))
// const e3 = ascii(rotate(encode(parse3(m2[4]))))
// const w3 = ascii(rotate(encode(parse3(m2[5]))))
// const e4 = ascii(rotate(encode(parse3(m2[6]))))
// const w4 = ascii(rotate(encode(parse3(m2[7]))))
// const e5 = ascii(rotate(encode(parse3(m2[8]))))

// const g1 = ascii(rotate(encode("212 314 20 434 143 320 414 13 420 344 410 231 413 314 22 441 201 2 444 222 241 444 123 411 444 122 10 413 314 22 441 201 412 444 300 141 144 132 211 414 212 224 434 43 120 444 223 100 144 120 221 444 221 123 412 13 121 144 122 212 414 311 120 414 213 21 414 213 121 444 43 101 144 110 241 443 334 2 444 3 310 144 102 224 441 211 142 344 433 320 444 120 1 444 330 1 411 341 12 241 401 322 444 423 112 344 420 141 144 123 242 444 221 0 441 201 32 311 441 242 144 122 224 444 212 141 444 312 101 413 214 22 441 201 2 434 342 420 414 314 121 444 232 124 123 104 214 444 333 201 444 210 141 441 231 402 441 321 112 434 341 122 413 14 122 344 431 410 441 221 102 444 111 44 444 1 100 344 430 211 441 143 314 144 130 214 444 20 141 341 431 102 434 42 424 444 14 31 131 141 222 444 122 414 414 12 122 444 223 413 441 21 102 244 10 241 444 302 141 414 12 21 414 10 223 444 33 111 444 120 3 144 130 214 414 13 124 444 220 140 144 123 212 414 313 121 434 42 420 144 130 211 441 434 11 134 122 241 434 342 214 413 14 122 444 112 341 441 331 12 443 34 322 434 242 420 444 300 111 421 11 2 314 413 220 434 42 424 413 214 223 444 223 110 241 131 112 441 121 2 444 203 413 444 23 102 413 14 122 441 201 2 444 231 320 341 411 422 444 203 411 444 322 240 414 312 21 411 214 23 444 423 112 414 211 420 444 230 31 444 331 14 444 23 101 113 411 123 434 342 124 412 311 122 341 441 312 444 200 122 444 21 140 441 201 32 444 423 112 413 214 424 444 333 201 444 210 141 441 231 402 314 412 224 443 34 142 441 201 402 444 300 441 414 213 21 444 4 411 144 130 211 441 431 12 441 121 2 314 411 222 444 43 114 444 220 140 113 411 124 444 13 400 144 110 241 443 334 2 442 3 311 133 144 242 413 214 22 444 220 221 341 421 242 341 431 202 314 412 222 441 224 120 441 321 222 244 322 210 144 142 211 441 321 242 244 330 341 344 431 300 441 301 112 444 313 401 413 14 422 144 131 240 444 0 31 414 313 121 434 43 421 144 101 200 443 204 414 444 314 131 144 112 200 444 233 221 414 313 21 441 1 412 444 104 211 444 322 414 414 12 21 414 213 21 244 400 41 441 121 42 444 304 110 414 311 124 444 33 100 344 401 230 424 240 13 134 142 222 412 421".split(" ").map(v => v.padStart(3,"0")))))
const t = [e1,w1,e2,w2,e3,w3,e4,w4,e5]
// const t = [e1,w1,e2]
// const t = [g1]
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
    const o = [...s].map(v => v.charCodeAt(0)).sort((a, b) =>  a - b)
    console.log("o", o)
    const o1 = []
    for (var j = 0; j < o.length; j++) {
        const d = o[j+1] - o[j]
        if (d > 1) { o1.push([o[j],d]); }
    }
    console.log(o1)

    // const alpha = [...Array(max)].map((v, i) => String.fromCharCode(i))
    // // console.log(alpha)
    // const u2 = []
    // alpha.forEach(v => { if (!s.has(v)) { u2.push(v) } })
    // // console.log(u2)
    // console.log(s2.map(v => v.charCodeAt(0)).sort((a, b) =>  a - b).map(v => String.fromCharCode(v + 32 + 12)).join(""))
}

// https://gist.github.com/antimatter15/2bf0fcf5b924b4387174d5f84f35277c
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
    return res
}

const size = 125
const alpha = [...Array(size)].map((v, i) => String.fromCharCode(i + 32)).join('')
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

const abc26 = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
const abc25 = "ABCDEFGHIKLMNOPQRSTUVWXYZ"

function abc(base) {
    if (base.length === 0) { return abc26[0] }
    if (base.length === 1) { return abc26[base[0]] }

    // const a = base[0] % 2 === 0 ? abc26 : abc26.split("").reverse().join("")
    const a = abc26
    return a[base[1]]
}

const all = []
const pattern = 10
for (var i = 0; i < stats[pattern].length; i++) {
    // const order  = [0,1,2,3,6,7,4,8,5]
    const order  = [0,1,2,3,4,5,6,7,8]
    
    console.log(stats[pattern][order[i]].map(v => v.charCodeAt(0).toString(5).padStart(3,'0'))) // Base5
    // const ascii = stats[pattern][order[i]].map(v => alpha[v.charCodeAt(0)]).join("") // Ascii
    const ascii = stats[pattern][order[i]].map(v => alpha[v.charCodeAt(0)]).join("").match(/.{1,26}/g) // Ascii
    // const ascii = stats[pattern][order[i]].map(v => v).join("") // Ascii 42
    console.log(ascii)
    all.push(ascii)
    console.log(stats[pattern][order[i]].map(v => v.charCodeAt(0).toString(5).padStart(3,"0")).join(" ")) // Decimal
    // console.log(stats[pattern][order[i]].map(v => base(v.charCodeAt(0).toString().split(""), 83, 5))) // Base 26
    // console.log(stats[pattern][order[i]].map(v => base([v.charCodeAt(0)], 83, 5))) // Base 5
    console.log(stats[pattern][order[i]].map(v => base([v.charCodeAt(0)], 83, 26))) // Base 26
    console.log(stats[pattern][order[i]].map(v => abc(base([v.charCodeAt(0)], 83, 26)))) // Base 26

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
console.log(all.map(v => v.join("")).join("\r\n"))

// const abc = ["ABCDE".split(""),"FGHIK".split(""),"LMNOP".split(""),"QRSTU".split(""),"VWXYZ".split("")]
console.log(abc26)
const p1 = stats[pattern]

const b = new Map()
// const groups = [0,0,0,0]
const groups = [[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]]
for (var i = 0; i < 9; i++) {
    const r1 = stats[pattern][i].map(v => v.charAt(0).charCodeAt(0))
    // console.log(r1)
    const r = []
    for (var j = 1, k = r1[0]; j < r1.length; j++) {
    // for (var j = 1, k = 0; j < r1.length; j++) {
        const eye = r1[j].toString(5).padStart(3,"0")
        // const e1 = parseInt(eye.charAt(0))
        // const e2 = parseInt(eye.charAt(2))
        // console.log(e1,e2)
        // r.push(abc[e1][e2])
        // r.push(abc[r1[j] % 26]) // Ascii ABC
        // r.push(r1[j] % 26) // Decimal ABC
        // r.push(alpha[r1[j]]) // Ascii 83
        r.push(Math.abs(k - r1[j])) // Ascii 83
        // r.push(String.fromCharCode(r1[j])) // Ascii CharCode
        
        const diff = (r1[j-1] + r1[j]) % 83 // Subtracting
        // console.log(diff)
        if (!b.has(diff)) {
            b.set(diff, [])
        }
        b.get(diff).push([i,j-1])
        // r.push(diff) // Ascii CharCode

        const v = r1[j] + 32
        if (v >= 65 && v <= 90) { groups[i][0] = groups[i][0] + 1 } // A-Z
        else if (v >= 97 && v <= 122) { groups[i][1] = groups[i][1] + 1 } // a-z
        else if (v >= 48 && v <= 57) { groups[i][2] = groups[i][2] + 1 } // 0-9
        else { groups[i][3] = groups[i][3] + 1 }
    }
    console.log(r)
    // b.push(r.join(""))
    // console.log(r.join(""))
}
// console.log(c.join(""))
console.log([...b].sort((a, b) =>  a[1].length - b[1].length))
console.log(b)
console.log(groups)

// Diamond by overlapping 2 trigrams and taking the 2 middle values, uses pattern 0
const f = []
for (var i = 0; i < 9; i++) {
    const r = stats[pattern][i]
    const m = r.map(v => v.charAt(0).charCodeAt(0).toString(5).padStart(3,"0"))
    console.log(m)
    const e = []
    for (var j = 0; j < m.length - 1; j+=2) {
    // for (var j = 0; j < m.length - 1; j++) {
        // e.push(abc26[j % 2 === 0 ?
        // e.push(j % 2 === 0 ?
            // parseInt(m[j].charAt(1) + m[j+1].charAt(1),5) :
            // parseInt(m[j+1].charAt(1) + m[j].charAt(1),5)
        // ])
        e.push(parseInt(m[j].charAt(0) + m[j+1].charAt(0),5))
        e.push(parseInt(m[j+1].charAt(1) + m[j].charAt(1),5))
        e.push(parseInt(m[j].charAt(2) + m[j+1].charAt(2),5))
    }
    // console.log(e.map(v => v.toString(5).padStart(2,"0")))
    console.log(e.map(v => abc25[v]))
    f.push(e)
}
console.log("f", f)

for (var i = 1; i < 83; i++) {
// for (var i = 0; i < 25; i++) {
// console.log(base([i],83,26))
// console.log(i-1, base([83],83,i))
// console.log(i, base([i],5,26)) // ??? Reverse alphabet % 2
}

// console.log(base("201".split("").map(v => parseInt(v)), 7, 5))
console.log(base([2,0,0], 5, 26))
console.log(base([1,24], 26, 83))
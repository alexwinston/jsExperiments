function parse(e1, e2) {
    let eyes = []
    for (var i = 0; i < e1.length; i+=3) {
        const g1 = e1.charAt(i + 0) + e2.charAt(i + 0) + e1.charAt(i + 1)
        const g2 = e2.charAt(i + 1) + e1.charAt(i + 2) + e2.charAt(i + 2)

        const i1 = g1.charAt(0), i2 = g1.charAt(1), i3 = g1.charAt(2)
        eyes.push(i1 + i2 + i3)
        if (g2 === "") { break; }

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
            encodings[p].push(parseInt(i1 + i2 + i3, 5) + 32) // Decimal
            // encoded.push(parseInt(i1 + i2 + i3, 5).toString(16))
            // encoded.push(String.fromCharCode(parseInt(i1 + i2 + i3, 5) + offset)) // Ascii
        }
    }
    console.log(encodings)
    
    const rotations = []
    for (var i = 0; i < encodings.length; i++) {
        for (var j = 0; j < encodings.length; j++) {
            rotations.push([i,j])
        }
    }
    console.log(rotations)

    const ordered = []
    for (var r = 0; r < rotations.length; r++) {
        ordered[r] = []
        for (var i = 0; i < encodings[0].length; i++) {
            ordered[r].push(encodings[i % 2 === 0 ? rotations[r][0] : rotations[r][1]][i])
        }
    }
    console.log(ordered)
    // return encoded.join("")
    return ordered
}

// console.log(148 % 83)

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
    console.log(chars)
    return chars
}

const e1 = ascii(encode(parse(
    '20101322330404113023211431303300402400031022104400020010404014414203302203424101400321211413004111010024124100403100113331220330103113111211210322314',
    '0320412200014222421222201100032013411132313131300311321201422313314413414412110403314323411221010100401204124424424021310424224130304110203123204313'
)))

const w1 = ascii(encode(parse(
    '31101322330404113023211431303300402400402020104400010404404014414203302203413121222330324400024323111022123103102204302414221422203024200123212402323201403',
    '0320412200014222421222201100032013411011112131300011020201422313314413414414014034314012221113402103014133412213301323101322112130203222200422310313224113'
)))

const e2 = ascii(encode(parse(
    '121013223304041130232114313033004024004302013230044210143001214140311024104223014113030144102020311114241034232132112001132210042231043242013103010200300221034201043101100200124',
    '132041220001422242122220110003201341132102441113222231403330130231010322441422141120120040103022122402040000103221040020142240312031330231000103310441201422131402022020141322311'
)))

const w2 = ascii(encode(parse(
    '301014304231111130103200114211142042144110120210044012022014100202130013243312143110223024224201021223142200103111223122201000012143101233312010224203221',
    '132041002441200222141013240022220120402401130112010322313431422313213031100003203401230041222213132220230242140211440011010101321231103032030241320322030'
)))

const e3 = ascii(encode(parse(
    '22101430400010030222023122223214414421131322331212013400414130231000123104313014021422202304200121424121122310401003400124024102023204304303122413131230114200103012422122403300321102421313323100104124012304',
    '3320410022224313410032420000102200424310200201400020212123111000031122201100320030210313002122103100003123320032404222323111302110210202223414121132403212304102101033004320314121114223304034000410423010104'
)))

const w3 = ascii(encode(parse(
    '111014304044023101033232120113240032023033031134224144111303003142234042131112103133214200230011143034143033110122120120120123130011024014133021023002220044120224022234203033120244040200',
    '432041002342120301441212222401420211130431413200210141202112431230203111430021101132211120442310131321231020311022200210312220001440122003232142141332131220002121100141102242103402411442'
)))

const e4 = ascii(encode(parse(
    '10101430400010000001021323312014213300310100422321003430014421422402220030002214323430012024223011030130200104003013021222214313030201310211310223000310323212202423010131123221303',
    '2320410022224312124304303001102034211303034110223132024033020302224411420101410123324013413413024413014124122223033224323314110324032001221031124314401202313421210220100323034034'
)))

const w4 = ascii(encode(parse(
    '301014304000100000010213233120140040002211310214001032122241124300100131223313040210240103202210243021012103012033232204233241203302023301041204241012232101224314114042121114140130',
    '232041002222431212430430300110222113142030221230132301430413420300032332421140402211103132412102142440311122021431141311140311421232122410240132440030221440020231000031000102140011'
)))

const e5 = ascii(encode(parse(
    '111014304000100000010213233120143044133101214223302024014144212222230212213233014110114103111010240110204010013100130102041041221134130133013243011042010221131224220222041',
    '332041002222431212430430300110211112430303411022401202041302002242420240341202211211130110441211112403410122040041213020203002240010120442311042111142031102232442101331431'
)))

const t = [e1,w1,e2,w2,e3,w3,e4,w4,e5]
// console.log(t)
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
console.log(t2)

const stats = []
for (var i = 0; i < t2.length; i++) {
    for (var j = 0; j < t2[i].length; j++) {
        if (stats[j] === undefined) { stats[j] = [] }
        stats[j].push(t2[i][j])
    }
}

// console.log([...s].sort())
// console.log(Math.max(...s))
console.log(stats)
for (var i = 0; i < stats.length; i++) {
    const s = new Set()
    for (var j = 0; j < stats[i].length; j++) {
        stats[i][j].forEach(k => { s.add(k) })
    }
    const s2 = [...s]
    // if (s2.length == 83) {
        // console.log(s2)
        const min = Math.min(...s2.map(c => c.charCodeAt(0)))
        const max = Math.max(...s2.map(c => c.charCodeAt(0)))
        // if (max <= 127) {
        //     console.log(i)
        //     console.log(s2.length, min, max, max - min + 1, (max - min + 1) - s2.length)
        // }
    // }
}

// console.log(stats[4][0].join(""))
// console.log(stats[5][0].join(""))
[0,1,2,3,4,5,6,7,8].forEach(i => console.log(stats[10][i].length))
const s0 = new Set()
for (var i = 0; i < 9; i++) {
    const s = new Set()
    for (var j = 0; j < stats[10][i].length; j++) {
        s.add(stats[10][i][j])
        s0.add(stats[10][i][j])
    }
    console.log(s)
}
console.log(stats[10][0].join("").charAt(82))
console.log(stats[10][8].join("").indexOf('R'))
console.log(stats[10][4].join(""))
console.log([...s0].sort().join(""))
// console.log(stats[11][0].join(""))

const numbers = Array.from({ length: 10 }, (_, i) => String.fromCharCode(48 + i));
const letters = Array.from({ length: 26 }, (_, i) => String.fromCharCode(65 + i));
console.log(numbers.concat(letters))

// console.log(stats[10][0].map(v => letters.concat(numbers)[v.charCodeAt(0) % 36]).join())
// console.log(stats[10][0].map((v, i) => String.fromCharCode(stats[10][8][114%i].charCodeAt(0) + 32)).join())

// const c = stats[10][0]
// console.log(c)
// let d = []
// for (var i = 0; i < 1000; i++) {
//     d.length = 0
//     for (var j = 0; j < c.length; j++) {
//         d.push(String.fromCharCode(c[j].charCodeAt(0) + i))
//     }
//     console.log(d.join(""))
// }
// console.log(d)

console.log(stats[10][0].join(""))

function eye(i) {
    switch(i) {
        case 1:
            return new Vector2(0,1)
        case 2:
            return new Vector2(1,0)
        case 3:
            return new Vector2(0,-1)
        case 4:
            return new Vector2(-1,0)
        default:
            return new Vector2(0,0)
    }
}

const s3 = new Set()
const m3 = new Map()
let count = 0
for (var i = 0; i < stats[10].length; i++) {
    const v1 = stats[10][i].map(v => {
        const i = v.charCodeAt(0).toString(5)
        const i1 = eye(parseInt(i.charAt(0)))
        const i2 = eye(parseInt(i.charAt(1)))
        const i3 = eye(parseInt(i.charAt(2)))

        // return Vector2.multiply(Vector2.multiply(i1, Vector2.inverse(i2)), i3)
        return Vector2.add(Vector2.add(i1, Vector2.inverse(i2)), i3)
        // return Vector2.add(Vector2.add(i1, i2), i3)
    })
    v1.forEach(v => {
        count++
        const id = JSON.stringify({x:v.x, y:v.y})
        if (!m3.has(id)) { m3.set(id, 0) }
        m3.set(id, m3.get(id) + 1)

        s3.add(id)
    })
}

// console.log(m3)
const l1 = new Map()
const alphabet = []
for (const [key, value] of m3) {
    alphabet.push(value / count * 100)
    // console.log(key, value / count * 100)
    l1.set(key, value / count * 100)
}
const freq = alphabet.sort(function(a, b){return a - b}).reverse()
// console.log(s3)
// console.log(count)

function left(a,n) {while (n>0) {a.push(a.shift());n--;}return a;};

// const letters = ['E','T','A','O','I','N','S','R','H','L','D','C','U','M','F','P','G','W','Y','B','V','K','X','Q','Z']
const freqs = new Map()
freq.forEach((v, i) => freqs.set(v, letters[i]))
// console.log(freqs)

const v8 = stats[10][0].map(v => {
    const i = v.charCodeAt(0).toString(5)
    const i1 = eye(parseInt(i.charAt(0)))
    const i2 = eye(parseInt(i.charAt(1)))
    const i3 = eye(parseInt(i.charAt(2)))

    // return Vector2.multiply(Vector2.multiply(i1, Vector2.inverse(i2)), i3)
    return Vector2.add(Vector2.add(i1, Vector2.inverse(i2)), i3)
    // return Vector2.add(Vector2.add(i1, i2), i3)
})
const decoded = []
v8.forEach(v => {
    const id = JSON.stringify({x:v.x, y:v.y})
    decoded.push(freqs.get(l1.get(id)))
})
// console.log(decoded.join(""))

const alpha = [...Array(83)].map((v, i) => String.fromCharCode(i + 32)).join('')
const alpha2 = [...Array(26)].map((v, i) => String.fromCharCode(i + 65)).join('')
console.log(alpha2)
function encrypt(a, b, word) {
    for (var i = 0; i < word.length; i++) {
        var alphaIndex = alpha.indexOf(word[i]);
        var troublesome = (a * alphaIndex + b) % alpha.length;
        word = word.substring(0, i) + alpha[troublesome] + word.substring(i + 1);
    }
    return word;
}

// console.log(stats[10][0])
for (var i = 0; i < 83; i++) {
    for (var j = 0; j < 83; j++) {
        if (encrypt(i,j,'1') === "R" && encrypt(i,j,"2") === "p" && encrypt(i,j,"3") === ";") {
            console.log(i, j)
            break
        }
    }
}
console.log(encrypt(30,38,"9"))

const h = new Set()
stats[10][0].forEach(v => h.add(v))
console.log([...h])
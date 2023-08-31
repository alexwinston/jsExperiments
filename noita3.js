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
    console.log("encodings", encodings)
    
    const rotations = []
    for (var i = 0; i < encodings.length; i++) {
        for (var j = 0; j < encodings.length; j++) {
            rotations.push([i,j])
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
    console.log(ordered)
    // return encoded.join("")
    return ordered
}

function ascii(encodings) {
    const chars = []
    for (var i = 0; i < encodings.length; i++) {
        chars[i] = []
        for (var j = 0; j < encodings[i].length; j++) {
            // chars[i].push(encodings[i][j])
            chars[i].push(String.fromCharCode(encodings[i][j] % 91))
            // chars[i].push(String.fromCharCode(((encodings[i][j]) % 83) + 32))
        }
    }
    console.log(chars)
    return chars
}

function pack(bytes) {
    var str = "";
// You could make it faster by reading bytes.length once.
    for(var i = 0; i < bytes.length; i += 2) {
// If you're using signed bytes, you probably need to mask here.
        var char = bytes[i] << 8;
// (undefined | 0) === 0 so you can save a test here by doing
//     var char = (bytes[i] << 8) | (bytes[i + 1] & 0xff);
        if (bytes[i + 1])
            char |= bytes[i + 1];
// Instead of using string += you could push char onto an array
// and take advantage of the fact that String.fromCharCode can
// take any number of arguments to do
//     String.fromCharCode.apply(null, chars);
        str += String.fromCharCode(char);
    }
    return str;
}

function typical(s) {

    const a = s
    // const a = s.split("").reverse().join("")
    // const a = s.split("").reverse().join("").match(/.{1,51}/g)
    // const a = s.match(/.{1,51}/g)

    const b = []
    // for (var i = 0; i < a.length; i++) {
    //     // const c = i % 2 === 1 ? a[i].split("").reverse().join("") : a[i]
    //     const c = a[i]
    //     console.log(c)
    //     b.push(...c.match(/.{1,3}/g))
    // }
    // // for (var i = 0; i < b.length; i++) {
    // //     b[i] = i % 2 === 0 ? b[i].split("").reverse().join(""): b[i]
    // // }
    b.push(...a.match(/.{1,3}/g))
    console.log(b.map(v => parseInt(v,5)))
    let total = BigInt(0)
    b.forEach(v => total = (total * 5n + BigInt(parseInt(v,5))))
    console.log(total)
    console.log(total.toString(2))
    console.log(total.toString(2).match(/.{1,8}/g).map(v => parseInt(v,2)))
    return b
}
const a1 = "331131200113110140134002200113333421134222422430242333424020313122312303202033041413413343044123001321410123101213421033"
const a2 = "422340331324314413120100003241313232012003430000124420332002012130014133403211013410234414114103133004002320042003120144"
const a3 = "22102412342204343333403412134334322114100231023221442342003320230200443310044242443403340131104402001310340203314143101244104012320143002434023011422014233100210240312231302313143002012033143410030121032333331433433023404433420344222423242100234400300311334113343130242411122431023431113204434344042034434230040230230303320314241201240123144111411241201430040020432403012000221131444431140"
const a4 = "101114223120100031121240040102034303200241344013200120224143322000144341210322020204334114323124220110230411422344"
const a5 = "4024220433224344332020411424411310212203312130222443300002412002030443030010334100141313314303303422003014300430411421420420044330421240303233201133431004121320043440342031143021330023431301104343122422202103011112030304230404244311442313310141313203113143100034400132411432312442341430042312203242211433132220111"

const tj1 = ascii(encode(typical(a1)))
const tj2 = ascii(encode(typical(a2)))
const tj3 = ascii(encode(typical(a3)))
const tj4 = ascii(encode(typical(a4)))
const tj5 = ascii(encode(typical(a5)))
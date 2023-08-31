// https://en.wikipedia.org/wiki/Trifid_cipher
const key = 5
const abc = { 3: 65, 4: 32, 5: 32}
const length = key**key
// const ascii = Array.from({ length }, (_, i) => i + 0x16a0)
const ascii = Array.from({ length }, (_, i) => i + abc[key])
const z = Array(key).fill().map(e => Array(key).fill().map(e => Array(key).fill("").map(e => e)));

let c = 0
for (var i = 0; i < key; i++) {
    for (var j = 0; j < key; j++) {
        for (let k = 0; k < key; k++) {
            const char = String.fromCharCode(ascii[c++])
            // console.log(i,j,k,char)
            z[i][j][k] = char
        }
    }
}

console.log("z", [z])

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

// const d1 = "0 75 1 101 62 62 75 0 24 74 38 113 58 58 36 61 81 31 3 3 10 10 17 117 5 30 86 86 67 42 9 84 0 75 55 80 30 55 9 109 39 89 44 94 23 123 17 117 23 123 64 39 1 101 15 90 71 96 41 116 33 58 9 9 26 26 25 100 59 59 74 49 20 120 23 123 20 20 33 83 76 101 70 70 95 45 3 78 48 48 26 51 41 41 40 65 72 97 44 19"
const d1 = "50 82 1 116 62 65 75 21 24 57 38 102 58 62 36 70 81 40 3 18 10 21 17 121 5 28 86 76 67 33 9 95 0 76 55 77 30 70 9 102 39 96 44 86 23 116 17 111 23 121 64 31 1 120 15 91 71 87 41 121 33 52 9 6 26 25 25 100 59 55 74 32 20 122 23 107 20 7 33 91 76 112 70 67 95 33 3 80 48 31 26 60 41 37 40 65 72 91 44"
// const d1 = "Ab%QkV\"\\=H\"W)/[2d#D%OA5[L2<l[B\\_o;,V%QPVWT^he*Y6ZPcU'B@>?3:(BN'>gWBkV)&\\%79MJp9,6l4S^5H)I*Li(Afi&?5h%H]SJb`j]9_J8I"

// const m3 = m1.split(" ").filter(i => i).map(v => parseInt(v).toString(5).padStart(3,'0')).join('')
const e1 = d1.split("").map(v => (parseInt(v.charCodeAt(0)) - 32).toString(5).padStart(3,'0')).join("").replaceAll("0","").match(/.{1,3}/g)
console.log(e1.length, e1)
console.log("e1", e1)

console.log(decrypt(d1, 5))
const m = []
for (var i = 0; i < e1.length; i++) {
    const j = e1[i].split("")
    const a = parseInt(j[0])
    const b = parseInt(j[1])
    const c = parseInt(j[2])
    console.log(a,b,c)
    m.push(z[a][b][c])
}
console.log(m.length, m)
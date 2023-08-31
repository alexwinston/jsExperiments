// https://en.wikipedia.org/wiki/Trifid_cipher
const key = 5
// let ascii = Array.from({ length }, (_, i) => i + 32)
// const ascii = "phqgmeaylnofdxkrcvszwbuti"
const ascii = "ABCDEFGHIKLMNOPQRSTUVWXYZ"
// console.log(ascii)

const z = Array(key).fill().map(e => Array(key).fill().map(e => e));

let c = 0
for (var i = 0; i < key; i++) {
    for (var j = 0; j < key; j++) {
        // const char = String.fromCharCode(ascii[c++ % key])
        const char = ascii[c++]
        // console.log(i,j,k,char)
        z[i][j] = char
        // z[i][j] = c++
    }
    // Rotate
    // ascii.push(ascii.shift());
}

console.log([z])

function scan(c) {
    for (var i = 0; i < key; i++) {
        for (var j = 0; j < key; j++) {
            if (z[i][j] === c) {
                // const s = [i,j]
                const s = i.toString() + j.toString()
                // console.log(c, s)
                return s
            }
        }
    }
    return undefined
}

function encipher(s, size) {
    console.log("s", s)
    let encipher = []
    Array.from(s).forEach(c => { encipher.push(scan(c)) })
    console.log("encipher", encipher)

    const groupings = Math.floor(s.length / size)
    const remainder = s.length % (groupings * size)
    console.log(groupings, remainder)
    let groups = Array.from(Array(2), _ => Array())
    for (var i = 0; i < encipher.length; i++) {
        groups[0].push(encipher[i][0])
        groups[1].push(encipher[i][1])
        // groups[2].push(encipher[i].charAt(2))
    }
    console.log("groups", groups)

    let grouped = Array.from(Array(groupings), _ => Array.from(Array(2), _ => ""))
    for (var i = 0; i < groupings; i++) {
        // groups[i]
        for (var j = 0; j < size; j++) {
            grouped[i][0] += groups[0][(i * size) + j]
            grouped[i][1] += groups[1][(i * size) + j]
        }
    }
    console.log("grouped", grouped)

    let remainders = Array.from(Array(2), _ => "")
    for (var j = groupings * size; j < s.length; j++) {
        remainders[0] += groups[0][j]
        remainders[1] += groups[1][j]
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
        console.log("group", group)
        for (var j = 0; j < size; j++) {
            const a = parseInt(group.charAt((j * 2) + 0))
            const b = parseInt(group.charAt((j * 2) + 1))
            // console.log(a, b)
            ct += z[a][b]
            // ct += String.fromCharCode(parseInt(Math.round(Math.random() * 3) + a.toString() + b.toString(),5) + 32)
        }
    }

    const remainder = remainders.join("")
    console.log("remainder", remainder)
    for (var i = 0; i < remain; i++) {
        const a = parseInt(remainder.charAt((i * 2) + 0))
        const b = parseInt(remainder.charAt((i * 2) + 1))
        // console.log(a, b)
        ct += z[a][b]
        // ct += String.fromCharCode(parseInt(Math.round(Math.random() * 3) + a.toString() + b.toString(),5) + 32)
    }

    return ct
}

function decrypt(s, size) {
    const groupings = Math.floor(s.length / size)
    const remainder = s.length % (groupings * size)
    // console.log(groupings, remainder)

    let groups = ""
    for (var i = 0; i < s.length; i++) {
        groups += scan(s.charAt(i))
    }
    const grouped = groups.match(new RegExp('.{1,' + (2 * size) + '}', 'g'));
    // console.log(grouped)

    let decrypted = ""
    for (var i = 0; i < groupings; i++) {
        const group = grouped[i].match(new RegExp('.{1,' + (size) + '}', 'g'))
        for (var j = 0; j < size; j++) {
            const a = group[0].charAt(j)
            const b = group[1].charAt(j)
            decrypted += z[a][b]
        }
    }

    if (remainder) {
        const group = grouped[i].match(new RegExp('.{1,' + (remainder) + '}', 'g'))
        for (var i = 0; i < remainder; i++) {
            const a = group[0].charAt(i)
            const b = group[1].charAt(i)
            decrypted += z[a][b]
        }
    }

    return decrypted
}

const size = 2
// const t1 = encrypt(encipher("defendtheeastwallofthecastle", size))
const t1 = encrypt(encipher("ATESTTESTNOTBNOW", size))
console.log(t1)
console.log(decrypt(t1, size))
const t2 = encrypt(encipher("BGOODTESTINGANOW", size))
console.log(t2)
console.log(decrypt(t2, size))
const t3 = encrypt(encipher("CTESTGOODNOTANOW", size))
console.log(t3)
console.log(decrypt(t3, size))
const t4 = encrypt(encipher("DGAMEGOODBLAHNOW", size))
console.log(t4)
console.log(decrypt(t4, size))

// Rb%P^-k=8]Jfb^@.q(/n"=-Q!prH_q53 HSa:.5fOLPJ3P-O3Qh?%8#K[cAQI\5:>%94g+jX$j3g$SIKphV_oq/0L?>,AY<-`KP

const m1 = "50 82 1 116 62 65 75 21 24 57 38 102 58 62 36 70 81 40 3 18 10 21 17 121 5 28 86 76 67 33 9 95 0 76 55 77 30 70 9 102 39 96 44 86 23 116 17 111 23 121 64 31 1 120 15 91 71 87 41 121 33 52 9 6 26 25 25 100 59 55 74 32 20 122 23 107 20 7 33 91 76 112 70 67 95 33 3 80 48 31 26 60 41 37 40 65 72 91 44"

// const m3 = m1.split(" ").filter(i => i).map(v => parseInt(v).toString(5).padStart(3,'0')).join('')
const e1 = m1.split(" ").filter(i => i).map(v => parseInt(v).toString(5).padStart(3,"0").substring(1))
console.log(e1)
const e2 = e1.map(v => ascii[parseInt(v, 5)]).join("")
console.log(e2)

console.log(decrypt(e2, size))

// 

// Noita LUA encrypt
// teststring = "abcdefghijklmnopqrstuvwxyzdsice_trual_fgoipucrs_sm_t_theme"
// function get_flag_name(text)
//   local result = ""
//   for i=1,#text do
//     result = result .. string.sub(teststring,26 + string.find(teststring,
//       string.sub(text,i,i)),26+string.find(teststring,string.sub(text,i,i)))
//   end
//   return result
// end

// local test = get_flag_name("u_dheglmticg")
// local test2 = get_flag_name("bqedcjkvxooa")
// io.write(test,"\n")
// io.write(test2)

// TypicalJava Python decrypt
// def baseN(num,b,numerals="0123456789abcdefghijklmnopqrstuvwxyz"):
//     return ((num == 0) and numerals[0]) or (baseN(num // b, b, numerals).lstrip(numerals[0]) + numerals[num % b])
    
// msgvalue = int("22102412342204343333403412134334322114100231023221442342003320230200443310044242443403340131104402001310340203314143101244104012320143002434023011422014233100210240312231302313143002012033143410030121032333331433433023404433420344222423242100234400300311334113343130242411122431023431113204434344042034434230040230230303320314241201240123144111411241201430040020432403012000221131444431140", 5)
// numerals = ''.join([chr(i) for i in range(256)])
// ptext = baseN(msgvalue, 256, numerals=numerals)
// # with baseN casually stolen from stackoverflow when I'm too lazy to find/write it myself for the Nth time lol
// print(ptext)
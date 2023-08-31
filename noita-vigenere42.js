// const az42 = Array.from({ length:83 }, (_, i) => String.fromCharCode(i + 42)).join("")
console.log("az125", az125)

const d = decode(10, [4,3,2,1,0], az125)

d.forEach(v => console.log(v))

function ic(s) {
    var count = 0
    for (var i = 0; i < s.length; i++) {
        const c = s[i].charCodeAt(0)
        if ((c >= 65 && c <= 90) || (c >= 97 && c <= 122)) {
            count++ 
        }
    }
    return count
}

console.log("az125", az125.substring(42))
for (var i = 0; i < 1000000; i++) {
    const az = shuffle(az125.substring(42))
    const ct = Vigenere.decrypt(d[0], "i!i", az)
    // console.log(ct)
    if (ic(ct) > 85) {
        console.log(ct.join(""))
        console.log(az)
    }
}

console.log("i!i")
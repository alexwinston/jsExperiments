const d = decode(10, [0,1,2,3,4])
// const d = decode(10, [4,3,2,1,0])

const k2 = "9KH&12356dflkjNCSA*nwod"
console.log(Autokey.encrypt("1. TESTY", "A", az83))
console.log(Autokey.decrypt("R?.T&%4:", "A", az83))
console.log("a1", Autokey.encrypt("1T.. DESKS! FOR GREAT", k2, az83))
console.log("a2", Autokey.encrypt("2T.. BESTS? THE GREAT", k2, az83))
console.log(Autokey.decrypt("KYV&SWfii0fM@<Nj2fKO", k2, az83))

// https://macs4200.org/chapters/07/4/autokey-cipher.html
console.log(Autokey.encrypt("ACCEPTTHEGREATERCHALLANGE", "UNICORN", az26))
console.log(Autokey.decrypt("UPKGDKGHGIVTTMLVIYELEIEIL", "UNICORN", az26))

console.log(Autokey.encrypt("1. TEST MEN HELPING TEST", "RT%", az83))
console.log(Autokey.encrypt("2. TEST DON HELPING TEST", "DT%", az83))
console.log(Cipherkey.encrypt("1. TEST MEN HELPING TEST", "RT%", az83))
console.log(Cipherkey.encrypt("2. TEST DON HELPING TEST", "DT%", az83))
console.log(Autokey.decrypt("c?.T&%4TMr NHmq)&$\"", "Q", az83))
console.log(Autokey.decrypt("Vp%fSS5E$0ND$ L%n'$I/lS5", "Ca$", az83))
console.log(Autokey.decrypt("Vb%fSS5E$0ND$ L%n'$I/lS5", "DT%", az83))

const pt1 = "1. TEST MEN HELPING TEST"
const ct4 = Autokey.encrypt(pt1.repeat(100), "RT%1234567890abcQWERTYUIOPASDFGHJ", az83)
console.log(split(ct4, pt.length))

const abc09 = " .ABC3EFGHIJKLMNOPQRSTUVWXYZ012D456789"
console.log(Autokey.encrypt("1. A6QUICKBROWNFOX", "ABC", abc09))
console.log(Autokey.encrypt("2. B7QUICKBROWNFOX", "ABC", abc09))

const pt5 = "3. C8QUICKBROWNFOX"
ct5 = Autokey.encrypt(pt5.repeat(100), "ABC", abc09)
console.log(split(ct5, pt5.length))

const k73 = az83.substring(1,74)
const k219 = k73.split("").reverse().join("") + k73.substring(1)
console.log(Autokey.decrypt(d[0], k219, az83.split("").reverse().join("")))

const ak1 = Autokey.encrypt("1. aTESTb", "i!i", az83)
console.log(ak1)

console.log(Autokey.decrypt(ak1, "i!i", az83))
console.log(Cipherkey.decrypt(ak1, "i!i", az83))
console.log(Vigenere.decrypt(ak1, "i!i", az83))

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

// for (var i = 0; i < 1000000; i++) {
//     const az = shuffle(az83)
//     const ct = Vigenere.decrypt(d[0], "i!i", az)
//     if (ic(ct) > 75) {
//         console.log(ct)
//         console.log(az)
//     }
// }

// https://crypto.interactive-maths.com/autokey-cipher.html
console.log(Autokey.encrypt("MEETMEATTHECORNER", "KING"))
console.log(Autokey.decrypt("WMRZYIEMFLEVHYRGF", "KING"))
console.log(Chi.key("WMRZYIEMFLEVHYRGF", 17))
console.log(Vigenere.decrypt("WMRZYIEMFLEVHYRGF", "SINVUEAIBHARDUNCB"))
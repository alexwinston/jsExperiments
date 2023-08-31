Array.prototype.differences = function() {
    const differences = []
    if (this.length === 1) { return this }
    for (var i = 1; i < this.length; i++) {
        differences.push(this[i] - this[i - 1])
    }
    return differences
}

// https://onjsdev.com/article/calculate-standard-deviation-in-javascript
Array.prototype.std = function() {
    // Calculate mean
    const mean = this.reduce((acc, curr) => acc + curr) / this.length;
    // Population
    const length = this.length;
    // Sample
    // const length = this.length - 1;

    const std = Math.sqrt(
        this
            .map((number) => Math.pow(number - mean, 2))
            .reduce((acc, curr) => acc + curr) / length
        );
    return std
}

// https://www.radfordmathematics.com/algebra/sequences-series/difference-method-sequences/quadratic-sequences.html
Array.prototype.difference = function() {
    return this.slice(2).reduce((p,c,i,a) => p.differences(), this.differences())[0]
}

// Generate n primes from start
function* primes(n, start = 1) {
    let value = start, i = 0;
    while (i++ < n) {
        if (value > 2) {
            let k, q;
            do {
                k = 3;
                value += 2;
                q = Math.floor(Math.sqrt(value));
                while (k <= q && value % k) {
                    k += 2;
                }
            } while (k <= q);
        } else {
            value = value === 2 ? 3 : 2;
        }
        yield value;
    }
}

const eyes = decode(10, [0,1,2,3,4])
// const eyes = decode(10, [4,3,2,1,0])
// const eyes = decode(10, [2,0,1,3,4], az125.shift(32))
// const eyes = decode(10, [1,2,3,4,0], az125.shift(7))
// const offset = 25
const offset = 32
// const offset = 42

{
    // const permutations = eyes.map(v => v[0].charCodeAt(0) - offset).permute()
    const permutations = eyes.map(v => Multiplicative.inverse(v[0].charCodeAt(0) - offset, 13, 83)).permute()
    // const permutations = eyes.map(v => Exponentiation.inverse(3, 83, v[0].charCodeAt(0) - offset)).permute()
    const differences = permutations.map(v => v.differences())
    const uniques = differences.map(v => new Set(v.sort((a,b) => b - a)))
    console.log(permutations[0])
    console.log(differences[0])
    console.log(uniques[0])
    console.log("Uniques")
    console.log(uniques.filter(v => v.size === 1))
    const difference = permutations.map(v => v.difference())
    console.log("Differentiable")
    console.log(difference.filter(v => v === 0))
    console.log(permutations.filter(v => v.difference() === 0))

    const differentiable = [
        [10,30,50,70,90],
        [100,50,0,-50],
        [0,10,30,60,100],
        [1**3,2**3,3**3,4**3,5**3],
        [13,11,9,7,5,3,1],
        [-3,0,5,12,21,32],
        [1,3,5,9,11,13,17],
        [20,10,30,20,40,30],
        [5,15,45,135],
    ]
    console.log("Differentiable")
    console.log(differentiable.map(v => v.difference()))

    // console.log(permutations[0].std())

    console.log(permutations[0].differences().differences().differences().differences().differences().differences().differences().differences())
    console.log(permutations[0].difference())

    const numbers = [5,4,3,2,1]
    console.log(numbers.difference())

    console.log("Primes")
    console.log([...primes(10,3)].differences())
    console.log([...primes(10)].difference())
    console.log([...primes(10)])

    console.log(new Set([...primes(83)].map(v => v % 83)))

    function a(n) {
        return 3 + 2 * (n - 1)
        // return ((n * 3) - 10)**3
        // return n - (n**3)
        // return n**3
    }
    console.log("Algebra")
    console.log([a(1), a(2), a(3), a(4), a(5), a(6), a(7), a(8), a(9)].difference())

    console.log("Eyes")
    eyes.map(v => console.log(v))
    console.log(eyes.map(v => v[0].charCodeAt(0) - offset))
    console.log(eyes.map(v => v[0].charCodeAt(0) - offset).sort((a,b) => a - b))
    console.log(eyes.map(v => v[0].charCodeAt(0) - offset).sort((a,b) => a - b).differences().sort((a,b) => a - b))
    console.log(eyes.map(v => v[0].charCodeAt(0) - offset).sort((a,b) => a - b).difference())
    console.log(eyes.map(v => Mod.inverse(v[0].charCodeAt(0) - offset, 83)).sort((a,b) => a - b).difference())
    console.log(eyes.map(v => Exponentiation.inverse(3, 83, v[0].charCodeAt(0) - offset)).sort((a,b) => a - b).difference())

    console.log(eyes.slice(0,3).map(v => v[0].charCodeAt(0) - offset).sort((a,b) => a - b).difference())
    console.log([eyes[0],eyes[3],eyes[6]].map(v => v[0].charCodeAt(0) - offset).sort((a,b) => a - b).difference())

    // Ngrams and Gaps
    console.log(eyes.map(v => v.ngrams(2, true, true)))
    console.log(Gaps.sum(eyes.map(v => Gaps.counts(v.gaps()))))

    // console.log([0,1,2,3,4].permute().map(v => decode(10, v)))
}

{
    const pt = "QUICKBROWNFOX"
    const ct = Cipherkey.encrypt(pt, az83, az83, Vigenere)
    console.log(ct)
    console.log(Cipherkey.decrypt(ct, az83, az83))
}

{
    const pt = [
        "1. GOING TO THE STORE I AM",
        "2. HE IS A GREAT BASS PLAYER",
        "3. LOTS OF PEOPLE CANT SEE",
        "4. EXERCISE IS HARD BUT SATISFYING",
        "5. NO NEWS IS GOOD NEWS",
        "6. PETS KEEP YOU YOUNG",
        "7. DISEASE WILL BE ERADICATED ONE DAY",
        "8. I LOVE ALMOST ALL MUSIC",
        "9. PROBLEM SOLVING IS FUN"
    ]
    const kt = "i!i"
    // const kt = az83

    // const az = az83
    const az = az125.shift(32).slice(0, 83)
    console.log("Alphabet", az.length, az)
    // [90, 89, 49, 93, 76, 42, 63, 40, 46] // 89
    // [71, 22, 80, 10, 7, 51, 41, 45, 3] // 83

    // const ct = eyes
    // const ct = [eyes[7], eyes[3], eyes[2], eyes[1], eyes[4], eyes[5], eyes[0], eyes[6], eyes[8]] // 89
    const ct = [eyes[5], eyes[3], eyes[0], eyes[6], eyes[7], eyes[4], eyes[2], eyes[1], eyes[8]] // 83
    // const ct = pt.map(v => Cipherkey.encrypt(v, kt, az, Vigenere))
    // const ct = pt.map(v => Cipherkey.encrypt(v, kt, az, Shift.chain(Shift.additive, Shift.multiplicative(30))))
    // const ct = pt.map(v => Cipherkey.encrypt(v, kt, az, Shift.chain(Shift.additive, Shift.exponetial(3))))
    ct.map(v => console.log(v))

    console.log(ct.map(v => v[0].charCodeAt(0) - 32))
    console.log(ct.map(v => v[0].charCodeAt(0) - 32).differences())
    console.log(ct.map(v => v[0].charCodeAt(0) - 32).difference())
    console.log(ct.map(v => Multiplicative.inverse(v[0].charCodeAt(0) - 32, 11, az.length)))
    console.log(ct.map(v => Multiplicative.inverse(v[0].charCodeAt(0) - 32, 11, az.length)).differences())
    console.log(ct.map(v => Multiplicative.inverse(v[0].charCodeAt(0) - 32, 11, az.length)).difference())
    // console.log(ct.map(v => Exponentiation.inverse(3, az.length, v[0].charCodeAt(0) - 32)).differences())
    // console.log(ct.map(v => Exponentiation.inverse(3, az.length, v[0].charCodeAt(0) - 32)).difference())

    for (var i = 0; i < 83; i++) {
        // console.log("Decrypt")
        // ct.map(v => console.log(Shift.decrypt(v, String.fromCharCode(i + 32), az, [Shift.multiplicative(11)])))
    }
    // ct.map(v => console.log(Cipherkey.decrypt(v, String.fromCharCode(i + 32), az, Vigenere)))
    // ct.map(v => console.log(Cipherkey.decrypt(v, kt, az, Shift.chain(Shift.additive, Shift.multiplicative(30)))))
    // ct.map(v => console.log(Cipherkey.decrypt(v, kt, az, Shift.chain(Shift.additive, Shift.exponetial(3)))))

    // const m = ct.map(v => Exponentiation.inverse(v[0].charCodeAt(0) - 32, 11, az.length))
    // const m = ct.map(v => Exponentiation.inverse(3, az.length, v[0].charCodeAt(0) - 32))
    const inverse = ct.map(v => Exponentiation.inverse(3, 83, Multiplicative.inverse(v[0].charCodeAt(0) - 32, 5, 83)))
    console.log(inverse)
    console.log(inverse.difference())
    console.log(inverse.map(v => Multiplicative.inverse(v - 0, 11, 83)))

    const permutations = eyes.map(v => v[0].charCodeAt(0) - offset).permute()
    // const solutions = permutations.filter(v => v.difference() === 0)
    const solutions = permutations
    // const differences = solutions[0].permute().map(v => [v, v.difference()]).filter(v => v[1] === 0)
    const differences = solutions[0].permute().map(v => [v, v.difference()])
    console.log("Shuffled")
    const shuffled = [1,2,3,4,5,6,7,8,9].shuffle()
    console.log(shuffled)
    // const t = shuffled.map((v,i) => (((v**3)**3)**3) % az.length)
    const t = shuffled.map((v,i) => (((v * 3)**3) * 3) % az.length)
    // const t = shuffled.map((v,i) => (((v**3) * 3)**3) % az.length)
    // const t = shuffled.map((v,i) => ((v**e) * m) % 83)
    // const t = shuffled.map((v,i) => (v * 5) % 83)
    // const t = shuffled.map((v,i) => (v**e) % 83)
    // const differences = t.permute().map(v => [v, v.difference()]).filter(v => v[1] === 0)
    // const differences = t.permute().map(v => [v, v.difference()])
    console.log(t)
    console.log(differences)
    for (let e = 1; e <= 9; e++) {
    // for (let m = 1; m < az.length; m++) {
    // const e = 1
    // const m = 1
    // const permutations = eyes.map(v => Multiplicative.inverse(Exponentiation.inverse(e, 83, v[0].charCodeAt(0) - 32), m, 83)).permute()
    // const permutations = eyes.map(v => Exponentiation.inverse(e, 83, Multiplicative.inverse(v[0].charCodeAt(0) - 32, m, 83))).permute()
    // const permutations = eyes.map(v => Multiplicative.inverse(v[0].charCodeAt(0) - 32, 11, 83)).permute()
    // const permutations = eyes.map(v => Exponentiation.inverse(3, 83, v[0].charCodeAt(0) - 32)).permute()
    // console.log(solutions)

    // const differences = solutions[0].permute().map(v => [v, v.difference()]).filter(v => v[1] === 0)
    // console.log(differences)
    // const r = differences[0][0].map(v => Exponentiation.inverse(e, az.length, Exponentiation.inverse(e, az.length, Exponentiation.inverse(e, az.length, v)))).sort((a,b) => a - b)
    // const r = differences[0][0].map(v => Multiplicative.inverse(Exponentiation.inverse(e, az.length, Multiplicative.inverse(v, m, az.length)), m, az.length)).sort((a,b) => a - b)
    const r = differences[0][0].map(v => Exponentiation.inverse(e, az.length, Multiplicative.inverse(Exponentiation.inverse(e, az.length, v), m, az.length))).sort((a,b) => a - b)
    // const r = differences[0][0].map(v => Multiplicative.inverse(Exponentiation.inverse(e, az.length, v), m, az.length)).sort((a,b) => a - b)
    // const r = differences[0][0].map(v => Exponentiation.inverse(e, az.length, Exponentiation.inverse(e, az.length, v))).sort((a,b) => a - b)
    // const r = differences[0][0].map(v => Exponentiation.inverse(e, az.length, Multiplicative.inverse(v, m, az.length))).sort((a,b) => a - b)
    // const r = differences[0][0].map(v => Multiplicative.inverse(v, m, az.length)).sort((a,b) => a - b)
    // const r = differences[0][0].map(v => Exponentiation.inverse(e, az.length, v)).sort((a,b) => a - b)
    // const r = differences[0][0].map(v => v).sort((a,b) => a - b)
    const diff = r.difference()
    if (!isNaN(diff)) {
        console.log("Differences")
        console.log(r)
        console.log(r.differences())
        console.log("Difference", r.difference(), e, m)
    }
    // }
    }

    // console.log(new Set(eyes.map(v => v.split("").map(w => w.charCodeAt(0) - offset)).flat().sort((a,b) => a - b)))
}

{
    const a = 47
    const b = 4
    const c = 0
    const m = 83

    // const d = ((a * b) + c).mod(m)
    const d = ((a ** b) + c).mod(m)
    console.log(d)
    // console.log(a, Multiplicative.inverse((d - c),b,m))
    console.log(a, Exponentiation.inverse(b,m,(d - c).mod(m)))

    const factorial = n =>  n - 1 > 0 ? n * factorial(n - 1) : n;

    for (var i = 0; i < m; i++) {
        for (var j = 0; j < m; j++) {
            const n = []
            for (var k = 0; k < m; k++) {
                // const j = (i**2) % 83
                // const j = factorial(i) % 83n
                // const k = (((j**5) % m) * (i+10)) % m
                const z = ((i*j*(k**3))) % m

                n.push(z)
            }
        
            if (new Set(n).size == m) {
            console.log(i, n)
            console.log(n.rotate(-n.indexOf(50)).slice(0,9))
            }
        }
    }
    

    // [50, 80, 36, 76, 63, 34, 27, 77, 33]
    // [56, 86, 42, 82, 69, 35, 33, 83, 39]
}

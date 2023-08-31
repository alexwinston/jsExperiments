
// const ct2 = cipher(compress(". Hello John"))
// console.log(ct2.map(v => parseInt(v,5)))

function compress2(s, base = new BigNumber(83)) {
    const values = s.split("").map(v => new BigNumber(alphabet.indexOf(v)))
    console.log(values)

    let compressed = new BigNumber(0)
    values.forEach(v => compressed = compressed.times(base).plus(v))
    return compressed
}

function cipher2(n, base = new BigNumber(5)) {
    console.log("cipher2", n)
    const digits = []
    while (n.integerValue().gt(0)) {
        // console.log(n.integerValue())
        digits.push(n.mod(base))
        n = n.dividedBy(base).integerValue(BigNumber.ROUND_DOWN)
    }
    console.log("digits2", digits)
    const ct = digits.reverse().join("").match(/.{1,3}/g)
    console.log(ct)
    return ct
}

// const ct2 = cipher2(compress2(message))
// console.log("cipher2", ct2.map(v => parseInt(v.toString(),5)))
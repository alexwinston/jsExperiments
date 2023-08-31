String.prototype.rotate = function (n) { // eslint-disable-line no-extend-native
    return this.slice(n) + this.slice(0, n)
}

class Alphabet {
    constructor(characters) {
        this.data = characters
        this.nadirIndex = Math.floor(characters.length / 2)
    }

    permute(newZenith, skipAmount) {
        let permutedCharacters = this.data.rotate(this.data.indexOf(newZenith))
        if (skipAmount === 2) permutedCharacters = permutedCharacters.rotate(1)
        this.data = permutedCharacters.slice(0, skipAmount) +
            permutedCharacters.slice(skipAmount, this.nadirIndex + 1).rotate(1) +
            permutedCharacters.slice(this.nadirIndex + 1)
    }
}

class Chao {
    constructor(ciphertextAlphabet, plaintextAlphabet) {
        this.reinitialize = function () {
            this.alphabets = [new Alphabet(ciphertextAlphabet), new Alphabet(plaintextAlphabet)]
        }
    }

    process(text, select) {
        this.reinitialize()
        return text.split('').map(c => {
            const lastConvertedLetter = this.alphabets[select].data.charAt(this.alphabets[1 - select].data.indexOf(c))
            // Only convert characters in the source alphabet.
            if (lastConvertedLetter === '') return c
            this.alphabets[select].permute(lastConvertedLetter, 1 + select)
            this.alphabets[1 - select].permute(c, 2 - select)
            return lastConvertedLetter
        }).join('')
    }

    encode(text) {
        return this.process(text, 0)
    }

    decode(text) {
        return this.process(text, 1)
    }
}

// https://github.com/allenluce/node-chao
{
    const plaintextAlphabet = 'df6nCwtk0F7NoQ4prO1aR5Hcq3xJSMiYB9eVWTL8XAslEzuhmUbygIvKPZDG2j'
    const ciphertextAlphabet = 'CLMYN3KWOX6bPEQRgqtn0J4IruH5Bcfv9jkGhm1ZSzyA78iUFwT2slpDaVxedo'

    const chao = new Chao(plaintextAlphabet, ciphertextAlphabet)

    const input = 'Something very important!'
    const ciphertext = chao.encode(input)
    console.log(ciphertext, 'X2VP4Y8oF qUNj MqsQlBCdf!')
    const recoveredtext = chao.decode(ciphertext)
    console.log(recoveredtext, input)
}

{
    const chao = new Chao(az83.shuffle(), az83.shuffle())
    const ct = pt.map(v => chao.encode(v))
    console.log(ct)
}
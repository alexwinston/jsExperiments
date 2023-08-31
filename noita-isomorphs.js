const eyes = decode(10, [0,1,2,3,4])

function glyphs(k) {
    const alphabets = []
    const glyphs = []

    for (var i = 0; i < 100; i++) {
        const az = shuffle(" !\"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqr")
        // const az = ABC.key(shuffle("KNOWLEDGEISPOWER"), az83)
        // const t = pt.map(v => Cipherkey.encrypt(v, k, az, Vigenere, Cipherkey.word))
        // const t = pt.map(v => Cipherkey.encrypt(v, k, az, Vigenere))
        // const t = pt.map(v => Cipherkey.encrypt(v, k, ABC.step(ABC.offset(az83, 17), 5)))
        // const t = pt.map(v => Cipherkey.encrypt(v, k, az))
        const t = pt.map(v => Vigenere.encrypt(v, k + az, az))

        // NOTE Repeats are explained in MILCRYP3 pg 48
        const f = new Frequencies(t.join(""), az).sorted
        if (f[0][1] < 30 && t[0][70] == t[1][70] && t[0][71] == t[1][71] && t[6][40] == t[8][40]) {
            // console.log("az", az)
            // t.forEach(v => console.log(v))
            // console.log(t.map(v => v.split("").map(w => w.charCodeAt(0) - 32)))
            // console.log(f)
            // console.log(Cipherkey.decrypt(t[0], k, az, Vigenere))
            // console.log(Cipherkey.decrypt(t[8], k, az, Vigenere))
            alphabets.push(az)
            glyphs.push(t)
        }
    }
    console.log("GLYPHS")
    return { az:alphabets, ct:glyphs }
}

{
    const isomorphs = new Array(eyes[3], eyes[4], eyes[5]).isomorphs(4, 15, 2, 12)

    console.log(isomorphs)
    console.log(Isomorphs.shared(isomorphs))
    const indexes = Isomorphs.index(isomorphs, [eyes[3], eyes[4], eyes[5]])

    // const id = "ABCDEFGHBIAD" // 6,7,8
    const isomorph = "ABCDEDFGHIJKLA" // 3,4,5
    console.log(indexes.get(isomorph))
}

{
    // MILCRYP3 pg 16
    const ct = "LHJJTYZLDXZHYPHZFOCXLIMDFGOOBDPFQXXQGYJPRXGJGLTSRMKSPGZZIJFPKEFGJIMKHXWIYDCCTAUEEDTFKHUNFZHSGRGEGJKLIBWXWDVBBOWTDXSTVWMTFBDJZIYZBE"
    const isomorphs = ct.isomorphs(13, 13, 4)
    console.log(isomorphs)
    console.log("pg 16", Isomorphs.index([isomorphs], [ct]))
}

{ 
    // MILCRYP3 pg 
    const msgs = new Array(
        "VNNPHSMXWIPUCWRSTGUCRMLJJTUQREHSFVOJRRTD",
        "RWWZIYVUAKZGMAEYDQGMEVJSSDGWGZSTTDBGTOCN",
        "UZZYBRXILNYKOLGRATKOHZBTAGFPMFBRAXCVYEEP"
    )
    const isomorphs = msgs.isomorphs(4, 15, 3, 9)
    console.log(isomorphs)
    console.log(Isomorphs.shared(isomorphs))
    const indexes = Isomorphs.index(isomorphs, msgs)
    console.log(indexes)
}

{
    // const msgs = new Array(eyes[0], eyes[1], eyes[2])
    const msgs = new Array(eyes[6], eyes[7], eyes[8])
    const isomorphs = msgs.isomorphs(5, 20, 2, 15)
    // const msgs = new Array(eyes[0], eyes[1], eyes[2], eyes[3], eyes[4], eyes[5])
    // const isomorphs = msgs.isomorphs(3, 7, 1, 7)

    console.log(isomorphs)
    console.log(Isomorphs.shared(isomorphs))
    const indexes = Isomorphs.index(isomorphs, msgs)
    console.log(indexes)

    const isomorph = "ABCDECFAE"
    console.log("E1 W1 E2")
    console.log(indexes.get(isomorph))
}

{
    // Ciphertext isomorphs *A?&5F<',$G9%"BE!=18:7@+;DH#>ilc-qIV^eP.4/2mjKC)kMXo6(d S0r_`bNUna\[LYRTpO]JZWQhfg3
    // Ciphertext isomorphs X#<!GD*($,@B>/+-2H4i%J'7pm5CLZE?oKRYna"AMNr\O^Pb8.`Q[gd]UqhS_TVeW30I;=6&1: j)cfk9Fl
    // Ciphertext isomorphs bhoZmpQ0+#gaXnNLK-If*4j,Y("SeEFq_3'T^)]9WrV8:MCG=@iDPlA!2>/c[<k? Od`6.J\B&H%$1RU75;
    
    // const ciphertexts = glyphs("i!i")
    // console.log(ciphertexts)
    // for (var i = 0; i < ciphertexts.ct.length; i++) {
    //     // Only test the first 3 messages
    //     const ct = ciphertexts.ct[i].slice(0,3)
    //     console.log("az", ciphertexts.az[i])
    //     // console.log(ct)

    //     const isomorphs = ct.isomorphs(4, 12, 2)
    //     const indexes = Isomorphs.index(isomorphs, ct)
    //     console.log(indexes)
    // }
}

{ 
    // console.log(pt.map(v => Cipherkey.encrypt(v, "i!i", "X#<!GD*($,@B>/+-2H4i%J'7pm5CLZE?oKRYna\"AMNr\\O^Pb8.`Q[gd]UqhS_TVeW30I;=6&1: j)cfk9Fl")).join(""))
}

{
    console.log(Vigenere.decrypt(eyes[0], az83, az83.reverse()))
    console.log("ABCDEFGA".isomorph())
}

// TODO Alphabet chaining
// TODO Ciphertext autokey isomorph analysis

{
    const m = [
        "OLPJ3P-O3",
        "g+jX$j3g$",
        "dN1D-15d-",
        "&-`=Q`_&Q",
        "IhY47YaI7",

        // "OMZdeo9FMiOd",
        // "RY>gk:dVYXRg",
        // "'B@>?3:(BN'>"

        // "Haom'#:^?n:YeH",
        // "c+_o&65Sej5%1c",
        // "5H)I*Li(Afi&?5"
    ]

    const k = ABC.key(m[0] + m[1] + m[2] + m[3] + m[4], az83)
    // const k = ABC.key(m[0] + m[1] + m[2], az83)
    console.log(Cipherkey.decrypt(m[0], m[1], az83))
    console.log(Cipherkey.decrypt(m[0], m[1], k))
    // console.log(Cipherkey.decrypt(eyes[6], m[0], k))
    console.log(Cipherkey.decrypt(eyes[0], "!", k))

    // for (var i = 0; i < 100000; i++) {
    //     const az = shuffle(az83)
    //     // const az = az83.reverse()
    //     const ct = Vigenere.decrypt(morphs[0], morphs[1], az)
    //     const d = ct.duplicates(1)
    //     for (const [k, v] of d) {
    //         if (v >= 6) {
    //             console.log("DUPLICATE", ct, az)
    //         }
    //     }
    // }

    // const msg = eyes[5]
    // for (var i = 1; i < msg.length; i++) {
    //     const delta = Vigenere.decrypt(msg.shift(i), msg, az83)
    //     console.log(delta)
    //     console.log(delta.duplicates())
    //     const isomorphs = new Array(delta).isomorphs(7,15,2)
    //     console.log(Isomorphs.prune(Isomorphs.index(isomorphs, [delta])))
    // }
}

// https://docs.google.com/document/d/1a4uOf7SkXEPCROEi1iHzU5Lbr3zMbtOqSq_J5c4kyOw
{
    const ct = "CWNTQHURZEMDFXUKGOUCHAVQTHNALZHXSEEIXHOQXKXDVPUCBSRRWQKQYWJLGJVLSMFBIWXQRVEIWEATMWNTPPBXZMXTYMSXWRQCGAUOFZWKMYXQCXBUMCYGMUZSNWBKEZWEZKZJJDXMISGYPHAVEDTEPKZQCIQSAHHEAFNQWFSXMXJBSMGLTABXTYRQNAJCYXQIAVNGVSNEKDTAZKZKLPUWUOTLMIHARSDLSZDISWWPUOAWUTSQRMUDMYYVGKHKQUQSFZEJDFBLRMJHVQQJZBMTBILRHSFBIBDACXTMIIFOABASELCRTWRJUXWSIBKEBZGEQZSQECSXVAKJMLUNEYDHNRBXFPBAKWABDLNOVNFNDCKBRHQLQZUIFYGARKAMYUJEEHCTBHQGVILDZTJEJCXGLUOJGOJUPTTNDBNVBWQDOVKPTPPRGAKJZCLPVXUUIPPMI"
    
    const isomorphs = new Array(ct).isomorphs(12,12)
    console.log(isomorphs)
    console.log(Isomorphs.index(isomorphs, [ct]).get("ABCDEFGADGAF"))

    console.log(Vigenere.decrypt("JCXGLUOJGOJU", "ZSNWBKEZWEZK"))

    const delta = Vigenere.decrypt(ct.shift(1), ct)
    console.log(delta)
    console.log(delta.duplicates())

    const az3 = "AAABBBCCCDDDEEEFFFGGGHHHIIIJJJKKKLLLMMMNNNOOOPPPQQQRRRSSSTTTUUUVVVWWWXXXYYYZZZ"
    const jp = "JPJPJPJPJPJPJPJPJPJPJPJPJPJPJPJPJPJPJPJPJPJPJPJPJPJPJPJPJPJPJPJPJPJPJPJPJPJPJP"
    const k_jp = Beaufort.encrypt(az3, jp)

    // JPJOIOHNHMGMFLFKEKDJDICIBHBGAGZFZEYEXDXCWCVBVAUATZTYSYRXRWQWPVPUOUNTNSMSLRLQKQ
    // JPJOITHAHMZMJMFKEKSJOJCJFHBGLGZUUNXEFDKIXCTBVLNAXFLZSXRXRWQLMVIEBUNTASMYLRLELW // x2
    console.log(k_jp)
    console.log(k_jp.length)
    // console.log(Vigenere.encrypt("AAABBBCCCDDD", "RLRLRLRLRLRLRLRLRL"))
    console.log(Vigenere.decrypt(ct, k_jp))

    const pt = "THEFITNESSGRAMPACERTESTISAMULTISTAGEAEROBICCAPACITYTESTTHATPROGRESSIVELYGETSMOREDIFFICULTASITCONTINUESTHETWENTYMETERPACERTESTWILLBEGININTHIRTYSECONDSLINEUPATTHESTARTTHERUNNINGSPEEDSTARTSSLOWLYBUTGETSFASTEREACHMINUTEAFTERYOUHEARTHISSIGNALASINGLELAPSHOULDBECOMPLETEDEACHTIMEYOUHEARTHISSOUNDREMEMBERTORUNINASTRAIGHTLINEANDRUNASLONGASPOSSIBLETHESECONDTIMEYOUFAILTOCOMPLETEALAPBEFORETHESOUNDYOURTESTISOVERTHETESTWILLBEGINONTHEWORDSTARTONYOURMARKGETREADYSTART"
    console.log(Vigenere.encrypt(pt, k_jp))

    // Recreate vulnerability using az83
    const ct83 = Cipherkey.encrypt(pt, "i!i", az83, Vigenere, Cipherkey.word)
    console.log(ct83)
    const isomorphs83 = new Array(ct83).isomorphs(5,18,2,15)
    console.log(Isomorphs.prune(Isomorphs.index(isomorphs83, [ct83])))

    console.log(Vigenere.decrypt('i&+BHPiq+', 'XYC4;qXmC', az83))

    const delta83 = Vigenere.decrypt(ct83.shift(1), ct83, az83)
    console.log(delta83)
    console.log(delta83.duplicates())

    console.log(Vigenere.encrypt("ABCD", "iiii", az83))
    console.log(Cipherkey.encrypt("1. TEST ABC GODS HANDS", "i!i", az83, Vigenere, Cipherkey.word))
    console.log(Cipherkey.encrypt("2. TEST CDE GODS HANDS", "i!i", az83, Vigenere, Cipherkey.word))
    console.log(Cipherkey.encrypt("3. TEST EFG GODS HANDS", "i!i", az83, Vigenere, Cipherkey.word))
}

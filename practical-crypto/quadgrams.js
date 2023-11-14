
// Porta cipher
(async() => {
    // console.log(Vigenere.encrypt("ENCIPHERMENTISRECIPROCAL", "PORTA", ))
    // const ct = "SYNNJSCVRNRLAHUTUKUCVRYRLANYLQZDZENKVLAMZLQVTQSEPVGVJVJFRSTOFKBEMEYUKYTWAKRBKXSUFZNFQBRZKBXCMPNWTJQR"
    const ct = "FMULRULJMTHWKOCTAVJKZGKPZXCW"
    console.log(ct.ic(3,15))
    console.log(new Kasiski(ct).key(6))
    console.log(Vigenere.decrypt(ct, "BUHZRALNRKKTT"))
  
    await Quadgrams.load("http://localhost:3000/en_quadgrams.txt")
    console.log("ATTACK".ngrams(1))
    console.log(Quadgrams.fitness("ATTACK"))
    console.log(Quadgrams.fitness("ATTACKTHEEASTWALLOFTHECASTLEATDAWN"))
    console.log(Quadgrams.fitness("FYYFHPYMJJFXYBFQQTKYMJHFXYQJFYIFBS"))
    for (const c of az26) {
      console.log(c, Monograms.fitness(Vigenere.decrypt(ct, "CI" + c + "AAAA")))
      console.log(c, Quadgrams.fitness(Vigenere.decrypt(ct, "CI" + c + "AAAA")))
    }
    console.log(Quadgrams.fitness(Vigenere.decrypt(ct, "CIPHAAA")))
  
    console.log(Monograms.fitness("FYYFHPYMJJFXYBFQQTKYMJHFXYQJFYIFBS"))
  })//()
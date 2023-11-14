// https://puzzling.stackexchange.com/questions/113055/find-the-pattern-in-this-encrypted-sequence
{
    // tfgz, aqt, its, pxoii, xhfa, nlif, nxi, ezfzh, cqiob, ctcm, swyvyus, frifri, zpfhdz, bfkztlkk, mhztmbx, rzboekb
    console.log("QWERTYUIOPASDFGHJKLZXCVBNM".step(3))
    console.log(Vigenere.encrypt("ZERO", "A", "QWERTYUIOPASDFGHJKLZXCVBNM".step(25)))
    console.log(Vigenere.encrypt("ZERO", "S", "QWERTYUIOPASDFGHJKLZXCVBNM"))
    console.log(Vigenere.encrypt("ONE", "E", "QWERTYUIOPASDFGHJKLZXCVBNM"))
    console.log(Vigenere.encrypt("TWO", "R", "QWERTYUIOPASDFGHJKLZXCVBNM"))
    console.log(Vigenere.encrypt("THREE", "Y", "QWERTYUIOPASDFGHJKLZXCVBNM"))
    console.log(Vigenere.encrypt("FOUR", "I", "QWERTYUIOPASDFGHJKLZXCVBNM"))
    console.log(Vigenere.encrypt("FIVE", "S", "QWERTYUIOPASDFGHJKLZXCVBNM"))
    console.log(Vigenere.encrypt("SIX", "F", "QWERTYUIOPASDFGHJKLZXCVBNM"))
    console.log(Vigenere.encrypt("SEVEN", "K", "QWERTYUIOPASDFGHJKLZXCVBNM"))
    console.log(Vigenere.encrypt("EIGHT", "Z", "QWERTYUIOPASDFGHJKLZXCVBNM"))
    console.log(Vigenere.encrypt("NINE", "B", "QWERTYUIOPASDFGHJKLZXCVBNM"))
    for (const i of az26) {
      // console.log(i, Vigenere.encrypt("NINE", i, "QWERTYUIOPASDFGHJKLZXCVBNM"))
    }
    for (var i = 0; i < 26; i++) {
      const az = "QWERTYUIOPASDFGHJKLZXCVBNM".step(i)
      // const az = "QWERTYUIOPASDFGHJKLZXCVBNM".shift(i)
      // console.log(i, Vigenere.encrypt("ZERO", "V", az))
      // console.log(i, az, Vigenere.encrypt("ONE", "T", az))
      // console.log(i, az, Vigenere.encrypt("TWO", "U", az))
      // console.log(i, az, Vigenere.encrypt("THREE", "A", az))
      // console.log(i, az, Vigenere.encrypt("FOUR", "Z", az))
      console.log(i, az, Vigenere.encrypt("ONEFIVE", "C", az))
      // console.log(i, az, Vigenere.encrypt("ONESIX", "W", az))
    }
  }
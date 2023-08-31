class Isomorph {
    constructor(isomorph, s, counts, patterns) {
        this.isomorph = isomorph
        this.s = s
        this.counts = counts
        this.patterns = patterns
    }

    pattern() {
        return this.isomorph.map(v => v.p != undefined ? az26[v.p] : ".").join("")
    }
}

Array.prototype.isomorphs = function(length = 2) {
    const isomorphs = []
    for (var i = 0; i <= this.length - length; i++) {
        const s = this.slice(i, i + length)
        const counts = new Map()
        for (var j = 0; j < s.length; j++) {
            const c = s[j]
            if (!counts.has(c)) { counts.set(c, 0) }
            counts.set(c, counts.get(c) + 1)
        }
        // console.log(s)
        // console.log(counts)
        const isomorph = []
        const patterns = new Map()
        for (var j = 0, k = 0; j < s.length; j++) {
            const c = s[j]
            if (counts.get(c) > 1 && !patterns.has(c)) { patterns.set(c, k++) }
            isomorph.push({ i:i+j, c:c, p:patterns.has(c) ? patterns.get(c) : undefined })
        }
        if (isomorph[0].p != undefined && isomorph[length - 1].p != undefined) {
            isomorphs.push(new Isomorph(isomorph, s, counts, patterns))
        }
    }

    return isomorphs
}

String.prototype.isomorphs = function(length = 2) {
    return this.split("").isomorphs(length)
}

Array.prototype.last = function() {
    return this[this.length - 1]
  }
  
  String.prototype.last = function() {
    return this.split("").last()
  }
  
  function chain(ct1, ct2) {
    const chain = []
    for (var i = 0; i < ct1.length; i++) {
      const ab = ct1[i] + ct2[i]
      if (!chain.includes(ab)) { // && !chain.includes(ab.reverse()) && ab[0] != ab[1]) {
        chain.push(ab)
      }
    }
    // console.log(chain)
    return chain
  }
  
  function overlap(s1,s2,n) {
    const overlap = []
    const overlap1 = s1.slice(1,s1.length)
    const overlap2 = s2.slice(0, n)
    if (overlap1 == overlap2) {
      overlap.push(s1[0] + overlap1 + s2.last())
    }
    return overlap
  }
  
  function pair(chain, n) {
    const pairs = []
    
    for (var i = 0; i < chain.length; i++) {
      for (var j = i + 1; j < chain.length; j++) {
        pairs.push(...overlap(chain[i], chain[j], n))
        pairs.push(...overlap(chain[j], chain[i], n))
      }
    }
    // Find unpaired chains and add them to the list of pairs
    for (var i = 0; i < chain.length; i++) {
      var paired = false
      for (var j = 0; j < pairs.length; j++) {
        if (pairs[j].indexOf(chain[i]) >= 0) {
          paired = true
        }
      }
      if (!paired && !pairs.includes(chain[i])) {
        pairs.push(chain[i])
      }
    }
    return pairs
  }
  
  function proportion(ct1, ct2, n = 5) {
    const chain1 = chain(ct1, ct2)
    // console.log(chain1)
    // return chain1
    
    var pairs = pair(chain1, 1)
    for (var i = 1; i < n; i++) {
      pairs = pair(pairs, i)
    }
    return pairs
  }
  
  function counts(a) {
    const counts = new Map()
    for (var i = 0; i < a.length; i++) {
      if (!counts.has(a[i])) { counts.set(a[i], 0) }
      counts.set(a[i], counts.get(a[i]) + 1)
    }
    console.log(counts)
  }
  
  function stretch(s, n) {
    return s.split("").join(".".repeat(n))
  }
  
  {
    const p1 = proportion("USLLMMBEEFQWECSZTGAOMPGCATEUSEILFVKWJSAXGZS", "XVAAWWNRRTLCRSVHJUPZWEUSPJRXVRYATBFCOVPDUHV", 20)
    console.log(p1)
    const p2 = proportion("XVAAWWNRRTLCRSVHJUPZWEUSPJRXVRYATBFCOVPDUHV", "JGWWHHXVVQMIVYGELTCPHSTYCLVJGVKWQUNIAGCOTEG", 20)
    console.log(p2)
    const p3 = proportion("USLLMMBEEFQWECSZTGAOMPGCATEUSEILFVKWJSAXGZS", "JGWWHHXVVQMIVYGELTCPHSTYCLVJGVKWQUNIAGCOTEG", 20)
    console.log(p3)
  
    console.log(stretch(p1[1], 2))
    console.log(stretch(p2[1], 1).padStart(14, " "))
  }
  
  {
    const a = "LHJJTYZLDXZHY"
    const b = "PGZZIJFPKEFGJ"
    const y = "DVBBOWTDXSTVW"
    const d = "DFGOOBD"
    const e = "TAUEEDT"
    const ab = proportion(a, b, 5)
    const ay = proportion(a, y, 5)
    const by = proportion(b, y, 5)
    const de = proportion(d, e, 5)
    console.log(ab)
    console.log(ay)
    console.log(by)
    console.log(de)
  }
  
  function nth2(s, n) {
    const nth = []
    const length = s.length
    for (var i = 0; i < length; i++) {
      console.log(i, s)
      nth.push(s[0])
      s = s.substring(1).shift(n - 1)
    }
    return nth.join("")
  }
  
  function nth(s, n) {
    const nth = []
    for (var i = 0, j = 0; i < s.length; i++, j+=n) {
      // console.log(i, j % s.length)
      // s = s.substring(1).shift(n - 1)
      nth.push(s[j % s.length])
    }
    return nth.join("")
  }
  
  {
    console.log(nth(az26,2))
    console.log(nth("OMAZWPHCEISRYVKGBFUNTXQJDL",17))
    // OFELBCDGHJKPQVWXYZTRANSMUI
    console.log(ABC.key("TRANSMUTATIONOFELEMENTS", az26))
    // TRANSMUIOFELBCDGHJKPQVWXYZ
    for (var i = 0; i < az26.length; i++) {
      console.log(Vigenere.decrypt("USLLMMBEEFQWECSZTGAOMPGCATEUSEILFVKWJSAXGZS", nth("OMAZWPHCEISRYVKGBFUNTXQJDL", i), "OMAZWPHCEISRYVKGBFUNTXQJDL"))
    }
    console.log(Vigenere.encrypt("UNFORTUNATELYTHEEYEGLYPHSREMAINUNDECIPHERED", "OFELBCDGHJKPQVWXYZTRANSMUI", "OMAZWPHCEISRYVKGBFUNTXQJDL"))
  }
  
  {
    const ct = "NDXYY UYCKU SQYJ VHK AM VZHPP LPNRL HIJ LIN FAYF GMKUU YUWXY PMO AERXBK JCL FFKHHP WJA UXGSS TSONT UFFC LIN MLM FJCQQ BQVWB VID FONYCAC IARLL PLGHP NVDB D IEO COD JWBH TYO".replaceAll(" ","")
    for (var i = 0; i < 26; i++) {
      const k = "CNWOVGFIHKRDZMXJAPUSQLYTBE"
      // console.log(nth("CNWOVGFIHKRDZMXJAPUSQLYTBE".shift(j), i))
      console.log(Vigenere.decrypt(ct, nth(k, i), k))
    }
  }

  {
    // https://discord.com/channels/453998283174576133/817530812454010910/1132530874454376498
    const ct = "NDXYY UYCKU SQYJ VHK AM VZHPP LPNRL HIJ LIN FAYF GMKUU YUWXY PMO AERXBK JCL FFKHHP WJA UXGSS TSONT UFFC LIN MLM FJCQQ BQVWB VID FONYCAC IARLL PLGHP NVDB D IEO COD JWBH TYO".replaceAll(" ","")
    ct.isomorphs(7).forEach(v => console.log(v.pattern()))
    counts(ct.isomorphs(7).map(v => v.pattern()))
  
    const isomorphs = []
    for (const i of [0,3,4,6,7,10]) {
      isomorphs.push(ct.slice(ct.isomorphs(7)[i].isomorph[0].i - 3, ct.isomorphs(7)[i].isomorph[6].i + 1))
    }
    console.log(isomorphs)
  
    const props = [
      proportion(isomorphs[0], isomorphs[1]),
      proportion(isomorphs[0], isomorphs[2]),
      proportion(isomorphs[0], isomorphs[3]),
      proportion(isomorphs[0], isomorphs[4]),
      proportion(isomorphs[0], isomorphs[5]),
      proportion(isomorphs[1], isomorphs[2]),
      proportion(isomorphs[1], isomorphs[3]),
      proportion(isomorphs[1], isomorphs[4]),
      proportion(isomorphs[1], isomorphs[5]),
      proportion(isomorphs[2], isomorphs[3]),
      proportion(isomorphs[2], isomorphs[4]),
      proportion(isomorphs[2], isomorphs[5]),
      proportion(isomorphs[3], isomorphs[4]),
      proportion(isomorphs[3], isomorphs[5]),
      proportion(isomorphs[4], isomorphs[5])
    ]
    console.log(props)
  
    console.log(props[0].map(v => stretch(v, 13)))
    console.log(props[2].map(v => stretch(v, 1)))
    console.log(props[6].map(v => stretch(v, 0)))

    console.log(props[12].map(v => stretch(v, 1)))
    console.log(props[13].map(v => stretch(v, 5)))
    console.log(props[14].map(v => stretch(v, 1)))
  }

  {
    const az = ABC.key("CRYPTOGRAPHY", az26)
    console.log(az)
    const ct = Vigenere.encrypt("THE CHAINING OF THIS AND THE CHAINING OF THAT NOW I WANT TO THE CHAINING OF FOR EVERYTHING WITH THE CHAINING OF FOR THE WIN", az.shift(10), az).replaceAll(" ","")
    console.log(ct)

    console.log(ct.isomorphs(14))
    const isomorphs = []
    for (const i of [0,3,10,14]) {
      isomorphs.push(ct.isomorphs(14)[i].s.join(""))
    }
    console.log(isomorphs)

    const chains = [
        proportion(isomorphs[0], isomorphs[1]),
        proportion(isomorphs[0], isomorphs[2]),
        proportion(isomorphs[0], isomorphs[3]),
        proportion(isomorphs[1], isomorphs[2]),
        proportion(isomorphs[1], isomorphs[3]),
        proportion(isomorphs[2], isomorphs[3]),
      ]
      console.log(chains)
  }

  {
    const eyes = decode()
    const isomorphs = []
    isomorphs.push(eyes[0].isomorphs(9)[1].s.join(""))
    isomorphs.push(eyes[0].isomorphs(9)[2].s.join(""))
    isomorphs.push(eyes[1].isomorphs(9)[2].s.join(""))
    isomorphs.push(eyes[2].isomorphs(9)[1].s.join(""))
    isomorphs.push(eyes[2].isomorphs(9)[2].s.join(""))
    console.log(isomorphs)

    const chains = [
      proportion(isomorphs[0], isomorphs[1]),
      proportion(isomorphs[0], isomorphs[2]),
      proportion(isomorphs[0], isomorphs[3]),
      proportion(isomorphs[0], isomorphs[4]),
      proportion(isomorphs[1], isomorphs[2]),
      proportion(isomorphs[1], isomorphs[3]),
      proportion(isomorphs[1], isomorphs[4]),
      proportion(isomorphs[2], isomorphs[3]),
      proportion(isomorphs[2], isomorphs[4]),
      proportion(isomorphs[3], isomorphs[4]),
    ]
    console.log(chains)
  }
  
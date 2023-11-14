// https://www.ahazu.com/papers/lanaki/lesson11.php
String.prototype.indexes = function(chars) {
    const indexes = new Map()
    for (var i = 0; i < this.length; i++) {
      const c1 = this[i]
      for (const c2 of chars) {
        if (c1 === c2) {
          if (!indexes.has(c1)) { indexes.set(c1, []) }
          indexes.get(c1).push(i)
        }
      }
    }
    return indexes
  }
  
  Array.range = function(start, stop, step = 1) {
    return Array.from({ length: (stop - start) / step + 1 }, (v, i) => start + i * step)
  }
  
  function differences(a) {
    console.log("differences", a)
    const differences = new Counts()
    for (var i = 0; i < a.length; i++) {
      for (var j = 0; j < i; j++) {
        for (const f of [...factors((a[i] - a[j]))])
        differences.add(f)
      }
    }
    return differences
  }
  
  ABC.differences = function(ct, range, az = az26) {
    const table = new Map()
    for (const c of az) {
      const indexes = ct.indexes(az26).get(c)
      if (!indexes) { continue }
  
      const d = differences(indexes)
      console.log("d", d)
      for (const n of range) {
        if (!table.has(c)) { table.set(c, []) }
        table.get(c).push(d.get(n) ?? 0)
      }
    }
    return { ct:ct, range:range, az:az, table:table }
  }
  
  ABC.period = function(differences) {
    const counts = new Counts()
    for (const i of differences.range) {
      for (const d of differences.table) {
        counts.add(i, d[1][i - differences.range[0]])
      }
    }
    return Array.from(counts.map).map(v => [v[0], v[0] * v[1]]).sort((a,b) => b[1] - a[1])
  }
  
  {
    const ct = "RNQJH AUKGV WGIVO BBSEJ CRYUS FMQLP OFTLC MRHKB BUTNA WXZQS NFWLM OHYOF VMKTV HKVPK KSWEI TGSRB LNAGJ BFLAM EAEJW WVGZG SVLBK IXHGT JKYUC HLKTU MWWK".filter()
    console.log("indexes", ct.indexes(az26))
    console.log("B", differences(ct.indexes(az26).get("B")))
    console.log("X", differences(ct.indexes(az26).get("X")))
    console.log("Z", differences(ct.indexes(az26).get("Z")))
    const d = ABC.differences(ct, Array.range(3,13), az26)
    console.log(d)
    console.log(ABC.period(d))
  
    console.log(ct.ic(3, 15))
    console.log(new Kasiski(ct).key(7))
    console.log(Chi.key(ct, 7))
    console.log(Monograms.key(ct, 7))
  }
  
  {
    const ct = "BGZEY DKFWK BZVRM LUNYB QNUKA YCRYB GWMKC DDTSP OFIAK OWWHM RFBLJ JQFRM PNIQA VQCUP IFLAZ HKATJ UVVQE EKESZ DUDWE KKESL IZQAT SBYUZ UUVAZ IXYEZ JFTAJ EMRAS QKZSQ FOPHM W".filter()
    console.log(ct.ic(3,15))
    const d = ABC.differences(ct, Array.range(3,13), az26)
    console.log(d)
    console.log("period", ABC.period(d))
    console.log(ct.ic(3,15))
  }
  
  {
    const ct = "pldaziqhaoyd9qfw79xxjj1uwamgxhaphkltv45cq".toUpperCase()
    console.log(ct.ic(3,15))
    const d = ABC.differences(ct, Array.range(3,13), az26)
    console.log(d)
    console.log("period", ABC.period(d))
  }

  {
    console.log("trigraphs")
      const trigraphs = new Map()
  
      for (const message of messages) {
        const trigrams = message.ngrams(3,1)
        for (var i = 0; i < trigrams.length; i++) {
            const trigram = trigrams[i]
            const l = trigram.s[1]
            // console.log(trigram, l)
            
            if (!trigraphs.has(l)) { trigraphs.set(l, []) }
            for (j = 0; j < trigram.indexes.size; j++) {
                trigraphs.get(l).push(trigram.s[0] + trigram.s[2])
            }
        }
      }
  
      console.log(Array.from(trigraphs).sort((a,b) => b[1].length - a[1].length))
  
      // console.log(Vigenere.decrypt("XVIGWCKIXM", "TRECSYGETI"))
      console.log(Vigenere.decrypt("TRECSYGETI", "VVVVVVVVVV"))
  }
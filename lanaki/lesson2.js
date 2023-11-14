
{
    const ct = "OWQWZ AEDTD QHHOB AWFTZ WODEQ TUWRQ BDQRO XHQDA GTBDH PZRDK"
    console.log(ct.frequencies())
    console.log(ct.frequencies().ic())
    console.log(ct.frequencies().ic_normalized())
}

// TODO SHERLAC METHOD

{
    const ct = "SFDZF  IOGHL  PZFGZ  DYSPF  HBZDS  GVHTF  UPLVD  FGYVJ  VFVHT GADZZ  AITYD  ZYFZJ  ZTGPT  VTZBD  VFHTZ  DFXSB  GIDZY  VTXOI YVTEF  VMGZZ  THLLV  XZDFM  HTZAI  TYDZY  BDVFH  TZDFK  ZDZZJ SXISG  ZYGAV  FSLGZ  DTHHT  CDZRS  VTYZD  OZFFH  TZAIT  YDZYG AVDGZ  ZTKHI  TYZYS  DZGHU  ZFZTG  UPGDI  XWGHX  ASRUZ  DFUID EGHTV  EAGXX".filter()
    const freq = ct.frequencies()
    console.log(freq.ic())
    console.log(freq.ic_normalized())
    console.log(Monograms.fitness(ct))

    console.log(ct.ngrams(2,4))
    console.log(ct.ngrams(3,3))
    console.log(ct.ngrams(4,3))
    console.log(ct.ngrams(8,3))
    console.log(ct.ngrams(9,2))
    console.log(ct.ngrams(10,2))

    const trigrams = ct.ngrams(3,1)
    const trigraphs = new Map()

    for (var i = 0; i < trigrams.length; i++) {
        const trigram = trigrams[i]
        const l = trigram.s[1]
        console.log(trigram, l)
        
        if (!trigraphs.has(l)) { trigraphs.set(l, []) }
        for (j = 0; j < trigram.indexes.size; j++) {
            trigraphs.get(l).push(trigram.s[0] + trigram.s[2])
        }
    }
    console.log(Array.from(trigraphs).sort((a,b) => b[1].length - a[1].length))
}

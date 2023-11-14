// 7.7
const key = function(ct, length, az = az26) {
    const key = []
    for (var i = 0; i < length; i++) {
        const ct_nth = ct.substring(i).nth(length)
        // const ct5 = ct8.substring(1).nth(5)
        const fitnesses = []
        for (var c of az) {
            fitnesses.push({ c:c, fitness:Monograms.fitness(Vigenere.decrypt(ct_nth, c, az)) })
        }
        const sorted = fitnesses.sort((a,b) => b.fitness - a.fitness || isNaN(b.fitness)-isNaN(a.fitness))
        // console.log(sorted)
        key.push(sorted[0].c)
    }
    return key.join("")
}

{
    const ct = "KIOVIEEIGKIOVNURNVJNUVKHVMGZIA"
    console.log(ct.ngrams(2, 2))
    console.log(ct.ngrams(4, 2))

    console.log(Kappa.periodic([ct]))

    console.log(key(ct, 3))
    console.log(Chi.key(ct, 3))
    console.log(new Kasiski(ct).key(3))

    console.log(Vigenere.decrypt(ct, "RUC"))
}

// Solving cipher problems - Frank Lewis
{
    const ct = "YXAUSX PYYONXFT APFX THOGUVSX GRUC AUSXT NPCWHNGOCZ THFIXOSSU CNX. JPAUC YPSSPJXF OZCPFXW VL AUCL NFOAOCUST.".filter()
    console.log(ct)
    console.log(ct.ngrams(2,2))
    console.log(ct.ngrams(3,2))
    console.log(ct.ngrams(4,2))
    console.log(ct.ngrams(5,2))
}

{
    const ct = "EQGDIFPP WKCGP MQ TGNFPMTDCMF WQNFIMA WQKTETFP".filter()
    console.log(Substitution.decrypt(ct, "WPSZFECAYHQOJMTIRUXBKLDGNV", "VWPSZFECAYHQOJMTIRUXBKLDGN"))
    console.log(Substitution.decrypt(ct, "hzagcenkrjlytvwsoumibfpdqx".toUpperCase(), az26))
}

{
    const ct = "ZIXGH XUNCZ ERNQI EJU ZIYICZ' URNQIZ".filter()
    const az = "VWPSZFECAYHQOJMTIRUXBKLDGN"
    for (var i = 0; i < az.length; i++) {
        const az_i = az.shift(i)
        console.log(az_i, Substitution.decrypt(ct, az, az_i))
    }
}

{
    const ct ="GFOGTFED XGOZPT XFEOO KEMVFETM KPC XACIEIGO".filter()
    console.log(Substitution.decrypt(ct, "VWPSZFECAYHQOJMTIRUXBKLDGN", "IRUXBKLDGNVWPSZFECAYHQOJMT"))
    console.log(Substitution.decrypt(ct, "exrcitazvjfqgdloypunkhwsbm".toUpperCase(), az26))
}

{
     const ct = "BILMN OGOIN ZFAIC SYJKN HJXGM ZIJPM ZPETM NMKST IYSVJ OOIOZ TIKZT IWFFY FVNVJ NEBFG VNUGO ZTJAI ZFNYM KLRYF HJZIJ QGW".filter()
     console.log(Substitution.decrypt(ct, "vwxzyoumeankidsbcfghjlpqrt".toUpperCase(), az26))
}

{
    const ct = "ONTJKGMOABCEJKMNFTGTQGBLANOKXQSPEWKGPCPWWBXFNBMWLAACTEONTWBLOBJUPYPXONTSFTGTRBXMKETGTEOBBYGTRKBLMOBQTTIYBGOTE"
    console.log(ct.ngrams(2,2))
    console.log(ct.ngrams(3,2))
    console.log(ct.ngrams(4,2))
    console.log(Substitution.decrypt(ct, "golvdwrkxfiushtabcyejzmnpq".toUpperCase(), az26))
}

{
    const ct = "ABCDEFGHHI J KELHM CGNOBC OGPB NOB QLF EQ DEHPJFX G SBIKECM".filter()
    console.log(Substitution.decrypt(ct, "personalyiwudthvfckzjmqgxb".toUpperCase(), az26))
    
}

// TODO Use ngram offset gcf to determine key length for polyalphabetic ciphers
{
    const ct = "WBFWX LWVPY WICQJ HJYDL LNABF JCQFB BHMPA XGKIU CRHVK YNEJO VMDEJ SPQPT GLFFB YOEYD MIHYY JJCPY YDVIE TOFXX LWPSC YTBKJ ORCYZ DBYDH YHR".filter()
    console.log(ct.ngrams(2,2))
    console.log(ct.ngrams(3,2))
    console.log(ct.ngrams(4,2))
    console.log(ct.ic(3,25))
    console.log(Kappa.periodic([ct], 1, 100))
    console.log(Kappa.autocorrelation([ct], 1, 100))
    console.log(Kappa.positional([ct]))

    const hint = "ILEANDTHENREPLIED"
    console.log(hint.ngrams(2,2))
    console.log(hint.ngrams(3,2))
    console.log(hint.ic(3,25))

    console.log(key(ct, 17))
    console.log(Chi.key(ct, 17))
    console.log(new Kasiski(ct).key(17))

    console.log(hint.isomorphs(16).map(v => v.pattern()))
    console.log(ct.isomorphs(16).map(v => v.pattern()))

    // console.log(Isomorphs.shared([ct.isomorphs(15)])[0].map(v => v.pattern()))

    console.log(Isomorphs.shared([hint.isomorphs(8), ct.isomorphs(8)])[0].map(v => v.pattern()))
}

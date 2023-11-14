{
    console.log(Caesar.encrypt("JULIUS", 3))
    console.log(Caesar.decrypt("MXOLXV", 3))
    console.log(Caesar.encrypt("AUGUSTUS", 1))
    console.log(Caesar.decrypt("ZLEAPSSH", 7))
    console.log(Caesar.decrypt("SQJE", az26.indexOf("Q")))
    console.log(Caesar.decrypt("SLEEP", az26.indexOf("R")))
    console.log(Caesar.decrypt("PXPBEEFXXMTMFBWGBZAM", -7))
    console.log(Caesar.decrypt("PXPBEEFXXMTMFBWGBZAM", 19))
}

// 1.3
{
    const ct = "YPYHNBCMMBILNGYMMUAYXIYMHINLYGUCHMYWLYNZILFIHA"
    console.log(Chi.key(ct, 1))
    console.log(Caesar.decrypt(ct, az26.indexOf("U")))
}

{
    const ct = "ZUSGQKGVXUVKXYKTZKTIKKBKXERKZZKXSAYZVRGEOZYVXUVKXXURK"
    console.log(Chi.key(ct, 1))
    console.log(Caesar.decrypt(ct, az26.indexOf("G")))
}

{
    const ct = "MVIPWVNJVTIVKDVJJRXVJTREJLIMZMVNYVERKKRTBVUSPWIVHLVETPRERCPJZJ"
    console.log(Chi.key(ct, 1))
    console.log(Caesar.decrypt(ct, az26.indexOf("R")))
}

{
    const ct = "HDBIHDYHDBSMUHIYEHLIHZEDDSXQHOHDBKHVODDOBCHSXHDROHWOCCKQO"
    console.log(new Frequencies(ct).substitute())
    console.log(Chi.key(ct, 1))
    console.log(Caesar.decrypt(ct, az26.indexOf("Q")))
    for (const c of az26) {
        const pt = Caesar.decrypt(ct, az26.indexOf(c))
        console.log(c, pt, Monograms.fitness(pt))
    }
}

// 1.4
{
    const ct = "ZWUMPIAAMDMVPQTTA"
    const shifts = Linquist.slide(ct)
    console.log(shifts)
    for (const shift of shifts) {
        const pt = Caesar.decrypt(ct, shift)
        console.log(pt, Monograms.fitness(pt))
    }
}

{
    const ct = "WZRVMZOCSDYZNGAHVMXC"
    const shifts = Linquist.slide(ct)
    console.log(shifts)
    for (const shift of shifts) {
        const pt = Caesar.decrypt(ct, shift)
        console.log(pt, Monograms.fitness(pt))
    }
}

// 1.7
{
    const ct = "MDEHVRSNQNRQNVPHDHXHVXNPRQNZP"
    const az = "ABCDEFGHILMNOPQRSTUVXZ"
    const shifts = Linquist.slide(ct, az)
    console.log(shifts)
    for (const shift of shifts) {
        const pt = Caesar.decrypt(ct, shift, az)
        console.log(pt, Monograms.fitness(pt))
    }
}

{
    const ct = "DHVIVBZYVAOZMNJHZRJMMTOJNJGQZOCZHZNNVBZVIYQZMTAZROCDIBNDIVAOZMGDAZBVQZHZVNHPXCKGZVNPMZVNYDYOCZPIMVQZGDIBJAOCVOXJYZCVMMTCJPYDID"
    const shifts = Linquist.slide(ct)
    console.log(shifts)
    for (const shift of shifts) {
        const pt = Caesar.decrypt(ct, shift)
        console.log(pt, Monograms.fitness(pt))
    }
}

{
    const ct = "W LWNWCNWLD SEPD JK AO EO ZEBBEYQHP PK YKJOPNQYP WJZ YKJBQOEJC PK YNULPWJWHUV".replaceAll(" ", "")
    const shifts = Linquist.slide(ct)
    console.log(shifts)
    for (const shift of shifts) {
        const pt = Caesar.decrypt(ct, shift)
        console.log(pt, Monograms.fitness(pt))
    }
}

{
    const ct = "GDQDIB JM IJO GDQDIB OCVO DN RCVO D VNF DA ODN V NOVHK JA CJIJPM OJ NPWHDO OJ NGDIBN VIY VMMJRN RVAOY PN WT DGG RDIYN JM WMVIYDNC VMHN VB VDINO V AGJJY JA VAAGDXODJIN RCDXC WT JPM JKKJNDODJI DN NPWYPY YTDIB YMJRNDIB RVFDIB IJO".replaceAll(" ", "")
    const shifts = Linquist.slide(ct)
    console.log(shifts)
    for (const shift of shifts) {
        const pt = Caesar.decrypt(ct, shift)
        console.log(pt, Monograms.fitness(pt))
    }
}

{
    const ct = "ETTLX AIXWL AWRUW RQIXE KA(WR BAABE TTLXE LLXAN AWMER GPNQM PACLQ ZYALL WRYMQ QR)WM MARLW RPXWE TRQ1D GCQTI ADDLX ATWOK WBWRR Q2WML XACQK RLANP ENLIX WCXNA RBANM LXAQL XANJW MWDTA GDIAL LWRYL XAPEP ANIWL XEZWR ADNKM XEZLA NLXAZ WNMLX EMDAA RKMAB ERBWM BNG".replaceAll(" ", "")
    const az = az26.reverse()
    for (var i = 0; i < az.length; i++) {
        const pt = Substitution.decrypt(ct, az26, az.shift(i))
        console.log(az.shift(i), pt, Monograms.fitness(pt))
    }
}
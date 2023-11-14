// 5.1
{
    console.log(Linear.az(21, 0))
    console.log(Linear.az(7, 9))

    console.log(ABC.key("COLLEGE"))
    console.log(Substitution.encrypt("UNIVERSITY", az26, ABC.key("COLLEGE")))
    
    console.log(ABC.key("COLLEGE", ABC.shift(az26, "P")))
    const az = ABC.key("COLLEGE", az26).shift(-az26.indexOf("P"))
    console.log(az)
    console.log(Substitution.encrypt("UNIVERSITY", az26, az))
}

// 5.2
{
    const k = "COLEG"
    console.log(ABC.key(k).step(k.length))
    console.log(ABC.mixed("COLLEGE"))
}

{
    console.log(Substitution.encrypt("CRYPTOLOGY", az26, ABC.mixed("SECRET")))
    console.log(Substitution.decrypt("DPCRD JPUTI", az26, ABC.mixed("HOMOPHONE")))
    console.log(Substitution.decrypt("COACH SHOHS EU", az26, ABC.mixed("DIRECT")))
}

// 5.5
{
    const ct = "KNHHXKK QS PXTDQSB YQFJ NSISCYS HQEJXUK QK LXTKNUXP AO FJXKX RCNU FJQSBK QS FJX CUPXU STLXP EXUKXVXUTSHX HTUXRND LXFJCPK CR TSTDOKQK QSFNQFQCS DNHI FJX TAQDQFO TF DXTKF FC UXTP FJX DTSBNTBX CR FJX CUQBQSTD QK VXUO PXKQUTADX ANF SCF XKKXSFQTD".replaceAll(" ", "")
    console.log(new Frequencies(ct).substitute())
}

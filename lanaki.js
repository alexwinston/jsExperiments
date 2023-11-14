
// Lanaki - Lesson 10
{
    console.log(Quagmire.encrypt("MYCOURSEZEROTHREEZEROATTHIRTEENTHIRTYTHREE", "RED", az26, ABC.key("PENCILS")))
  
    const ct = "IZGSVPFLBWRXGBPWLBWRXRUNZDPGLJLUOPRNOUODLJ"
    console.log(ct.ngrams(5, 2))
    console.log(ct.ngrams(2, 2))
  
    console.log(ct.ic(2,10))
  
    console.log(Chi.key(ct, 3))
    const kt = new Kasiski(ct)
    console.log(kt.key(3))
    console.log(Quagmire.decrypt(ct, "RED", az26, ABC.key("PENCILS")))
  }
  
  {
    console.log(ABC.step(az26, 1))
    console.log(ABC.step(az26, 3))
    console.log(ABC.step(az26, 5))
    console.log(ABC.step(az26, 7))
    console.log(ABC.step(az26, 9))
    console.log(ABC.step(az26, 11))
    console.log(az26.step(11))
    console.log(ABC.step(az26, 12))
    console.log(az26.step(12))
  }
  
  {
    const pt = "THEQUAGONEISAPERIODICCIPHERWITHAKEYEDPLAINALPHABETRUNAGAINSTASTRAIGHTCIPHERALPHABET"
    console.log(Quagmire.encrypt(pt, "WCFNVI", ABC.key("SPRINGFEVER"), az26))
    const ct = "QPMGQ RBUJU YIFDM PYAIF QYYJJ JHJYC JLUUT PIDVW YMFSG AESDW HIZRB LIRVC FCZPE LBPZY YJJJH WLJJL PUP"
    console.log(Quagmire.decrypt(ct, "WCFNVI", ABC.key("SPRINGFEVER"), az26))
  }
  
  {
    const pt = "INTHEQ UAGTWO ASTRAI GHTPLA INALPH ABETIS RUNAGA INSTAK EYEDCI PHERAL PHABET"
    console.log(Quagmire.encrypt(pt, "FLOWER", az26, ABC.key("SPRINGFEVER")))
  }
  
  {
    const pt = "THISONEEMPLOYSTHREEKEYWORDS"
    console.log(Quagmire.encrypt(pt, "EXTRA", ABC.key("SENSORY"), ABC.key("PERCEPTION")))
  }
  
  // Lanaki - Lesson 11
  {
    const ct = "BGZEY DKFWK BZVRM LUNYB QNUKA YCRYB GWMKC DDTSP OFIAK OWWHM RFBLJ JQFRM PNIQA VQCUP IFLAZ HKATJ UVVQE EKESZ DUDWE KKESL IZQAT SBYUZ UUVAZ  IXYEZ JFTAJ EMRAS QKZSQ FOPHM W".replaceAll(" ", "")
    console.log(ct)
    console.log(ct.ngrams(2,2))
    console.log(ct.ngrams(3,2))
  }
  
  {
    console.log(messages[0].chunk(26).join("\n"))
    console.log(Vigenere.decrypt("TIQEWXQTOJIV", "SENDSUPPLIES"))
  }
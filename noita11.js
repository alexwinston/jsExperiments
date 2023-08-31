const defaultDigitsMul = 13;
const defaultDigitsAdd = 3;
const defaultUppercaseMul = 17;
const defaultUppercaseAdd = 5;
const defaultLowercaseMul = 19;
const defaultLowercaseAdd = 7;
let digitsMul;
let digitsAdd;
let uppercaseMul;
let uppercaseAdd;
let lowercaseMul;
let lowercaseAdd;

digitsMul = defaultDigitsMul;
  digitsAdd = defaultDigitsAdd;
  uppercaseMul = defaultUppercaseMul;
  uppercaseAdd = defaultUppercaseAdd;
  lowercaseMul = defaultLowercaseMul;
  lowercaseAdd = defaultLowercaseAdd;

function convert(s, func) {
//   const original = document.getElementById('text').value;
  let converted = '';
  for (let i = 0; i < s.length; i++) {
    const char = s.charCodeAt(i);
    if (char >= 48 && char <= 57) {
      converted += String.fromCharCode(func(char, 48, 10, digitsMul, digitsAdd));
    } else if (char >= 65 && char <= 90) {
      converted += String.fromCharCode(func(char, 65, 26, uppercaseMul, uppercaseAdd));
    } else if (char >= 97 && char <= 122) {
      converted += String.fromCharCode(func(char, 97, 26, lowercaseMul, lowercaseAdd));
    } else {
      converted += String.fromCharCode(char);
    }
  }
  return converted;
};

function encipher(char, alphabetBeginning, alphabetLength, coefficient, constant) {
  return (((char - alphabetBeginning) * coefficient + constant) % alphabetLength) + alphabetBeginning;
};

function decipher(char, alphabetBeginning, alphabetLength, coefficient, constant) {
  let i = char - alphabetBeginning - constant;
  while (i < 0) {
    i += alphabetLength;
  }
  while (i % coefficient !== 0) {
    i += alphabetLength;
  }
  return i / coefficient + alphabetBeginning;
};

console.log(convert("BTest2", encipher))
console.log(convert("FQfle9", decipher))

/**
 * 
 * CONSOLE SECTION
 * 
 */

const dict = 
{
    "A" : 0,    "B" : 1,    "C" : 2,    "D" : 3,    "E" : 4,    "F" : 5,
    "G" : 6,    "H" : 7,    "I" : 8,    "J" : 9,    "K" : 10,   "L" : 11,
    "M" : 12,   "N" : 13,   "O" : 14,   "P" : 15,   "Q" : 16,   "R" : 17,
    "S" : 18,   "T" : 19,   "U" : 20,   "V" : 21,   "W" : 22,   "X" : 23,
    "Y" : 24,   "Z" : 25,   "0" : 26,   "1" : 27,   "2" : 28,   "3" : 29,
    "4" : 30,   "5" : 31,   "6" : 32,   "7" : 33,   "8" : 34,   "9" : 35,
    "a" : 36,   " " : 37
}

// module calculation
var modulo = Object.keys(dict).length ;


const diacritics =
{
    "Ě" : "E",    "Š" : "S",    "Č" : "C",     "Ř" : "R",    "Ž" : "Z",   "Ý" : "Y",
    "Á" : "A",    "Í" : "I",    "É" : "E",     "Ó" : "O",    "Ů" : "U",   "Ú" : "U",
    "Ť" : "T",    "Ď" : "D",    "Ň" : "N"
}

// array
let decryptText;

// GCD function... check Greatest Common Divider (nejvetsi spolecny delitel)
function gcd(a, b){
    if(b){
        return gcd(b, a % b);
    } else {
        return Math.abs(a);
    }
}

const a = Number(17)
const b = Number(31)

/**
 * 
 * ENCRYPT SECTION
 * 
 * 
 */
function encrypt(s) {
    let cipherText = [];

    // user text 
    let input = s;
        // set user text to upper case 
        // input = input.toUpperCase();
    
    // user key
    // let a = Number(5);
    // let b = Number(11);
        // print key A and B in console
        console.log("%cYOUR KEY IS A:" + a + " B:" + b," color: #DA70D6; font-weight: bold;")

    if(a == "" || b == "" || input == "" || gcd(a, modulo) != "1"){
        if(gcd(a, modulo) != "1") {
            console.log("USE ONE OF THE NUMBERS FOR KEY A:\n 5, 7, 11, 13, 17, 19, 23, 25, 29, 31");
        }
        else {
            console.log("ENTER ALL REQUIRED FIELDS!");
        }
    }
    else {

        for(var i = 0; i < input.length; i++){

            // if(input[i] == " "){
            //     input = input.replace(/\s/g,"XMEZERAX");
            // }

            if(input[i] in diacritics){
                var change = (input[i], diacritics[input[i]]);
                    input = input.replace(input[i], change);     
               }

            if(input[i] in dict){
                var x = (input[i], dict[input[i]]);

                var mod = ((a * x) + b)%modulo;
                const crypted = Object.keys(dict).find(crypted => dict[crypted] === mod);

                // add crypted element to array
                cipherText.push(crypted);

                    // console section (print in console)
                    console.groupCollapsed(
                        "%cINPUT CHARACTER: " + input[i],
                        "color: #228B22 ; font-weight: bold;"
                    );
                        console.log("------------------------------------------")
                        console.log("INPUT CHARACTER: " + input[i]);
                        console.log("POSITION OF CHARACTER: " + x);
                        console.log("NEW POSITION: " + mod);
                        console.log("NEW CRYPTED CHARACTER: " + crypted);
                        console.log("------------------------------------------")

                        console.groupEnd();
            }
            else {
                cipherText.push();
                console.log("%cCHARACTER HAS BEEN REMOVED: " + input[i],"color: #DC143C; font-weight: bold;")
            }
        }

        // rank 5 elements
        const ct = [];
        var counter = 5;
        for(var i = 0; i < cipherText.length; i++) {
            
            // if(i == counter){
            //     ct.push(" ");
            //     counter = counter + 5;
            // }
            ct.push(cipherText[i]);
         
        }
        // print crypted text in html page
        // document.getElementById("output").innerHTML = ct.join("");
            // print crypted text in console
            console.log("%cCRYPTED TEXT: "+ ct.join(""), "color: #DAA520;");
            return ct.join("")
    }
}

/**
 * 
 * DECRYPT SECTION
 * 
 * 
 */

function decrypt(s){
    let cipherText = [];

    // user text
    let input = s;
        // set user text to upper case
        // input = input.toUpperCase();
    
    // user key
    // let a = 5;
    // let b = 11;
        // print key in console
        console.log("%cYOUR KEY IS A:" + a + " B:" + b," color: #DA70D6; font-weight: bold;")

    if(a == "" || b == "" || input == "" || gcd(a, modulo) != "1"){
        if(gcd(a, modulo) != "1") {
            console.log("USE ONE OF THE NUMBERS FOR KEY A:\n 5, 7, 11, 13, 17, 19, 23, 25, 29, 31");
        }
        else {
            console.log("ENTER ALL REQUIRED FIELDS!");
        }
    }
    else {

        // inverse module
        for(var i = 0; i < 100; i++){

            var result = (a * i)%modulo;

            if(result == 1){
                var inversion = i;
                    console.log("%cINVERSE MODULE: " + inversion , "color: #DA70D6; font-weight: bold;");
                break
            }
        }

        // main decrypt loop
        for( var j = 0; j < input.length; j++){

            // inputs must be in dictionary
            // if(input[j] in dict || input[j] === " "){
            if(input[j] in dict){

                // clears gaps
                // if(input[j] === " "){
                //     input.replace(/\s/g,"");   
                // }
                // else 
                {

                    // position of index in dictionary
                    var y = (input[j], dict[input[j]]);
        
                    // decrypt equation
                    var equation = inversion * (y -b);
        
                    // if equation is less than 0 will make positive value
                    if(equation < 0){
                        for(var i = 0; equation < modulo; i++){
                            equation = equation + modulo;
                        }
                    }
        
                    // result of decrypt equation
                    var mod = equation%modulo;
                    
                    // find elemnt by key in dictionary
                    const crypted = Object.keys(dict).find(crypted=> dict[crypted] === mod);
        
                    // add element to array
                    cipherText.push(crypted);
        
                    // set array to string
                    decryptText = cipherText.join("");
        
                        // console section (print in console)
                        console.groupCollapsed(
                            "%cINPUT CHARACTER: " + input[j],
                            "color: #228B22; font-weight: bold;"
                        );
                        console.log("------------------------------------------")
                        console.log("INPUT CHARACTER: " + input[j]);
                        console.log("POSITION OF CHARACTER: " + y);
                        console.log("NEW POSITION: " + mod);
                        console.log("NEW CRYPTED CHARACTER: " + crypted);
                        console.log("------------------------------------------")  
                        console.groupEnd();      
                }

                    
                // replace all gaps from string
                // decryptText = decryptText.replace(/XMEZERAX/g, " ");
                console.log("DECRYPTED", decryptText)
                
                // print decrypt string in html page    
                // document.getElementById('output').innerHTML = decryptText;

            }
            else {
                console.log("%cWRONG CHARACTER: " + input[j], "color: #DC143C; font-weight: bold;");
            }        
        }
    }
}

const t1 = encrypt("CaS a BGOD Ta2aMAN THIS IS AWFUL 1 2 3 4 5 9 ")
// const t1 = encrypt("BGaD")
console.log(t1)
decrypt(t1)
const eyes = decode(10)
console.log(eyes.join(""))

// https://uomustansiriyah.edu.iq/media/lectures/5/5_2021_06_12!05_37_37_PM.pdf
// https://github.com/saraheisa/Hill-Cipher
// https://jayscholar.etown.edu/cgi/viewcontent.cgi?article=1001&context=mathstu
class Hill {

    constructor() {
        this.alphbetics = az83;
        this.n = this.alphbetics.length
        this.key = [
            [this.alphbetics.indexOf("R"), this.alphbetics.indexOf("p"), this.alphbetics.indexOf("D")],
            [this.alphbetics.indexOf("l"), this.alphbetics.indexOf("_"), this.alphbetics.indexOf("B")],
            [this.alphbetics.indexOf(";"), this.alphbetics.indexOf("m"), this.alphbetics.indexOf("A")]
            // [this.alphbetics.indexOf("R"), this.alphbetics.indexOf("l"), this.alphbetics.indexOf(";")],
            // [this.alphbetics.indexOf("p"), this.alphbetics.indexOf("_"), this.alphbetics.indexOf("m")],
            // [this.alphbetics.indexOf("D"), this.alphbetics.indexOf("B"), this.alphbetics.indexOf("A")]
            // [16, 20, 8],
            // [2, 10, 13],
            // [4, 18, 18]
        ]
        this.det = parseInt(this.getDeterminent(this.key))
    }

    getDeterminent(matrix) {
        let x = matrix[0][0] * ((matrix[1][1] * matrix[2][2]) - (matrix[2][1] * matrix[1][2]));
        let y = matrix[0][1] * ((matrix[1][0] * matrix[2][2]) - (matrix[2][0] * matrix[1][2]));
        let z = matrix[0][2] * ((matrix[1][0] * matrix[2][1]) - (matrix[2][0] * matrix[1][1]));
        return (x - y + z);
    }
      
    modularInverse(m, n) {
        let x = m;
        let y = n;
      
        let divs = [];
        let adds = [];
      
        let result;
      
        if (y > x) {
          let i = 1;
          while (x != 0) {
            divs[i] = Math.floor(y / x);
            let temp = x;
            x = y % x;
            y = temp;
            i++;
          }
      
          let len = divs.length;
          adds[len - 1] = 0;
          adds[len - 2] = 1;
          for (let index = len - 2; index > 0; index--) {
            adds[index - 1] = (divs[index] * adds[index]) + adds[index + 1];
          }
      
          if ((adds[0] * m) > (adds[1] * n)) {
            result = adds[0];
          } else {
            result = n - adds[0];
          }
      
        }
      
        return result;
      
    }
      
    inverseMatrix(matrix) {
        let minorMatrix = [
          [0, 0, 0],
          [0, 0, 0],
          [0, 0, 0]
        ];
        for (let i = 0; i < matrix.length; i++) {
          for (let j = 0; j < matrix[i].length; j++) {
      
            minorMatrix[i][j] = (matrix[(i + 1) % 3][(j + 1) % 3] * matrix[(i + 2) % 3][(j + 2) % 3]) - (matrix[(i + 1) % 3][(j + 2) % 3] * matrix[(i + 2) % 3][(j + 1) % 3]);
      
          }
        }
      
        let adjointMatrix = [
          [0, 0, 0],
          [0, 0, 0],
          [0, 0, 0]
        ];
        for (let i = 0; i < minorMatrix.length; i++) {
          for (let j = 0; j < minorMatrix[i].length; j++) {
            adjointMatrix[j][i] = minorMatrix[i][j];
          }
        }
        return adjointMatrix;
    }
      
    multiplyMatrix(a, b) {
        let result = [];
        for (let i = 0; i < a.length; i++) {
          result[i] = 0;
          for (let j = 0; j < a[i].length; j++) {
            result[i] += b[j] * a[i][j];
          }
        }
        return result;
    }
      
    gcd(x, y) {
        x = Math.abs(x);
        y = Math.abs(y);
        while (y) {
          var t = y;
          y = x % y;
          x = t;
        }
        return x;
    }
      
    getRidOfNeg(x, n) {
        while (x < 0) {
          x += n;
        }
        return x;
    }

    checkRelativelyPrime() {

        det = parseInt(getDeterminent(key));
        console.log("det = " + det);
      
        let g = gcd(det, n);
        console.log("gcd = " + g);
      
        if (g == 1) {
          return true;
        } else {
          return false;
        }
    }
      
    encrypt(plain) {
        let cipher = "";
        if (this.alphbetics.indexOf(" ") == -1) {
          plain = plain.split(" ").join("");
        }
      
        for (let index = 0; index < plain.length; index += 3) {
          let x = this.alphbetics.indexOf(plain[index]);
          let y, z;
      
          if (index + 1 == plain.length) {
            y = 0;
            z = 1;
          } else {
            y = this.alphbetics.indexOf(plain[index + 1]);
            if (index + 2 == plain.length) {
              z = 0;
            } else {
              z = this.alphbetics.indexOf(plain[index + 2]);
            }
          }
      
          let res = this.multiplyMatrix(this.key, [x, y, z]);
      
      
          for (let i = 0; i < res.length; i++) {
            if (res[i] < 0) {
              res[i] = this.getRidOfNeg(res[i], n);
            }
            let j = res[i] % this.n;
            cipher += this.alphbetics[j];
          }
        }
        return cipher;
    }
      
    decrypt(cipher) {
        let plain = "";
        let m = this.det;
        if (this.det < 0) {
          m = this.getRidOfNeg(this.det, this.n);
        }
        m = m % this.n;
      
        console.log("n: " + this.n);
      
        console.log("m:  " + m);
      
      
        let modularInv = this.modularInverse(m, this.n);
      
        let matrixInv = this.inverseMatrix(this.key);
      
        console.log(modularInv);
      
      
        for (let index = 0; index < cipher.length; index += 3) {
          let x = this.alphbetics.indexOf(cipher[index]);
          let y = this.alphbetics.indexOf(cipher[index + 1]);
          let z = this.alphbetics.indexOf(cipher[index + 2]);
      
          console.log("dec: " + [x, y, z]);
      
      
          let res = this.multiplyMatrix(matrixInv, [x, y, z]);
      
          console.log("matinv: " + res);
      
      
      
          for (let i = 0; i < res.length; i++) {
            res[i] *= modularInv;
      
      
            console.log("res[" + i + "]:  " + res[i]);
      
            if (res[i] < 0) {
              res[i] = this.getRidOfNeg(res[i], this.n);
            }
      
      
      
            let j = res[i] % this.n;
      
            plain += this.alphbetics[j];
          }
      
        }
        return plain;
      }
}

{
    console.log(eyes[0].chunk(26))

    const chunked = pt[0].chunk(26)
    console.log(chunked)
    const ct = []
    ct.push(Vigenere.encrypt(chunked[0], az26, az83))
    ct.push(Vigenere.encrypt(chunked[1], az26, az83))
    ct.push(Vigenere.encrypt(chunked[2], az26, az83))
    ct.push(Vigenere.encrypt(chunked[3], az26, az83))
    ct.push(Vigenere.encrypt(chunked[4], az26, az83))
    console.log(ct)
    const hill = new Hill()
    // SI&aV=!AS(%9>I]2[J3h15Jan"'Ql=6Z*,#_N5H>I]H'i7_8&k[
    console.log(hill.encrypt("THIS IS A TEST OF THE EMERGENCY BROADCAST SYSTEM?"))
    console.log(hill.decrypt("I?o>3mBb!HEY:EY!J9K-Ig)@#*/Je6Ei9e\\EkRe:EYZ9(N#ObTD"))
}

{
    const hill = new Hill()
    // const ct = hill.encrypt(pt[0])
    // console.log(ct.ngrams(2, true, true))

    const ct = pt.map(v => hill.encrypt(v))
    console.log(ct.join(""))
}

{
    const hill = new Hill()
    const pt = hill.decrypt(eyes[0].slice(1))
    console.log(pt)
}

function Encrypt(plaintext){
    plaintext = plaintext.toLowerCase().replace(/[^a-z]/g, "");  
    // k = document.getElementById("k").value.toLowerCase().replace(/[^0-9 ]/g, "");
    k = "5 17 4 15"
    keys = k.split(" "); 
    // do some error checking
    if(plaintext.length < 1){ alert("please enter some plaintext (letters and numbers only)"); return; }    
    if(plaintext.length % 2 == 1){ plaintext = plaintext + "x"; }    
    if(keys.length != 4){ alert("key should consist of 4 integers"); return; }
    for(i=0;i<4;i++) keys[i] = keys[i]%26;
    ciphertext="";
    for(i=0; i<plaintext.length; i+=2){ 
      ciphertext += String.fromCharCode((keys[0]*(plaintext.charCodeAt(i)-97) + keys[1]*(plaintext.charCodeAt(i+1)-97))%26 + 97); 
      ciphertext += String.fromCharCode((keys[2]*(plaintext.charCodeAt(i)-97) + keys[3]*(plaintext.charCodeAt(i+1)-97))%26 + 97); 
    } 
    return ciphertext; 
}

{
    const ct = Encrypt("THIS IS A TEST OF THE EMERGENCY BROADCAST SYSTEM")
    console.log(ct)
}
 
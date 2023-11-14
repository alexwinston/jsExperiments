{
    // https://gist.github.com/defektu/d5aafe42de002a9409814692262a516c
const ascii_lowercase = "abcdefghijklmnopqrstuvwxyz";
const text =
  "To decrypt an encoded message, you need to know the encryption used (or the encoding method). Without the message, it is impossible to decrypt it (or decode it). Knowing the encryption (or encoding) is the decryption (or decoding) process.";

const pt = Array.from(text.toLowerCase())
  .filter((c) => ascii_lowercase.includes(c))
  .map((c) => c.charCodeAt() - "a".charCodeAt());

const pt_alphabet = new Uint8Array(ascii_lowercase.length);

for (let i = 0; i < ascii_lowercase.length; i++) {
  pt_alphabet[i] = i;
}

function shuffler(array) {
  let currentIndex = array.length,
    randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex > 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}

const ct_alphabet_len = 83;
var ct_alphabet = Array.from({ length: ct_alphabet_len }, (_, i) => i);

// shuffler(ct_alphabet);
// ct_alphabet.shuffle()

function encrypt(pt, phase_len) {
  pt = pt.slice();
  const ct = [];
  let i = 0;
  let wheel = 0;
  let phase = 0;
  while (pt.length > 0) {
    const p = pt.shift();
    wheel += p;
    phase += p;
    if (phase >= phase_len) {
      if (pt.length > 0) {
        wheel += pt.shift();
      }
      phase %= phase_len;
    }
    ct.push(ct_alphabet[(wheel + i) % ct_alphabet_len]);
    i += 1;
    i %= 26;
  }
  return ct;
}

const cts = [];
for (let i = 0; i < 3; i++) {
  const ct = encrypt(pt, 80 + i * 20);
  cts.push(ct);
  console.log(ct.map((x) => String.fromCharCode(x + 32)).join(""));
}

console.log(cts)
}
/**
 * @param {string} code - The code to decipher
 * @returns {string} The deciphered PIN
 */
function decodeSantaPin(code) {
  const regex = /\[([0-9][+-]*|<)\]/g;
  let match;
  const blocks = [];

  while ((match = regex.exec(code)) !== null) {
    blocks.push(match[1]);
  }

  const pin = [];
  let lastValue = null;

  for (const block of blocks) {
    let value;
    if (block === "<") {
      value = (lastValue != null) ? lastValue : null;
    } else {
      let num = parseInt(block[0]);
      for (const symbol of block.slice(1)) {
        if (symbol === "+") num = (num + 1) % 10;
        if (symbol === "-") num = ((num - 1) % 10 + 10) % 10;
      }
      value = num;
      lastValue = value;
    }
    pin.push(value);
  }
  return pin.length === 4 ? pin.join("") : null;
}

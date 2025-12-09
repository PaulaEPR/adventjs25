/**
 * @param {number} size - The size of the gift
 * @param {string} symbol - The symbol to draw
 * @returns {string} The gift drawn
 */
function drawGift(size, symbol) {
  let box = [];
  if (size >= 2) {
    for (let i = 0; i < size; i++) {
      if (i === 0 || i === size -1) {
        box.push(symbol.repeat(size));
      } else {
        box.push(symbol + " ".repeat(size-2) + symbol);
      }
    }
  }
  return box.join("\n");
}
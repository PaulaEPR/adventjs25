/** @param {number} height - Height of the tree
 *  @param {string} ornament - Character to use as ornament
 *  @param {number} frequency - How often ornaments appear
 *  @returns {string} The decorated tree
 */
function drawTree(height, ornament, frequency) {
  const getSize = amount => { return (amount * 2) -1 };
  
  const branches = [];
  for (let i = 0; i < (height * height); i++) {
    let position = i + 1;
    branches.push((position % frequency === 0) ? ornament : '*');
  }

  const rows = [];
  for (let i = 0; i < height; i++) {
    let lineWidth = getSize(i + 1);
    let space = (getSize(height) - lineWidth) / 2;
    let row = ' '.repeat(space) + branches.splice(0, lineWidth).join('');
    rows.push(row);
  }
  rows.push((' ').repeat(height - 1) + '#');
  return rows.join('\n');
}

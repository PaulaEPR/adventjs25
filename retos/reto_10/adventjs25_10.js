/**
 * @param {string} s - The string to check
 * @returns {number} The maximum depth of the magic
 */
function maxDepth(s) {
  let count = 0;
  let max = 0;
  for (let i = 0; i < s.length; i++) {
    
    const element = s[i];
    if (element === "[") {
      count++
      if (count > max ) {
        max = count;
      }
    }
    if (element === "]") {
      count--
      if (count < 0) return -1;
    }
  }
  return count !== 0 ? -1 : max;
}
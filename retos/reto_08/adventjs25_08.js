/**
 * @param {string} toy - The toy to find the first unique one letter
 * @returns {string} The first unique letter in the toy
 */
function findUniqueToy(toy) {
  const storage = {};
  const firstSeen = {};
  for (const char of toy) {
    const charLow = char.toLowerCase();
    if (!firstSeen[charLow]) {
      firstSeen[charLow] = char;
      storage[char] = "unique"
    } else {
      storage[firstSeen[charLow]] = "repeated"
    }
  }

  const firstIndex = Object.values(storage).indexOf("unique")

  return firstIndex === -1 ? '' : Object.keys(storage)[firstIndex];
}
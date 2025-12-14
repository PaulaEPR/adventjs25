/**
 * @param {object} workshop - A representation of the workshop
 * @param {string|number|boolean} gift - The gift to find
 * @returns {[]} The path to the gift
 */
function findGiftPath(workshop, gift) {
  const run = (workshop, gift) => {
    for (const key in workshop) {
      const value = workshop[key];
      if (value === gift) {
        return [key];
      }
      if (typeof value === "object") {
        let result = run(value, gift);
        if (result !== null) return [key, ...result]
      }
    }
    return null;
  }
  const path = run(workshop, gift);
  return path === null ? [] : path
}
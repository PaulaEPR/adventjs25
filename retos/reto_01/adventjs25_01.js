/**
 * @param {string[]} gifts - The array of gifts to filter
 * @returns {string[]} An array with the unique filtered gifts
 */
function filterGifts(gifts) {
  let filteredGifts = []
  for (let gift of gifts) {
    if (!gift.includes('#')) {
      filteredGifts.push(gift)
    }
  }
  return filteredGifts
}


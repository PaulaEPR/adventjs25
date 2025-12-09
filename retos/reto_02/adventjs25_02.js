/**
 * @param {Array<{ toy: string, quantity: number }>} giftsToProduce
 * @returns {string[]} Array of manufactured gifts
 */
function manufactureGifts2(giftsToProduce) {
  return giftsToProduce.flatMap(
    ({toy, quantity}) => quantity > 0 ? Array(quantity).fill(toy) : [])
}
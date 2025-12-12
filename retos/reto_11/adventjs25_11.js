/**
 * @param {string[]} warehouse - The warehouse layout
 * @returns {number} The count of unwatched gifts
 */
function findUnsafeGifts(warehouse) {
  let unsafeGiftCount = 0;
  const directions = {
    L: { x: -1, y: 0 },
    R: { x: 1, y: 0 },
    U: { x: 0, y: -1 },
    D: { x: 0, y: 1 },
  };
  const bounds = { width: warehouse[0].length, height: warehouse.length };

  const hasCameraWatching = (x, y) =>
    x >= 0 &&
    x < bounds.width &&
    y >= 0 &&
    y < bounds.height
    && warehouse[y][x] === '#';

  const isGiftSafe = (i, j) => {
    for (const direction in directions) {
      const xAxis = j + directions[direction].x;
      const yAxis = i + directions[direction].y;
      if (hasCameraWatching(xAxis, yAxis)) return true;
    }
    return false;
  };

  for (let i = 0; i < warehouse.length; i++) {
    const line = warehouse[i];
    for (let j = 0; j < line.length; j++) {
      if (line[j] === "*") {
        if (!isGiftSafe(i,j)) unsafeGiftCount++;
      }
    }
  }
  return unsafeGiftCount;
}
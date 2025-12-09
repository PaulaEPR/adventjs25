/**
 * @param {{ hand: 'L' | 'R', color: string }[]} gloves
 * @returns {string[]} Colors of matched pairs
 */
function matchGloves(gloves) {
  let match = [];

  gloves.reduce((acc, curr, index) => {
    const { hand, color } = curr;
    const other = hand === 'L' ? 'R' : 'L';

    if (!acc[color]) {
      acc[color] = { index, hands: [hand] };
    } else {
      const entry = acc[color];
      if (entry.hands.includes(other)) {
        match.push({ color, index: entry.index });
        const i = entry.hands.indexOf(other);
        entry.hands.splice(i, 1);
      } else {
        entry.hands.push(hand);
      }
    }

    return acc;
  }, {});

  match.sort((a, b) => a.index - b.index);

  return match.map(m => m.color);
}
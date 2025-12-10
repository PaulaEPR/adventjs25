/**
 * @param {string} board - Represent the board situation
 * @param {string} moves - Movement direction
 * @returns {'fail' | 'crash' | 'success'}
 */
function moveReno(board, moves) {
  const directions = {
    L: { x: -1, y: 0 },
    R: { x: 1, y: 0 },
    U: { x: 0, y: -1 },
    D: { x: 0, y: 1 },
  };

  const lines = board.split("\n").slice(1, -1);
  const bounds = { width: lines[0].length, height: lines.length };
  const status = { success: "success", crash: "crash", fail: "fail" };

  let location = null;
  for (let i = 0; i < lines.length; i++) {
    const deerPosition = lines[i].indexOf("@");
    if (deerPosition !== -1) {
      location = { line: i, position: deerPosition };
      break;
    }
  }

  if (!location) return status.fail;

  for (const move of moves) {
    const xAxis = location.position + directions[move].x;
    const yAxis = location.line + directions[move].y;

    if (yAxis < 0 || yAxis >= bounds.height || xAxis < 0 || xAxis >= bounds.width) {
      return status.crash;
    }

    const foundItem = lines[yAxis][xAxis];

    if (foundItem === "*") return status.success;
    if (foundItem === "#") return status.crash;

    location.line = yAxis;
    location.position = xAxis;
  }

  return status.fail;
}

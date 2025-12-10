## Reto #9: 🦌 El reno robot aspirador

Los elfos han construido un **reno 🦌 robot aspirador** (``@``) para limpiar un poco el taller de cara a las navidades.

El reno se mueve sobre un tablero para **recoger cosas del suelo** (``*``) y debe **evitar obstáculos** (``#``).

Recibirás dos parámetros:

- ``board``: un string que representa el tablero.
- ``moves``: un string con los movimientos: ``'L'`` (izquierda), ``'R'`` (derecha), ``'U'`` (arriba), ``'D'`` (abajo).

Reglas del movimiento:

- Si el reno se sale del tablero o choca contra un obstáculo (``#``) → devuelve ``'crash'``.
- Si el reno recoge algo del suelo (``*``) durante los movimientos → devuelve ``'success'``.
- Si el reno no recoge nada ni se estrella → devuelve ``'fail'``.

Importante: Ten en cuenta que en el ``board`` la primera y última línea están en blanco y deben descartarse.

#### 🧩 Ejemplos
```js
const board = `
.....
.*#.*
.@...
.....
`

moveReno(board, 'D')
// ➞ 'fail' -> se mueve pero no recoge nada

moveReno(board, 'U')
// ➞ 'success' -> recoge algo (*) justo encima

moveReno(board, 'RU')
// ➞ 'crash' -> choca contra un obstáculo (#)

moveReno(board, 'RRRUU')
// ➞ 'success' -> recoge algo (*)

moveReno(board, 'DD')
// ➞ 'crash' -> se choca con la parte de abajo del tablero

moveReno(board, 'UUU')
// ➞ 'success' -> recoge algo del suelo (*) y luego se choca por arriba

moveReno(board, 'RR')
// ➞ 'fail' -> se mueve pero no recoge nada
```

#### 💡 Soluciones
```js
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
```
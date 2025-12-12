## Reto #11: 📹 Regalos sin vigilancia

El grinch quiere robar los regalos de Navidad del almacén. Para ello necesita saber **qué regalos no tienen vigilancia**.

El almacén se representa como un array de strings (``string[]``), donde **cada regalo** (``*``) **está protegido si su posición está junto a una cámara** (``#``). Cada espacio vacío se representa con un **punto** (``.``).

Tu tarea es **contar cuántos regalos están sin vigilancia**, es decir, que no tienen ninguna cámara adyacente (arriba, abajo, izquierda o derecha).

Ten en cuenta: *solo se considera como "adyacente" las 4 direcciones cardinales, no en diagonal*.

Los regalos en las esquinas o bordes pueden estar sin vigilancia, siempre que no tengan cámaras directamente al lado.

#### 🧩 Ejemplos
```js
findUnsafeGifts([
  '.*.',
  '*#*',
  '.*.'
]) // ➞ 0

// Todos los regalos están junto a una cámara

findUnsafeGifts([
  '...',
  '.*.',
  '...'
]) // ➞ 1

// Este regalo no tiene cámaras alrededor

findUnsafeGifts([
  '*.*',
  '...',
  '*#*'
]) // ➞ 2
// Los regalos en las esquinas superiores no tienen cámaras alrededor

findUnsafeGifts([
  '.....',
  '.*.*.',
  '..#..',
  '.*.*.',
  '.....'
]) // ➞ 4

// Los cuatro regalos no tienen cámaras, porque están en diagonal a la cámara
```

#### 💡 Soluciones
```js
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
```
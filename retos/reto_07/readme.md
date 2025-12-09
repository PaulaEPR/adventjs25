## Reto #7: 🎄 Montando el árbol
¡Es hora de decorar el **árbol de Navidad** 🎄! Escribe una función que reciba:

``height`` → la altura del árbol (número de filas).
``ornament`` → el carácter del adorno (por ejemplo, ``"o"`` o ``"@"``).
``frequency`` → cada cuántas posiciones de asterisco aparece el adorno.
El árbol se dibuja con asteriscos ``*``, pero **cada** ``frequency`` **posiciones**, el asterisco se reemplaza por el adorno.

El conteo de posiciones empieza en 1, desde la copa hasta la base, de izquierda a derecha. Si ``frequency`` es 2, los adornos aparecen en las posiciones 2, 4, 6, etc.

El árbol debe estar centrado y tener un tronco ``#`` de una línea al final.

#### 🧩 Ejemplos
```js
drawTree(5, 'o', 2)
//     *
//    o*o
//   *o*o*
//  o*o*o*o
// *o*o*o*o*
//     #

drawTree(3, '@', 3)
//   *
//  *@*
// *@**@
//   #

drawTree(4, '+', 1)
//    +
//   +++
//  +++++
// +++++++
//    #
```

#### 💡 Soluciones
```js
/** @param {number} height - Height of the tree
 *  @param {string} ornament - Character to use as ornament
 *  @param {number} frequency - How often ornaments appear
 *  @returns {string} The decorated tree
 */
function drawTree(height, ornament, frequency) {
  const getSize = amount => { return (amount * 2) -1 };
  
  const branches = [];
  for (let i = 0; i < (height * height); i++) {
    let position = i + 1;
    branches.push((position % frequency === 0) ? ornament : '*');
  }

  const rows = [];
  for (let i = 0; i < height; i++) {
    let lineWidth = getSize(i + 1);
    let space = (getSize(height) - lineWidth) / 2;
    let row = ' '.repeat(space) + branches.splice(0, lineWidth).join('');
    rows.push(row);
  }
  rows.push((' ').repeat(height - 1) + '#');
  return rows.join('\n');
}
```
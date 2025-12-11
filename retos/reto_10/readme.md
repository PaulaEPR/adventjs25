## Reto #10: 📨 Profundidad de la magia navideña

En el ❄️ Polo Norte, Santa Claus está revisando las cartas mágicas 📩✨ que recibe de los niños de todo el mundo. Estas cartas usan un antiguo lenguaje navideño en el que los corchetes ``[`` y ``]`` representan la intensidad del deseo.

Cuanto más profunda sea la anidación de los corchetes, más fuerte es el deseo. Tu misión es averiguar la **máxima profundidad** en la que se anidan los ``[]``.

Pero ¡cuidado! Algunas cartas pueden estar **mal escritas**. Si los corchetes no están correctamente balanceados (si se cierra antes de abrir, sobran cierres o faltan cierres), la carta es inválida y debes devolver ``-1``.

#### 🧩 Ejemplos
```js
maxDepth('[]') // -> 1
maxDepth('[[]]') // -> 2
maxDepth('[][]') // -> 1
maxDepth('[[][]]') // -> 2
maxDepth('[[[]]]') // -> 3
maxDepth('[][[]][]') // -> 2

maxDepth('][') // -> -1 (cierra antes de abrir)
maxDepth('[[[') // -> -1 (faltan cierres)
maxDepth('[]]]') // -> -1 (sobran cierres)
maxDepth('[][][') // -> -1 (queda uno sin cerrar)
```

#### 💡 Soluciones
```js
/**
 * @param {string} s - The string to check
 * @returns {number} The maximum depth of the magic
 */
function maxDepth(s) {
  let count = 0;
  let max = 0;
  for (let i = 0; i < s.length; i++) {
    
    const element = s[i];
    if (element === "[") {
      count++
      if (count > max ) {
        max = count;
      }
    }
    if (element === "]") {
      count--
      if (count < 0) return -1;
    }
  }
  return count !== 0 ? -1 : max;
}
```
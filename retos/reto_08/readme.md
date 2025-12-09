## Reto #8: 🎁 Encuentra el juguete único

Santa 🎅 quiere saber cuál es la primera letra no repetida en el nombre de un juguete 🎁.

Escribe una función que reciba un ``string`` y devuelva la primera letra que no se repite, ignorando mayúsculas y minúsculas al contar, pero devolviendo la letra tal como aparece en el ``string``.

Si no hay ninguna, devuelve una cadena vacía ("").

#### 🧩 Ejemplos
```js
findUniqueToy('Gift') // 'G'
// ℹ️ La G es la primera letra que no se repite
// y la devolvemos tal y como aparece

findUniqueToy('sS') // ''
// ℹ️ Las letras se repiten, ya que no diferencia mayúsculas

findUniqueToy('reindeeR') // 'i'
// ℹ️ La r se repite (aunque sea en mayúscula)
// y la e también, así que la primera es la 'i'

// Más casos:
findUniqueToy('AaBbCc') // ''
findUniqueToy('abcDEF') // 'a'
findUniqueToy('aAaAaAF') // 'F'
findUniqueToy('sTreSS') // 'T'
findUniqueToy('z') // 'z'
```

#### 💡 Soluciones
```js
/**
 * @param {string} toy - The toy to find the first unique one letter
 * @returns {string} The first unique letter in the toy
 */
function findUniqueToy(toy) {
  const storage = {};
  const firstSeen = {};
  for (const char of toy) {
    const charLow = char.toLowerCase();
    if (!firstSeen[charLow]) {
      firstSeen[charLow] = char;
      storage[char] = "unique"
    } else {
      storage[firstSeen[charLow]] = "repeated"
    }
  }

  const firstIndex = Object.values(storage).indexOf("unique")

  return firstIndex === -1 ? '' : Object.keys(storage)[firstIndex];
}
```
```js
/**
 * @param {string} toy - The toy to find the first unique one letter
 * @returns {string} The first unique letter in the toy
 */
function findUniqueToy(toy) {
  const storage = {};
  for (const char of toy) {
    const charLow = char.toLowerCase();
    if (!storage[charLow]) {
      storage[charLow] = { char: char, status: "unique" };
    } else {
      storage[charLow].status = "repeated"
    }
  }
  const uniqueChar = Object.values(storage).find(char => char.status === "unique")
  return uniqueChar ? uniqueChar.char : "";
}
```
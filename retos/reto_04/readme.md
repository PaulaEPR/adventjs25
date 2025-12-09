## Reto #4: 🧮 Descifra el PIN de Santa
Los elfos han encontrado el **código cifrado** que protege la puerta del taller de Santa 🔐. El PIN tiene **4 dígitos**, y está escondido dentro de bloques como estos:

```js
[1++][2-][3+][<]
```
**Escribe una función que descifre el PIN a partir del código**.

El código está formado por bloques entre corchetes ``[...]`` y cada bloque genera un dígito del PIN.

Un bloque normal tiene la forma ``[nOP...]``, donde ``n`` es un número ``(0-9)`` y después puede haber una lista de operaciones (opcionales).

Las operaciones se aplican en orden al número y son:

``+`` suma 1
``-`` resta 1
El resultado siempre es un dígito (aritmética mod 10), por ejemplo ``9 + 1 → 0`` y ``0 - 1 → 9``.

También existe el bloque especial ``[<]``, que repite el dígito del bloque anterior.

Si al final hay menos de 4 dígitos, se debe devolver ``null``.

#### 🧩 Ejemplos

```js
decodeSantaPin('[1++][2-][3+][<]')
// "3144"

decodeSantaPin('[9+][0-][4][<]')
// "0944"

decodeSantaPin('[1+][2-]')
// null (solo 2 dígitos)
```

#### 💡 Soluciones
```js
/**
 * @param {string} code - The code to decipher
 * @returns {string} The deciphered PIN
 */
function decodeSantaPin(code) {
  const regex = /\[([0-9][+-]*|<)\]/g;
  let match;
  const blocks = [];

  while ((match = regex.exec(code)) !== null) {
    blocks.push(match[1]);
  }

  const pin = [];
  let lastValue = null;

  for (const block of blocks) {
    let value;
    if (block === "<") {
      value = (lastValue != null) ? lastValue : null;
    } else {
      let num = parseInt(block[0]);
      for (const symbol of block.slice(1)) {
        if (symbol === "+") num = (num + 1) % 10;
        if (symbol === "-") num = ((num - 1) % 10 + 10) % 10;
      }
      value = num;
      lastValue = value;
    }
    pin.push(value);
  }
  return pin.length === 4 ? pin.join("") : null;
}
```
## Reto #6: 🧤 Emparejando guantes
En el taller de Santa, los elfos han encontrado **una montaña de guantes mágicos** totalmente desordenados. Cada guante viene descrito por dos valores:

- ``hand``: indica si es un guante izquierdo (``L``) o derecho (``R``)
- ``color``: el color del guante (string)
Tu tarea es ayudarles a **emparejar guantes**: Un par válido es un guante izquierdo y uno derecho **del mismo color**.

Debes devolver una **lista con los colores de todos los pares encontrados**. Ten en cuenta que **puede haber varios pares del mismo color**.

#### 🧩 Ejemplos
```js
const gloves = [
  { hand: 'L', color: 'red' },
  { hand: 'R', color: 'red' },
  { hand: 'R', color: 'green' },
  { hand: 'L', color: 'blue' },
  { hand: 'L', color: 'green' }
]

matchGloves(gloves)
// ["red", "green"]

const gloves2 = [
  { hand: 'L', color: 'gold' },
  { hand: 'R', color: 'gold' },
  { hand: 'L', color: 'gold' },
  { hand: 'L', color: 'gold' },
  { hand: 'R', color: 'gold' }
]

matchGloves(gloves2)
// ["gold", "gold"]

const gloves3 = [
  { hand: 'L', color: 'red' },
  { hand: 'R', color: 'green' },
  { hand: 'L', color: 'blue' }
]

matchGloves(gloves3)
// []
```

#### 💡 Soluciones
```js
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
```
## Reto #13: 🏭 La cadena de montaje

Simula el recorrido de un regalo dentro de una fábrica y devuelve cómo termina. Para ello debes crear una función ``runFactory(factory)``.

``factory`` es un ``string[]`` donde cada celda puede ser:

- ``>`` ``<`` ``^`` ``v`` movimientos
- ``.`` salida correcta

Ten en cuenta que **todas las filas tienen la misma longitud** y que **no habrá otros símbolos**.

El regalo **siempre empieza en la posición (0,0)** (arriba a la izquierda). En cada paso lee la celda actual y se mueve según la dirección. Si llega a una celda con un punto (``.``) significa que ha salido correctamente de la fábrica.

**Resultado**

Devuelve uno de estos valores:

- ``'completed'`` si llega a un ``.``
- ``'loop'`` si visita una posición dos veces
- ``'broken'`` si sale fuera del tablero

#### 🧩 Ejemplos
```js
runFactory([
  '>>.'
]) // 'completed'

runFactory([
  '>>>'
]) // 'broken'

runFactory([
  '>><'
]) // 'loop'

runFactory([
  '>>v',
  '..<'
]) // 'completed'

runFactory([
  '>>v',
  '<<<'
]) // 'broken'

runFactory([
  '>v.',
  '^..'
]) // 'completed'

runFactory([
  'v.',
  '^.'
]) // 'loop'
```

#### 💡 Soluciones
```js
/**
 * @param {string[]} factory - The factory layout
 * @returns {'completed'|'broken'|'loop'} Result of the gift journey
 */
function runFactory(factory) {
  const directions = {
    '<': { x: -1, y: 0 },
    '>': { x: 1, y: 0 },
    '^': { x: 0, y: -1 },
    'v': { x: 0, y: 1 },
  };
  const bounds = { width: factory[0].length, height: factory.length };
  const status = { completed: "completed", loop: "loop", broken: "broken" };
  let location = { line: 0, position: 0 };
  let visitedPositions = { 0: new Set([0]) };
  let routeResult = null;

  while (routeResult === null) {
    const step = factory[location.line][location.position];
    if (step === ".") {
      routeResult = status.completed;
      break;
    }
    
    const xAxis = location.position + directions[step].x;
    const yAxis = location.line + directions[step].y;
    const isRowVisitedBefore = visitedPositions[yAxis]

    if (isRowVisitedBefore && visitedPositions[yAxis].has(xAxis)) {
      routeResult = status.loop;
      break;
    }
    
    if (yAxis < 0 || yAxis >= bounds.height || xAxis < 0 || xAxis >= bounds.width) {
      routeResult = status.broken;
      break;
    }

    location.line = yAxis;
    location.position = xAxis;
    if (isRowVisitedBefore) {
      visitedPositions[yAxis].add(xAxis)
    } else {
      visitedPositions[yAxis] = new Set([xAxis]);
    }
  } 
  return routeResult;
}
```
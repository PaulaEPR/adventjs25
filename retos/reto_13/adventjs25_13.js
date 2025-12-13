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
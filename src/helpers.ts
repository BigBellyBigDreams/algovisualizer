// Generic helpers for grid
function isEqualsArray(arrA: number[], arrB: number[]): boolean {
  if (arrA.length !== arrB.length) {
    return false;
  }
  for (let i = 0; i < arrA.length; i++) {
    if (arrA[i] !== arrB[i]) {
      return false;
    }
  }
  return true;
}

// Helpers for A* Search
function isPath(row: number, col: number, path: any): boolean {
  for (let i = 0; i < path.length; i++) {
    if (isEqualsArray([path[i][0], path[i][1]], [row, col])) {
      return true;
    }
  }
  return false;
}

export { isEqualsArray, isPath };

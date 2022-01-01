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

function isWall(row: number, col: number, walls: any): boolean {
  for (let i = 0; i < walls.length; i++) {
    if (isEqualsArray(walls[i], [row, col])) {
      return true;
    }
  }
  return false;
}

function isPath(row: number, col: number, path: any): boolean {
  for (let i = 0; i < path.length; i++) {
    if (isEqualsArray([path[i][0], path[i][1]], [row, col])) {
      return true;
    }
  }
  return false;
}

function isWalked(row: number, col: number, closedList: any): boolean {
  for (let i = 0; i < closedList.length; i++) {
    if (isEqualsArray([closedList[i].x, closedList[i].y], [row, col])) {
      return true;
    }
  }
  return false;
}

export { isEqualsArray, isWall, isPath, isWalked };

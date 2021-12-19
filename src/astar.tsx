class Node {
  x: number;
  y: number;
  isWall: boolean;

  constructor(x: number, y: number, isWall: boolean) {
    this.x = x;
    this.y = y;
    this.isWall = isWall;
  }
}

export { Node };

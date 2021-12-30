class Node {
  x: number;
  y: number;
  fScore: number;
  gScore: number;
  hScore: number;
  parentNode: Node | null;

  constructor(x: number, y: number, parentNode: Node | null) {
    this.parentNode = parentNode;
    this.x = x;
    this.y = y;
    this.gScore = 0;
    this.hScore = 0;
    this.fScore = 0;
  }

  public findNearestNeighbors(grid: Node[][]): Node[] {
    let neighbors: Node[] = [];

    if (this.x + 1 in grid) {
      neighbors.push(grid[this.x + 1][this.y]);
    }

    if (this.x - 1 in grid) {
      neighbors.push(grid[this.x - 1][this.y]);
    }

    if (this.y + 1 in grid[this.x]) {
      neighbors.push(grid[this.x][this.y + 1]);
    }

    if (this.y - 1 in grid[this.x]) {
      neighbors.push(grid[this.x][this.y - 1]);
    }

    return neighbors;
  }

  public calculateHeuristic(endNode: number[]): number {
    const xDistance = (this.x - endNode[0]) ** 2;
    const yDistance = (this.y - endNode[1]) ** 2;
    return xDistance + yDistance;
  }
}

export { Node };

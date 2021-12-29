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

  findNearestNeighbors(grid: Node[][]) {
    let neighbors = [];

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

  calculateScoreG(currentNode: Node) {
    this.gScore = currentNode.gScore + 1;
  }

  calculateScoreH(grid: Node[][], endNode: number[]) {
    const xDistance = (this.x - grid[endNode[0]][endNode[1]].x) ** 2;
    const yDistance = (this.y - grid[endNode[0]][endNode[1]].y) ** 2;
    this.hScore = Math.sqrt(xDistance + yDistance);
  }

  calculateScoreF() {
    this.fScore = this.gScore + this.hScore;
  }
}

export { Node };

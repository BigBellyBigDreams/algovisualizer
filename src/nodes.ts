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
    try {
      neighbors.push(grid[this.x + 1][this.y]);
    } catch (err) {
      console.log(err);
    }

    try {
      neighbors.push(grid[this.x - 1][this.y]);
    } catch (err) {
      console.log(err);
    }

    try {
      neighbors.push(grid[this.x][this.y + 1]);
    } catch (err) {
      console.log(err);
    }

    try {
      neighbors.push(grid[this.x][this.y - 1]);
    } catch (err) {
      console.log(err);
    }

    try {
      neighbors.push(grid[this.x + 1][this.y + 1]);
    } catch (err) {
      console.log(err);
    }

    try {
      neighbors.push(grid[this.x - 1][this.y - 1]);
    } catch (err) {
      console.log(err);
    }

    try {
      neighbors.push(grid[this.x + 1][this.y - 1]);
    } catch (err) {
      console.log(err);
    }

    try {
      neighbors.push(grid[this.x - 1][this.y + 1]);
    } catch (err) {
      console.log(err);
    }

    return neighbors;
  }

  calculateScoreG(currentNode: Node) {
    this.gScore = currentNode.gScore + 1;
  }

  calculateScoreH(grid: Node[][], endNode: number[]) {
    const xDistance = (this.x - grid[endNode[0]][endNode[1]].x) ** 2;
    const yDistance = (this.y - grid[endNode[0]][endNode[1]].y) ** 2;
    this.hScore = xDistance + yDistance;
  }

  calculateScoreF() {
    this.fScore = this.gScore + this.hScore;
  }
}

export { Node };

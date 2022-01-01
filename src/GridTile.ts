abstract class GridTile {
  x: number;
  y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  findNearestNeighbors(grid: any) {
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
}

export { GridTile };

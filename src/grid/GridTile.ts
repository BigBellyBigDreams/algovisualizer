import { GridTiles } from '../types';

abstract class GridTile {
  x: number;
  y: number;
  walkable: boolean;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
    this.walkable = true;
  }

  findNearestNeighbors(grid: GridTiles): any {
    let neighbors: any = [];

    if (this.x + 1 in grid) {
      neighbors.push(grid[this.x + 1][this.y]);
      // if (this.y + 1 in grid[this.x + 1]) {
      //   neighbors.push(grid[this.x + 1][this.y + 1]);
      // }
    }

    if (this.x - 1 in grid) {
      neighbors.push(grid[this.x - 1][this.y]);
      // if (this.y - 1 in grid[this.x - 1]) {
      //   neighbors.push(grid[this.x - 1][this.y - 1]);
      // }
    }

    if (this.y + 1 in grid[this.x]) {
      neighbors.push(grid[this.x][this.y + 1]);
    }

    if (this.y - 1 in grid[this.x]) {
      neighbors.push(grid[this.x][this.y - 1]);
    }

    // if (this.x + 1 in grid) {
    //   if (this.y - 1 in grid[this.x + 1]) {
    //     neighbors.push(grid[this.x + 1][this.y - 1]);
    //   }
    // }

    // if (this.x - 1 in grid) {
    //   if (this.y + 1 in grid[this.x - 1]) {
    //     neighbors.push(grid[this.x - 1][this.y + 1]);
    //   }
    // }

    return neighbors;
  }
}

export { GridTile };

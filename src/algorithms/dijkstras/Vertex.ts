import { GridTile } from '../../GridTile';

class Vertex extends GridTile {
  distance: number;
  isVisited: boolean;
  previous: Vertex | null;

  constructor(x: number, y: number) {
    super(x, y);
    this.distance = Infinity;
    this.isVisited = false;
    this.previous = null;
  }
}

export { Vertex };

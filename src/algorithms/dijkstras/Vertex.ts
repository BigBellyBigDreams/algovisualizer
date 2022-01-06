import { GridTile } from '../../GridTile';

class Vertex extends GridTile {
  distance: number;
  previous: Vertex | null;

  constructor(x: number, y: number) {
    super(x, y);
    this.distance = Infinity;
    this.previous = null;
  }
}

export { Vertex };

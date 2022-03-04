import { GridTile } from '../../grid/GridTile';

class Vertex extends GridTile {
  distance: number;
  toBeChecked: boolean;
  isVisited: boolean;
  previous: Vertex | null;

  constructor(x: number, y: number) {
    super(x, y);
    this.distance = Infinity;
    this.toBeChecked = false;
    this.isVisited = false;
    this.previous = null;
  }
}

export { Vertex };

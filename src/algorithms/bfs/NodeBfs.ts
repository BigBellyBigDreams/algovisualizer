import { GridTile } from '../../grid/GridTile';

class NodeBfs extends GridTile {
  heuristic: number;
  examined: boolean;
  nextBest: boolean;
  parent: NodeBfs | null;

  constructor(x: number, y: number) {
    super(x, y);
    this.heuristic = 0;
    this.examined = false;
    this.nextBest = false;
    this.parent = null;
  }
}

export { NodeBfs };

import { GridTile } from '../../GridTile';

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

  public calculateHeuristic(nodePosition: number[]): number {
    const xDistance = Math.abs(nodePosition[0] - this.x);
    const yDistance = Math.abs(nodePosition[1] - this.y);
    return xDistance + yDistance;
  }
}

export { NodeBfs };

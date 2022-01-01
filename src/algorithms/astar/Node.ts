import { GridTile } from '../../GridTile';

class Node extends GridTile {
  parentNode: Node | null;
  gScore: number;
  hScore: number;
  fScore: number;

  constructor(x: number, y: number) {
    super(x, y);
    this.parentNode = null;
    this.gScore = 0;
    this.hScore = 0;
    this.fScore = 0;
  }

  public calculateHeuristic(endNode: number[]): number {
    const xDistance = (this.x - endNode[0]) ** 2;
    const yDistance = (this.y - endNode[1]) ** 2;
    return xDistance + yDistance;
  }
}

export { Node };

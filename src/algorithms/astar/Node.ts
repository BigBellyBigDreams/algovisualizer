import { GridTile } from '../../GridTile';

class Node extends GridTile {
  parentNode: Node | null;
  gScore: number;
  hScore: number;
  fScore: number;
  isDiscovered: boolean;
  isClosed: boolean;

  constructor(x: number, y: number) {
    super(x, y);
    this.parentNode = null;
    this.isDiscovered = false;
    this.isClosed = false;
    this.gScore = 0;
    this.hScore = 0;
    this.fScore = 0;
  }

  public calculateDistance(nodePosition: number[]): number {
    const xDistance = Math.abs(nodePosition[0] - this.x);
    const yDistance = Math.abs(nodePosition[1] - this.y);
    return xDistance + yDistance;
  }
}

export { Node };

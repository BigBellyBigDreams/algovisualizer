import { Node } from './algorithms/astar/Node';
import { Vertex } from './algorithms/dijkstras/Vertex';

export type GridTiles = Node[][] | Vertex[][];

export interface GridType {
  grid: GridTiles;
  row: number;
  col: number;
  walls: number[][];
  startNode: number[];
  endNode: number[];
  toggleStart: boolean;
  toggleGoal: boolean;
  isDrawing: boolean;
}

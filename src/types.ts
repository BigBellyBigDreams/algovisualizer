import { Node } from './algorithms/astar/Node';
import { Vertex } from './algorithms/dijkstras/Vertex';
import { NodeBfs } from './algorithms/bfs/NodeBfs';

export type GridTiles = Node[][] | Vertex[][] | NodeBfs[][];

export interface GridType {
  setStart: (value: number[]) => void;
  setGoal: (value: number[]) => void;
  createWall: (row: number, col: number) => void;
  deleteWall: (row: number, col: number) => void;

  row: number;
  col: number;
  startNode: number[];
  endNode: number[];
  toggleStart: boolean;
  toggleGoal: boolean;
  isDrawing: boolean;
}

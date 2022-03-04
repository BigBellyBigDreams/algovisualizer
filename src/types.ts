import { Node } from './algorithms/astar/Node';
import { Vertex } from './algorithms/dijkstras/Vertex';
import { NodeBfs } from './algorithms/bfs/NodeBfs';

export type GridTiles = Node[][] | Vertex[][] | NodeBfs[][];

export interface GridType {
  row: number;
  col: number;
}

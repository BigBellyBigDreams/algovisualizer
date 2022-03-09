import { useState, useContext } from 'react';
import { isEqualsArray } from '../../helpers';
import { NodeBfs } from './NodeBfs';
import { AppContext } from '../../context/myContext';

export default function BfsLogic(algorithm: string, algorithmSpeed: number) {
  let { grid, path, startNode, endNode, setPath }: any = useContext(AppContext);

  class PriorityQueue {
    elements: NodeBfs[];
    comparator: (a: NodeBfs, b: NodeBfs) => number;

    constructor(comparator: any) {
      this.elements = [];
      this.comparator = comparator;
    }

    enqueue(value: NodeBfs) {
      this.elements.push(value);
      this.elements.sort(this.comparator);
    }

    dequeue() {
      if (!this.elements.length) return null;
      const value = this.elements.shift();
      return value;
    }
  }

  let pq = new PriorityQueue((a: NodeBfs, b: NodeBfs) => a.heuristic - b.heuristic);
  const [, setExamined] = useState<NodeBfs>(new NodeBfs(0, 0));

  const reset = () => {
    pq.elements = [];
    setPath([]);

    for (let i = 0; i < grid.length; i++) {
      for (let j = 0; j < grid[i].length; j++) {
        grid[i][j].examined = false;
        grid[i][j].nextBest = false;
      }
    }
  };

  const pathfind = () => {
    setPath([]);
    path = [];
    pq.enqueue(grid[startNode[0]][startNode[1]]);

    const interval = setInterval(() => {
      let currentNode = pq.dequeue();

      if (currentNode) {
        currentNode.nextBest = true;
        if (isEqualsArray([currentNode.x, currentNode.y], endNode)) {
          clearInterval(interval);
          let current = currentNode;

          let nestedInterval = setInterval(() => {
            if (isEqualsArray([current.x, current.y], startNode)) {
              clearInterval(nestedInterval);
            }

            if (current.parent) {
              setPath([...path, [current.x, current.y]]);
              path.push([current.x, current.y]);
              current = current.parent;
            } else {
              clearInterval(nestedInterval);
            }
          }, algorithmSpeed);
        }

        const neighbors: NodeBfs[] = currentNode.findNearestNeighbors(grid);
        for (let neighbor of neighbors) {
          if (neighbor.examined || !neighbor.walkable) {
            continue;
          }

          neighbor.examined = true;
          neighbor.heuristic = Math.abs(endNode[0] - neighbor.x) + Math.abs(endNode[1] - neighbor.y);
          neighbor.parent = currentNode;
          pq.enqueue(neighbor);
          setExamined(neighbor);
        }
      }
    }, algorithmSpeed);
  };

  return { reset, pathfind };
}

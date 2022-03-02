import { useState } from 'react';
import { Vertex } from './Vertex';
import { isEqualsArray } from '../../helpers';

export default function DijkstrasLogic(algorithm: string, algorithmSpeed: number) {
  class PriorityQueue {
    elements: Vertex[];
    comparator: (a: Vertex, b: Vertex) => number;

    constructor(comparator: any) {
      this.elements = [];
      this.comparator = comparator;
    }

    enqueue(value: Vertex) {
      this.elements.push(value);
      this.elements.sort(this.comparator);
    }

    dequeue() {
      if (!this.elements.length) return null;
      const value = this.elements.shift();
      return value;
    }
  }

  let grid: Vertex[][] = [];
  let startNode: number[] = [];
  let endNode: number[] = [];

  const unvisited = new PriorityQueue((a: Vertex, b: Vertex) => a.distance - b.distance);
  const [, setVisited] = useState<Vertex>(new Vertex(0, 0));
  let [path, setPath] = useState<number[][]>([]);

  function setParameters(gridTemplate: any, startNodeTemplate: number[], endNodeTemplate: number[]) {
    grid = gridTemplate;
    startNode = startNodeTemplate;
    endNode = endNodeTemplate;
  }

  function reset(): void {
    unvisited.elements = [];
    path = [];
    setPath([]);

    for (let i = 0; i < grid.length; i++) {
      for (let j = 0; j < grid[i].length; j++) {
        grid[i][j].isVisited = false;
        grid[i][j].toBeChecked = false;
        grid[i][j].distance = Infinity;
      }
    }
  }

  function pathfind(): void {
    if (algorithm === 'dijkstra') {
      // initialize
      grid[startNode[0]][startNode[1]].distance = 0;
      unvisited.enqueue(grid[startNode[0]][startNode[1]]);

      const interval = setInterval(() => {
        let currentVertex = unvisited.dequeue();

        if (currentVertex) {
          currentVertex.toBeChecked = false;
          const neighbors = currentVertex.findNearestNeighbors(grid);

          for (let neighbor of neighbors) {
            if (neighbor.isVisited || !neighbor.walkable) {
              continue;
            }

            if (isEqualsArray([neighbor.x, neighbor.y], endNode)) {
              clearInterval(interval);
              let current = neighbor;
              current.previous = currentVertex;

              let nestedInterval = setInterval(() => {
                // NOTE: Brute force solution until i figure out how to actually do this
                if (isEqualsArray([current.x, current.y], startNode)) {
                  clearInterval(nestedInterval);
                }

                if (neighbor.previous) {
                  setPath([...path, [current.x, current.y]]);
                  path.push([current.x, current.y]);
                  current = current.previous;
                } else {
                  clearInterval(nestedInterval);
                }
              }, 25);
            }

            let totalDistance = currentVertex.distance + 1;
            neighbor.distance = totalDistance;
            neighbor.previous = currentVertex;
            unvisited.enqueue(neighbor);
            neighbor.isVisited = true;
            neighbor.toBeChecked = true;
            setVisited(neighbor);
          }
        } else {
          clearInterval(interval);
          console.log('No Path!');
        }

        if (!unvisited.elements.length) {
          clearInterval(interval);
          console.log('No Path!');
        }
      }, algorithmSpeed);
    }
  }

  return { setParameters, pathfind, reset, path };
}

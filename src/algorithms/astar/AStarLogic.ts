import React, { useState } from 'react';
import { Node } from './Node';
import { isEqualsArray } from '../../helpers';

export default function AStarLogic(algorithm: string) {
  class PriorityQueue {
    elements: Node[];
    comparator: (a: Node, b: Node) => number;

    constructor(comparator: any) {
      this.elements = [];
      this.comparator = comparator;
    }

    enqueue(value: Node) {
      this.elements.push(value);
      this.elements.sort(this.comparator);
    }

    dequeue() {
      if (!this.elements.length) return null;
      const value = this.elements.shift();
      return value;
    }
  }

  let grid: Node[][] = [];
  let startNode: number[] = [];
  let endNode: number[] = [];

  let openList = new PriorityQueue((a: Node, b: Node) => a.fScore - b.fScore);
  let [closedList, setClosedList] = useState<Node[]>([]);
  let [path, setPath] = useState<number[][]>([]);

  function setParameters(gridTemplate: Node[][], startNodeTemplate: number[], endNodeTemplate: number[]): void {
    grid = gridTemplate;
    startNode = startNodeTemplate;
    endNode = endNodeTemplate;
  }

  function reset(): void {
    openList.elements = [];
    closedList = [];
    path = [];
    setClosedList([]);
    setPath([]);

    for (let i = 0; i < grid.length; i++) {
      for (let j = 0; j < grid[i].length; j++) {
        grid[i][j].isClosed = false;
      }
    }
  }

  function isDiscovered(neighbor: Node): boolean {
    for (let i = 0; i < openList.elements.length; i++) {
      if (openList.elements[i] === neighbor) {
        return true;
      }
    }
    return false;
  }

  function pathfind(): void {
    if (algorithm === 'astar') {
      openList.enqueue(grid[startNode[0]][startNode[1]]);

      const interval = setInterval(() => {
        let currentNode: any = openList.dequeue();
        closedList.push(currentNode);
        currentNode.isClosed = true;
        setClosedList([...closedList, currentNode]);

        if (isEqualsArray([currentNode.x, currentNode.y], endNode)) {
          clearInterval(interval);
          let current = currentNode;
          let nestedInterval = setInterval(() => {
            if (current.parentNode !== null) {
              setPath([...path, [current.x, current.y]]);
              path.push([current.x, current.y]);
              current = current.parentNode;
            } else {
              clearInterval(nestedInterval);
            }
          }, 25);
        }

        let neighbors: Node[] = currentNode.findNearestNeighbors(grid);
        for (let neighbor of neighbors) {
          if (neighbor.isClosed || !neighbor.walkable) {
            continue;
          }

          const tentativeScoreG = currentNode.gScore + 1;
          if (!isDiscovered(neighbor)) {
            neighbor.gScore = tentativeScoreG;
            neighbor.hScore = neighbor.calculateDistance(endNode);
            neighbor.fScore = neighbor.gScore + neighbor.hScore;
            neighbor.parentNode = currentNode;
            openList.enqueue(neighbor);
          } else if (tentativeScoreG < neighbor.gScore) {
            neighbor.gScore = tentativeScoreG;
            neighbor.hScore = neighbor.calculateDistance(endNode);
            neighbor.fScore = neighbor.gScore + neighbor.hScore;
            neighbor.parentNode = currentNode;
          }
        }

        if (!openList.elements.length) {
          clearInterval(interval);
          console.log('NO PATH');
        }
      }, 10);
    }
  }

  return { setParameters, pathfind, reset, closedList, path };
}

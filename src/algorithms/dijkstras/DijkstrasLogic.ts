import React, { useState } from 'react';
import { Vertex } from './Vertex';

export default function DijkstrasLogic(algorithm: string) {
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

  let grid: Vertex[][] = [];
  let startNode: number[] = [];
  let endNode: number[] = [];

  let [queue, setQueue] = useState<PriorityQueue>(new PriorityQueue((a: Vertex, b: Vertex) => a.distance - b.distance));
  let [optimizedList, setOptimizedList] = useState<Vertex[]>([]);

  function setParameters(gridTemplate: any, startNodeTemplate: number[], endNodeTemplate: number[]) {
    grid = gridTemplate;
    startNode = startNodeTemplate;
    endNode = endNodeTemplate;
  }

  function reset(): void {
    setQueue(new PriorityQueue((a: Vertex, b: Vertex) => a.distance - b.distance));
    setOptimizedList([]);
  }

  function pathfind(): void {
    if (algorithm === 'dijkstra') {
      console.log('Start Algorithm!');
    }
  }

  return { setParameters, pathfind, reset };
}

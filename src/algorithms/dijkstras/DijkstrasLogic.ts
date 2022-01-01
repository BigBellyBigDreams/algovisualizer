import React, { useState } from 'react';

export default function DijkstrasLogic(algorithm: string) {
  let grid: Node[][] = [];
  let walls: Node[] = [];
  let startNode: number[] = [];
  let endNode: number[] = [];

  function setParameters(gridTemplate: any, wallsTemplate: any, startNodeTemplate: number[], endNodeTemplate: number[]) {
    grid = gridTemplate;
    walls = wallsTemplate;
    startNode = startNodeTemplate;
    endNode = endNodeTemplate;
  }

  function pathfind() {
    if (algorithm === 'dijkstra') {
      console.log('Start Algorithm!');
    }
  }

  return { setParameters, pathfind };
}

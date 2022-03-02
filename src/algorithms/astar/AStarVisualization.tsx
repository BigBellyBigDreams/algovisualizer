import React from 'react';
import Grid from '../../Grid';
import { Node } from './Node';

import AStarLogic from './AStarLogic';
export default function AStar({
  algorithm,
  algorithmSpeed,
}: {
  algorithm: string;
  algorithmSpeed: number;
}): JSX.Element {
  const { setParameters, pathfind, reset, path } = AStarLogic(algorithm, algorithmSpeed);

  function sendGridData(grid: Node[][], startNode: number[], endNode: number[]) {
    setParameters(grid, startNode, endNode);
  }

  return (
    <div>
      <Grid algorithm={algorithm} sendGridData={sendGridData} pathfind={pathfind} reset={reset} path={path} />
    </div>
  );
}

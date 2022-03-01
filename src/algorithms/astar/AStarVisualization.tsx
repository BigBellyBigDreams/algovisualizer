import React from 'react';
import Grid from '../../Grid';
import { Node } from './Node';

import AStarLogic from './AStarLogic';
export default function AStar({ algorithm }: { algorithm: string }): JSX.Element {
  const { setParameters, pathfind, reset, path } = AStarLogic(algorithm);

  function sendGridData(grid: Node[][], startNode: number[], endNode: number[]) {
    setParameters(grid, startNode, endNode);
  }

  return (
    <div>
      <Grid algorithm={algorithm} sendGridData={sendGridData} pathfind={pathfind} reset={reset} path={path} />
    </div>
  );
}

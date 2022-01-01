import React from 'react';
import Grid from '../../Grid';
import { Node } from './Node';

import AStarLogic from './AStarLogic';
export default function AStar({ algorithm }: { algorithm: string }): JSX.Element {
  const { setParameters, pathfind, closedList, path } = AStarLogic(algorithm);

  function sendGridData(grid: Node[][], walls: Node[], startNode: number[], endNode: number[]) {
    setParameters(grid, walls, startNode, endNode);
  }

  return (
    <div>
      <Grid algorithm={algorithm} sendGridData={sendGridData} pathfind={pathfind} closedList={closedList} path={path} />
    </div>
  );
}

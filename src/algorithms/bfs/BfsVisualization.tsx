import React, { useEffect } from 'react';
import Grid from '../../Grid';
import BfsLogic from './BfsLogic';
import { NodeBfs } from './NodeBfs';

export default function BfsVisualization({ algorithm, algorithmSpeed }: { algorithm: string; algorithmSpeed: number }) {
  const { setParameters, pathfind, reset, path } = BfsLogic(algorithm, algorithmSpeed);

  function sendGridData(grid: NodeBfs[][], startNode: number[], endNode: number[]) {
    setParameters(grid, startNode, endNode);
  }

  return (
    <div>
      <Grid algorithm={algorithm} sendGridData={sendGridData} pathfind={pathfind} reset={reset} path={path} />
    </div>
  );
}

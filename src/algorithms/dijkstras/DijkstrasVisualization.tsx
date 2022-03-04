import React from 'react';
import Grid from '../../grid/Grid';
import DijkstrasLogic from './DijkstrasLogic';
import { Vertex } from './Vertex';

export default function DijkstrasVisualization({
  algorithm,
  algorithmSpeed,
}: {
  algorithm: string;
  algorithmSpeed: number;
}): JSX.Element {
  const { setParameters, pathfind, reset, path } = DijkstrasLogic(algorithm, algorithmSpeed);

  function sendGridData(grid: Vertex[][], startNode: number[], endNode: number[]) {
    setParameters(grid, startNode, endNode);
  }

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Grid algorithm={algorithm} sendGridData={sendGridData} pathfind={pathfind} reset={reset} path={path} />
    </div>
  );
}

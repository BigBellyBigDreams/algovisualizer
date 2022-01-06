import React from 'react';
import Grid from '../../Grid';
import DijkstrasLogic from './DijkstrasLogic';
import { Vertex } from './Vertex';

export default function DijkstrasVisualization({ algorithm }: { algorithm: string }): JSX.Element {
  const { setParameters, pathfind, reset } = DijkstrasLogic(algorithm);

  function sendGridData(grid: Vertex[][], startNode: number[], endNode: number[]) {
    setParameters(grid, startNode, endNode);
  }

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Grid algorithm={algorithm} sendGridData={sendGridData} pathfind={pathfind} reset={reset} />
    </div>
  );
}

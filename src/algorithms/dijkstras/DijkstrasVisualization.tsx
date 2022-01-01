import React from 'react';
import Grid from '../../Grid';
import DijkstrasLogic from './DijkstrasLogic';
export default function DijkstrasVisualization({ algorithm }: { algorithm: string }): JSX.Element {
  const { setParameters, pathfind } = DijkstrasLogic(algorithm);

  function sendGridData(grid: Node[][], walls: Node[], startNode: number[], endNode: number[]) {
    setParameters(grid, walls, startNode, endNode);
  }

  return (
    <div>
      <Grid algorithm={algorithm} sendGridData={sendGridData} pathfind={pathfind} />
    </div>
  );
}

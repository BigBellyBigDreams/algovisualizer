import React, { useContext } from 'react';
import Grid from '../../grid/Grid';
import AStarLogic from './AStarLogic';
import { AppContext } from '../../context/myContext';

export default function AStar(): JSX.Element {
  const { algorithm, algorithmSpeed }: any = useContext(AppContext);
  const { pathfind, reset } = AStarLogic(algorithm, algorithmSpeed);

  return (
    <div>
      <Grid pathfind={pathfind} reset={reset} />
    </div>
  );
}

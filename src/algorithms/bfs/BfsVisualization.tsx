import React, { useContext } from 'react';
import Grid from '../../grid/Grid';
import BfsLogic from './BfsLogic';
import { AppContext } from '../../context/myContext';

export default function BfsVisualization() {
  const { algorithm, algorithmSpeed }: any = useContext(AppContext);
  const { pathfind, reset } = BfsLogic(algorithm, algorithmSpeed);

  return (
    <div>
      <Grid pathfind={pathfind} reset={reset} />
    </div>
  );
}

import { useContext } from 'react';
import Grid from '../../grid/Grid';
import DijkstrasLogic from './DijkstrasLogic';
import { AppContext } from '../../context/myContext';

export default function DijkstrasVisualization(): JSX.Element {
  const { algorithm, algorithmSpeed }: any = useContext(AppContext);
  const { pathfind, reset } = DijkstrasLogic(algorithm, algorithmSpeed);

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Grid pathfind={pathfind} reset={reset} />
    </div>
  );
}

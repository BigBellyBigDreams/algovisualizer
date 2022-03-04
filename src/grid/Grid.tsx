import { useContext } from 'react';
import { AppContext } from '../context/myContext';
import AStarNode from '../algorithms/astar/AStarNode';
import DijkstraNode from '../algorithms/dijkstras/DijkstraNode';
import BfsNode from '../algorithms/bfs/BfsNode';
import GridButtons from '../components/GridButtons';

import './grid.css';

interface PropType {
  pathfind: () => void;
  reset: () => void;
}

export default function Grid(props: PropType): JSX.Element {
  let { numCols, grid, algorithm }: any = useContext(AppContext);

  return (
    <div>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${numCols}, 25px)`,
          justifyContent: 'center',
          marginTop: '1em',
        }}
      >
        {grid.map((rows: any, i: number) => {
          return (
            <div key={i}>
              {rows.map((cols: any, j: number) => {
                return (
                  <div key={j}>
                    {algorithm === 'astar' ? (
                      <AStarNode row={i} col={j} />
                    ) : algorithm === 'dijkstra' ? (
                      <DijkstraNode row={i} col={j} />
                    ) : algorithm === 'bfs' ? (
                      <BfsNode row={i} col={j} />
                    ) : (
                      <div>Hello World</div>
                    )}
                  </div>
                );
              })}
            </div>
          );
        })}

        <div>
          <GridButtons pathfind={props.pathfind} reset={props.reset} />
        </div>
      </div>
    </div>
  );
}

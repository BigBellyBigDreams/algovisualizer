import { useContext } from 'react';
import { AppContext } from '../context/myContext';
import { isEqualsArray, isPath } from '../helpers';
import GridButtons from '../components/GridButtons';

import './grid.css';

interface PropType {
  pathfind: () => void;
  reset: () => void;
}

export default function Grid(props: PropType): JSX.Element {
  let {
    algorithm,
    numCols,
    grid,
    toggleStart,
    toggleGoal,
    isDrawing,
    startNode,
    endNode,
    createWall,
    deleteWall,
    setStart,
    setGoal,
    path,
  }: any = useContext(AppContext);

  let GridTileStyle = {
    width: '20px',
    height: '20px',
    border: '1px solid black',
  };

  return (
    <div>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${numCols}, 20px)`,
          justifyContent: 'center',
          marginTop: '2em',
        }}
      >
        {grid.map((rows: number[][], row: number) => {
          return (
            <div key={row}>
              {rows.map((cols: number[], col: number) => {
                return (
                  <div key={col}>
                    <div
                      onMouseMove={(e) => {
                        if (e.buttons === 1) {
                          if (!toggleStart) {
                            if (!toggleGoal) {
                              if (isDrawing) {
                                if (!isEqualsArray(startNode, [grid[row][col].x, grid[row][col].y])) {
                                  if (!isEqualsArray(endNode, [grid[row][col].x, grid[row][col].y])) {
                                    createWall(row, col);
                                    grid[row][col].walkable = false;
                                  }
                                }
                              } else {
                                deleteWall(row, col);
                                grid[row][col].walkable = true;
                              }
                            }
                          }
                        }
                      }}
                      onMouseDown={() => {
                        if (toggleStart && grid[row][col].walkable) {
                          setStart([row, col]);
                        } else if (toggleGoal && grid[row][col].walkable) {
                          setGoal([row, col]);
                        }
                      }}
                      style={
                        algorithm === 'astar'
                          ? {
                              ...GridTileStyle,
                              backgroundColor: !grid[row][col].walkable
                                ? '#A9A9A9'
                                : isEqualsArray(startNode, [grid[row][col].x, grid[row][col].y])
                                ? 'green'
                                : isEqualsArray(endNode, [grid[row][col].x, grid[row][col].y])
                                ? 'red'
                                : isPath(row, col, path)
                                ? 'pink'
                                : grid[row][col].isClosed
                                ? 'blue'
                                : grid[row][col].isDiscovered
                                ? 'yellow'
                                : 'white',
                            }
                          : algorithm === 'dijkstra'
                          ? {
                              ...GridTileStyle,
                              backgroundColor: !grid[row][col].walkable
                                ? '#A9A9A9'
                                : isEqualsArray(startNode, [grid[row][col].x, grid[row][col].y])
                                ? 'green'
                                : isEqualsArray(endNode, [grid[row][col].x, grid[row][col].y])
                                ? 'red'
                                : isPath(row, col, path)
                                ? 'pink'
                                : grid[row][col].toBeChecked
                                ? 'yellow'
                                : grid[row][col].isVisited
                                ? 'blue'
                                : 'white',
                            }
                          : algorithm === 'bfs'
                          ? {
                              ...GridTileStyle,
                              backgroundColor: !grid[row][col].walkable
                                ? '#A9A9A9'
                                : isEqualsArray(startNode, [grid[row][col].x, grid[row][col].y])
                                ? 'green'
                                : isEqualsArray(endNode, [grid[row][col].x, grid[row][col].y])
                                ? 'red'
                                : isPath(row, col, path)
                                ? 'pink'
                                : grid[row][col].nextBest
                                ? 'blue'
                                : grid[row][col].examined
                                ? 'yellow'
                                : 'white',
                            }
                          : {}
                      }
                    ></div>
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

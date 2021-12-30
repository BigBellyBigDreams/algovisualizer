import React from 'react';
import './grid.css';
import GridLogic from './GridLogic';
import { isEqualsArray } from './helpers';

export default function Grid({ algorithm }: any): JSX.Element {
  const {
    grid,
    startNode,
    endNode,
    toggleStart,
    toggleGoal,
    isDrawing,
    numCols,
    isWalked,
    isPath,
    setStart,
    setGoal,
    changeDrawingTool,
    createWall,
    deleteWall,
    isWall,
    clearGrid,
    pathfind,
  } = GridLogic();

  return (
    <div style={{ display: 'grid', gridTemplateColumns: `repeat(${numCols}, 20px)` }}>
      {grid.map((rows, i) => {
        return (
          <div key={i}>
            {rows.map((cols, j) => {
              return (
                <div
                  key={j}
                  onMouseMove={(e) => {
                    if (e.buttons === 1) {
                      if (!toggleStart) {
                        if (!toggleGoal) {
                          if (isDrawing) {
                            if (!isEqualsArray(startNode, [grid[i][j].x, grid[i][j].y])) {
                              if (!isEqualsArray(endNode, [grid[i][j].x, grid[i][j].y])) {
                                createWall(i, j);
                              }
                            }
                          } else {
                            deleteWall(i, j);
                          }
                        }
                      }
                    }
                  }}
                  onMouseDown={() => {
                    if (toggleStart && !isWall(i, j)) {
                      setStart([i, j]);
                    } else if (toggleGoal && !isWall(i, j)) {
                      setGoal([i, j]);
                    }
                  }}
                  style={{
                    width: '20px',
                    height: '20px',
                    border: '1px solid black',
                    backgroundColor: isWall(i, j)
                      ? '#A9A9A9'
                      : isEqualsArray(startNode, [grid[i][j].x, grid[i][j].y])
                      ? 'green'
                      : isEqualsArray(endNode, [grid[i][j].x, grid[i][j].y])
                      ? 'red'
                      : isPath(i, j)
                      ? 'pink'
                      : isWalked(i, j)
                      ? 'blue'
                      : 'white',
                  }}
                ></div>
              );
            })}
          </div>
        );
      })}

      <div style={{ display: 'flex' }}>
        <button
          className={'grid-buttons'}
          onClick={() => {
            changeDrawingTool(true, false, false);
          }}
        >
          Draw Walls
        </button>
        <button
          className={'grid-buttons'}
          onClick={() => {
            changeDrawingTool(false, false, false);
          }}
        >
          Erase
        </button>
        <button
          className={'grid-buttons'}
          onClick={() => {
            changeDrawingTool(false, true, false);
          }}
        >
          Set Start
        </button>
        <button
          className={'grid-buttons'}
          onClick={() => {
            changeDrawingTool(false, false, true);
          }}
        >
          Set Goal
        </button>
        <button
          className={'grid-buttons'}
          onClick={() => {
            clearGrid();
          }}
        >
          Clear Grid
        </button>
        <button
          className={'grid-buttons'}
          style={{ backgroundColor: 'green', color: 'white' }}
          onClick={() => {
            pathfind();
          }}
        >
          Visualize!
        </button>
      </div>
    </div>
  );
}

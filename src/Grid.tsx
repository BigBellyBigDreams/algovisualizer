import React from 'react';
import './grid.css';
import GridLogic from './GridLogic';

export default function Grid(): JSX.Element {
  const {
    grid,
    startNode,
    endNode,
    toggleStart,
    toggleGoal,
    isDrawing,
    numCols,
    highlightNode,
    setStart,
    setGoal,
    changeDrawingTool,
    isEqualsArray,
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
                      if (isDrawing) {
                        if (!isEqualsArray(startNode, [grid[i][j].x, grid[i][j].y])) {
                          if (!isEqualsArray(endNode, [grid[i][j].x, grid[i][j].y])) {
                            highlightNode(i, j, true);
                          }
                        }
                      } else {
                        highlightNode(i, j, false);
                      }
                    }
                  }}
                  onMouseDown={() => {
                    if (toggleStart) {
                      setStart([i, j]);
                    } else if (toggleGoal) {
                      setGoal([i, j]);
                    }
                  }}
                  style={{
                    width: '20px',
                    height: '20px',
                    border: '1px solid black',
                    backgroundColor: grid[i][j].isWall
                      ? '#A9A9A9'
                      : isEqualsArray(startNode, [grid[i][j].x, grid[i][j].y])
                      ? 'green'
                      : isEqualsArray(endNode, [grid[i][j].x, grid[i][j].y])
                      ? 'red'
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
      </div>
    </div>
  );
}

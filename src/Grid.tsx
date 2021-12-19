import React, { useEffect, useState } from 'react';
import produce from 'immer';
import { Node } from './astar';

export default function Grid(): JSX.Element {
  const [grid, setGrid] = useState<Node[][]>([]);
  const [isDrawing, setIsDrawing] = useState(true);
  const numCols = 50;

  useEffect(() => {
    let tempGrid: Node[][] = [];
    for (let i = 0; i < numCols; i++) {
      tempGrid.push([]);
    }

    for (let i = 0; i < tempGrid.length; i++) {
      for (let j = 0; j < tempGrid.length / 2; j++) {
        let node = new Node(i, j, false);
        tempGrid[i][j] = node;
      }
    }
    setGrid(tempGrid);
  }, []);

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
                    if (e.buttons == 1) {
                      if (isDrawing) {
                        setGrid((prev) =>
                          prev.map((el, index) => {
                            if (i !== index) return el;

                            return el.map((el2, index2) => {
                              if (j !== index2) return el2;

                              return {
                                ...el2,
                                isWall: true,
                              };
                            });
                          })
                        );
                      } else {
                        setGrid((prev) =>
                          prev.map((el, index) => {
                            if (i !== index) return el;

                            return el.map((el2, index2) => {
                              if (j !== index2) return el2;

                              return {
                                ...el2,
                                isWall: false,
                              };
                            });
                          })
                        );
                      }
                    }
                  }}
                  style={{ width: '20px', height: '20px', border: '1px solid black', backgroundColor: grid[i][j].isWall ? '#A9A9A9' : '#FFFFFF' }}
                ></div>
              );
            })}
          </div>
        );
      })}

      <div style={{ display: 'flex' }}>
        <button
          style={{ width: 'fit-content' }}
          onClick={() => {
            setIsDrawing(true);
          }}
        >
          Draw Walls
        </button>
        <button
          style={{ width: 'fit-content' }}
          onClick={() => {
            setIsDrawing(false);
          }}
        >
          Erase
        </button>
      </div>
    </div>
  );
}

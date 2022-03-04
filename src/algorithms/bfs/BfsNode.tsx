import React from 'react';
import { GridType } from '../../types';
import { NodeBfs } from './NodeBfs';
import { isEqualsArray, isPath } from '../../helpers';

interface BfsPropType extends GridType {
  grid: NodeBfs[][];
  path: NodeBfs[];
}

export default function BfsNode({
  grid,
  row,
  col,
  startNode,
  endNode,
  toggleStart,
  toggleGoal,
  isDrawing,
  path,
  setStart,
  setGoal,
  createWall,
  deleteWall,
}: BfsPropType): JSX.Element {
  return (
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
      style={{
        width: '25px',
        height: '25px',
        border: '1px solid black',
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
      }}
    ></div>
  );
}
import React from 'react';
import { Node } from './Node';
import { GridType } from '../../types';
import { isEqualsArray, isPath } from '../../helpers';

interface NodePropType extends GridType {
  grid: Node[][];
  path: Node[];
}

export default function NodeComponent({
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
}: NodePropType): JSX.Element {
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
        if (grid[row][col].isClosed) {
          console.log(grid[row][col]);
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
          : grid[row][col].isClosed
          ? 'blue'
          : 'white',
      }}
    ></div>
  );
}

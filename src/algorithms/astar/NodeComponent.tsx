import React from 'react';
import { isEqualsArray, isWalked, isWall, isPath } from '../../helpers';

interface NodePropType {
  grid: any;
  row: any;
  col: any;
  startNode: any;
  endNode: any;
  toggleStart: any;
  toggleGoal: any;
  isDrawing: any;
  path: any;
  walls: any;
  closedList: any;
  setStart: (value: number[]) => void;
  setGoal: (value: number[]) => void;
  createWall: (row: number, col: number) => void;
  deleteWall: (row: number, col: number) => void;
}

export default function Node({
  grid,
  row,
  col,
  startNode,
  endNode,
  toggleStart,
  toggleGoal,
  isDrawing,
  path,
  walls,
  closedList,
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
                  }
                }
              } else {
                deleteWall(row, col);
              }
            }
          }
        }
      }}
      onMouseDown={() => {
        if (toggleStart && !isWall(row, col, walls)) {
          setStart([row, col]);
        } else if (toggleGoal && !isWall(row, col, walls)) {
          setGoal([row, col]);
        }
      }}
      style={{
        width: '20px',
        height: '20px',
        border: '1px solid black',
        backgroundColor: isWall(row, col, walls)
          ? '#A9A9A9'
          : isEqualsArray(startNode, [grid[row][col].x, grid[row][col].y])
          ? 'green'
          : isEqualsArray(endNode, [grid[row][col].x, grid[row][col].y])
          ? 'red'
          : isPath(row, col, path)
          ? 'pink'
          : isWalked(row, col, closedList)
          ? 'blue'
          : 'white',
      }}
    ></div>
  );
}

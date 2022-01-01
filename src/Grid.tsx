import React from 'react';
import './grid.css';
import NodeComponent from './algorithms/astar/NodeComponent';
import VertexComponent from './algorithms/dijkstras/VertexComponent';
import GridLogic from './GridLogic';
import { isWalked, isWall } from './helpers';

interface PropType {
  algorithm: string;
  sendGridData: (grid: any, walls: any, startNode: any, endNode: any) => void;
  pathfind: (isWalked: any, isWall: any) => void;
  closedList?: any;
  path?: any;
}

export default function Grid(props: PropType): JSX.Element {
  const {
    grid,
    walls,
    startNode,
    endNode,
    toggleStart,
    toggleGoal,
    isDrawing,
    numCols,
    setStart,
    setGoal,
    changeDrawingTool,
    createWall,
    deleteWall,
    clearGrid,
  } = GridLogic(props.algorithm);

  return (
    <div style={{ display: 'grid', gridTemplateColumns: `repeat(${numCols}, 20px)` }}>
      {grid.map((rows, i: number) => {
        return (
          <div>
            {rows.map((cols, j: number) => {
              return (
                <div>
                  {props.algorithm === 'astar' ? (
                    <NodeComponent
                      key={j}
                      grid={grid}
                      row={i}
                      col={j}
                      startNode={startNode}
                      endNode={endNode}
                      toggleStart={toggleStart}
                      toggleGoal={toggleGoal}
                      isDrawing={isDrawing}
                      path={props.path}
                      walls={walls}
                      closedList={props.closedList}
                      setStart={setStart}
                      setGoal={setGoal}
                      createWall={createWall}
                      deleteWall={deleteWall}
                    />
                  ) : (
                    <VertexComponent />
                  )}
                </div>
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
            props.sendGridData(grid, walls, startNode, endNode);
            if (props.algorithm === 'astar') {
              props.pathfind(isWalked, isWall);
            }
          }}
        >
          Visualize!
        </button>
      </div>
    </div>
  );
}

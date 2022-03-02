import React, { useEffect } from 'react';
import './grid.css';
import AStarNode from './algorithms/astar/AStarNode';
import DijkstraNode from './algorithms/dijkstras/DijkstraNode';
import BfsNode from './algorithms/bfs/BfsNode';
import GridLogic from './GridLogic';

interface PropType {
  algorithm: string;
  sendGridData: (grid: any, startNode: number[], endNode: number[]) => void;
  pathfind: () => void;
  reset: () => void;

  path?: any;
}

export default function Grid(props: PropType): JSX.Element {
  const {
    grid,
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
    <div>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${numCols}, 25px)`,
          justifyContent: 'center',
          marginTop: '1em',
        }}
      >
        {grid.map((rows, i: number) => {
          return (
            <div key={i}>
              {rows.map((cols, j: number) => {
                return (
                  <div key={j}>
                    {props.algorithm === 'astar' ? (
                      <AStarNode
                        // @ts-ignore
                        grid={grid}
                        row={i}
                        col={j}
                        startNode={startNode}
                        endNode={endNode}
                        toggleStart={toggleStart}
                        toggleGoal={toggleGoal}
                        isDrawing={isDrawing}
                        path={props.path}
                        setStart={setStart}
                        setGoal={setGoal}
                        createWall={createWall}
                        deleteWall={deleteWall}
                      />
                    ) : props.algorithm === 'dijkstra' ? (
                      <DijkstraNode
                        // @ts-ignore
                        grid={grid}
                        row={i}
                        col={j}
                        startNode={startNode}
                        endNode={endNode}
                        toggleStart={toggleStart}
                        toggleGoal={toggleGoal}
                        isDrawing={isDrawing}
                        path={props.path}
                        setStart={setStart}
                        setGoal={setGoal}
                        createWall={createWall}
                        deleteWall={deleteWall}
                      />
                    ) : props.algorithm == 'bfs' ? (
                      <BfsNode
                        // @ts-ignore
                        grid={grid}
                        row={i}
                        col={j}
                        startNode={startNode}
                        endNode={endNode}
                        toggleStart={toggleStart}
                        toggleGoal={toggleGoal}
                        isDrawing={isDrawing}
                        path={props.path}
                        setStart={setStart}
                        setGoal={setGoal}
                        createWall={createWall}
                        deleteWall={deleteWall}
                      />
                    ) : (
                      <div>Hello World</div>
                    )}
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
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
            props.reset();
          }}
        >
          Clear Grid
        </button>
        <button
          className={'grid-buttons'}
          style={{ backgroundColor: 'green', color: 'white' }}
          onClick={() => {
            // Sends state of grid to selected algorithm component and visualizes
            props.sendGridData(grid, startNode, endNode);
            props.reset();
            props.pathfind();
          }}
        >
          Visualize!
        </button>
      </div>
    </div>
  );
}

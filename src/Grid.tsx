import React from 'react';
import './grid.css';
import NodeComponent from './algorithms/astar/NodeComponent';
import VertexComponent from './algorithms/dijkstras/VertexComponent';
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
          marginTop: '5em',
        }}
      >
        {grid.map((rows, i: number) => {
          return (
            <div key={i}>
              {rows.map((cols, j: number) => {
                return (
                  <div key={j}>
                    {/* Generates grid tiles based on the algorithm selected by user */}
                    {props.algorithm === 'astar' ? (
                      <NodeComponent
                        // ***FIX***
                        //@ts-ignore
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
                      <VertexComponent
                        // ***FIX***
                        //@ts-ignore
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
                      'placeholder'
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

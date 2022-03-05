import { useState, useEffect } from 'react';
import { GridTiles } from './types';
import { Node } from './algorithms/astar/Node';
import { Vertex } from './algorithms/dijkstras/Vertex';
import { NodeBfs } from './algorithms/bfs/NodeBfs';
import { isEqualsArray } from './helpers';

export default function AppLogic() {
  let numCols = 50;
  let [algorithm, setAlgorithm] = useState<string>('astar');
  let [algorithmSpeed, setAlgorithmSpeed] = useState<number>(1);
  let [grid, setGrid] = useState<GridTiles>([]);
  let [walls, setWalls] = useState<number[][]>([]);
  let [path, setPath] = useState<number[][]>([]);
  let [startNode, setStartNode] = useState<number[]>([15, 13]);
  let [endNode, setEndNode] = useState<number[]>([35, 13]);
  let [isDrawing, setIsDrawing] = useState(true);
  let [toggleStart, setToggleStart] = useState(false);
  let [toggleGoal, setToggleGoal] = useState(false);

  useEffect(() => {
    createGrid();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    setPath([]);
    createGrid();
  }, [algorithm]);

  function createGrid() {
    let tempGrid: GridTiles = [];
    for (let i = 0; i < numCols; i++) {
      tempGrid.push([]);
    }

    for (let i = 0; i < tempGrid.length; i++) {
      for (let j = 0; j < tempGrid.length / 2; j++) {
        let GridTile;
        if (algorithm === 'astar') {
          GridTile = new Node(i, j);
          tempGrid[i][j] = GridTile;
        } else if (algorithm === 'dijkstra') {
          GridTile = new Vertex(i, j);
          tempGrid[i][j] = GridTile;
        } else if (algorithm === 'bfs') {
          GridTile = new NodeBfs(i, j);
          tempGrid[i][j] = GridTile;
        }
      }
    }

    setGrid(tempGrid);
    setWalls([]);
  }

  function clearGrid(): void {
    createGrid();
    setWalls([]);
  }

  function createWall(row: number, col: number): void {
    setWalls([...walls, [row, col]]);
  }

  function deleteWall(row: number, col: number): void {
    let tempWalls = [...walls];
    for (let i = 0; i < tempWalls.length; i++) {
      if (isEqualsArray([row, col], tempWalls[i])) {
        tempWalls.splice(i, 1);
      }
    }
    setWalls(tempWalls);
  }

  function changeDrawingTool(isDrawingWall: boolean, isDrawingStart: boolean, isDrawingGoal: boolean): void {
    setIsDrawing(isDrawingWall);
    setToggleStart(isDrawingStart);
    setToggleGoal(isDrawingGoal);
  }

  function setStart(value: number[]): void {
    setStartNode(value);
  }

  function setGoal(value: number[]): void {
    setEndNode(value);
  }

  let vars = {
    algorithm,
    algorithmSpeed,
    grid,
    startNode,
    endNode,
    walls,
    numCols,
    path,
    isDrawing,
    toggleStart,
    toggleGoal,
  };

  let methods = {
    setAlgorithm,
    setAlgorithmSpeed,
    setGrid,
    setStartNode,
    setStart,
    setGoal,
    setEndNode,
    setWalls,
    createGrid,
    setPath,
    setIsDrawing,
    setToggleGoal,
    setToggleStart,
    changeDrawingTool,
    createWall,
    deleteWall,
    clearGrid,
  };

  return { ...vars, ...methods };
}

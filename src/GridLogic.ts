import { useState, useEffect } from 'react';
import { isEqualsArray } from './helpers';
import { Node } from './algorithms/astar/Node';
import { Vertex } from './algorithms/dijkstras/Vertex';
import { GridTiles } from './types';

export default function GridLogic(algorithm: string) {
  const numCols = 50;
  const [grid, setGrid] = useState<GridTiles>([]);
  const [walls, setWalls] = useState<number[][]>([]);
  const [isDrawing, setIsDrawing] = useState(true);
  const [toggleStart, setToggleStart] = useState(false);
  const [toggleGoal, setToggleGoal] = useState(false);
  const [startNode, setStartNode] = useState<number[]>([]);
  const [endNode, setEndNode] = useState<number[]>([]);

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
        }
      }
    }
    setGrid(tempGrid);
  }

  useEffect(() => {
    createGrid();
  }, []);

  function clearGrid(): void {
    createGrid();
    setStartNode([]);
    setEndNode([]);
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

  function setStart(value: number[]): void {
    setStartNode(value);
  }

  function setGoal(value: number[]): void {
    setEndNode(value);
  }

  function changeDrawingTool(isDrawingWall: boolean, isDrawingStart: boolean, isDrawingGoal: boolean): void {
    setIsDrawing(isDrawingWall);
    setToggleStart(isDrawingStart);
    setToggleGoal(isDrawingGoal);
  }

  return {
    grid,
    walls,
    startNode,
    endNode,
    isDrawing,
    numCols,
    toggleStart,
    toggleGoal,
    setStart,
    setGoal,
    changeDrawingTool,
    createWall,
    deleteWall,
    clearGrid,
  };
}

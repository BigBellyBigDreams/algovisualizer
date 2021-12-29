import { useState, useEffect } from 'react';
import { createModuleResolutionCache } from 'typescript';
import { isEqualsArray } from './helpers';
import { Node } from './nodes';

export default function GridLogic() {
  const numCols = 50;
  const [grid, setGrid] = useState<Node[][]>([]);
  const [walls, setWalls] = useState<number[][]>([]);
  const [path, setPath] = useState<number[][]>([]);
  const [isDrawing, setIsDrawing] = useState(true);
  const [toggleStart, setToggleStart] = useState(false);
  const [toggleGoal, setToggleGoal] = useState(false);
  const [startNode, setStartNode] = useState<number[]>([]);
  const [endNode, setEndNode] = useState<number[]>([]);

  let [openList, setOpenList] = useState<Node[]>([]);
  let [closedList, setClosedList] = useState<Node[]>([]);

  useEffect(() => {
    let tempGrid: Node[][] = [];
    for (let i = 0; i < numCols; i++) {
      tempGrid.push([]);
    }

    for (let i = 0; i < tempGrid.length; i++) {
      for (let j = 0; j < tempGrid.length / 2; j++) {
        let node = new Node(i, j, null);
        tempGrid[i][j] = node;
      }
    }
    setGrid(tempGrid);
  }, []);

  function clearGrid() {
    let tempGrid: Node[][] = [];
    for (let i = 0; i < numCols; i++) {
      tempGrid.push([]);
    }

    for (let i = 0; i < tempGrid.length; i++) {
      for (let j = 0; j < tempGrid.length / 2; j++) {
        let node = new Node(i, j, null);
        tempGrid[i][j] = node;
      }
    }

    setStartNode([]);
    setEndNode([]);
    setOpenList([]);
    setClosedList([]);
    setPath([]);
    setWalls([]);

    setGrid(tempGrid);
  }

  function createWall(row: number, col: number) {
    setWalls([...walls, [row, col]]);
  }

  function deleteWall(row: number, col: number) {
    let tempWalls = [...walls];
    for (let i = 0; i < tempWalls.length; i++) {
      if (isEqualsArray([row, col], tempWalls[i])) {
        tempWalls.splice(i, 1);
      }
    }
    setWalls(tempWalls);
  }

  function setStart(value: number[]) {
    setStartNode(value);
  }

  function setGoal(value: number[]) {
    setEndNode(value);
  }

  function changeDrawingTool(isDrawingWall: boolean, isDrawingStart: boolean, isDrawingGoal: boolean) {
    setIsDrawing(isDrawingWall);
    setToggleStart(isDrawingStart);
    setToggleGoal(isDrawingGoal);
  }

  function isWall(row: number, col: number) {
    for (let i = 0; i < walls.length; i++) {
      if (isEqualsArray(walls[i], [row, col])) {
        return true;
      }
    }
    return false;
  }

  function isPath(row: number, col: number) {
    for (let i = 0; i < path.length; i++) {
      if (isEqualsArray([path[i][0], path[i][1]], [row, col])) {
        return true;
      }
    }
    return false;
  }

  function isWalked(row: number, col: number) {
    for (let i = 0; i < closedList.length; i++) {
      if (isEqualsArray([closedList[i].x, closedList[i].y], [row, col])) {
        return true;
      }
    }
    return false;
  }

  function isDiscovered(neighbor: Node) {
    for (let i = 0; i < openList.length; i++) {
      if (openList[i] == neighbor) {
        return true;
      }
    }
    return false;
  }

  function pathfind() {
    setOpenList([...openList, grid[startNode[0]][startNode[1]]]);
    openList = [...openList, grid[startNode[0]][startNode[1]]];
    while (openList.length) {
      let currentNode = openList[0];
      let currentNodeIndex = 0;
      for (let i = 0; i < openList.length; i++) {
        if (openList[i].fScore < currentNode.fScore) {
          currentNode = openList[i];
          currentNodeIndex = i;
        }
      }

      let tempOpenList = [...openList];
      tempOpenList.splice(currentNodeIndex, 1);
      openList.splice(currentNodeIndex, 1);
      setOpenList(tempOpenList);
      setClosedList([...closedList, currentNode]);
      closedList.push(currentNode);

      if (isEqualsArray([currentNode.x, currentNode.y], endNode)) {
        let current = currentNode;
        while (current.parentNode !== null) {
          setPath([...path, [current.x, current.y]]);
          path.push([current.x, current.y]);
          current = current.parentNode;
        }
        break;
      }

      let neighbors = currentNode.findNearestNeighbors(grid);
      for (let i = 0; i < neighbors.length; i++) {
        if (isWalked(neighbors[i].x, neighbors[i].y) || isWall(neighbors[i].x, neighbors[i].y)) {
          continue;
        }

        neighbors[i].calculateScoreG(currentNode);
        neighbors[i].calculateScoreH(grid, endNode);
        neighbors[i].calculateScoreF();

        const tentativeScoreG = currentNode.gScore;
        if (tentativeScoreG < neighbors[i].gScore) {
          neighbors[i].parentNode = currentNode;
          neighbors[i].gScore = tentativeScoreG;
          neighbors[i].fScore = tentativeScoreG + neighbors[i].hScore;
          if (!isDiscovered(neighbors[i])) {
            setOpenList([...openList, neighbors[i]]);
            openList.push(neighbors[i]);
          }
        }

        setOpenList([...openList, neighbors[i]]);
        openList.push(neighbors[i]);
        neighbors[i].parentNode = currentNode;
      }
    }

    if (!openList.length) {
      console.log('NO PATH');
    }
  }

  return {
    grid,
    startNode,
    endNode,
    isDrawing,
    numCols,
    toggleStart,
    toggleGoal,
    isWalked,
    isPath,
    setStart,
    setGoal,
    changeDrawingTool,
    createWall,
    deleteWall,
    isWall,
    clearGrid,
    pathfind,
  };
}

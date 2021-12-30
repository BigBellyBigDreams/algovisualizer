import { useState, useEffect } from 'react';
import { isEqualsArray } from './helpers';
import { Node } from './astar/nodes';

export default function GridLogic() {
  const numCols = 50;
  const [grid, setGrid] = useState<Node[][]>([]);
  const [walls, setWalls] = useState<number[][]>([]);
  const [isDrawing, setIsDrawing] = useState(true);
  const [toggleStart, setToggleStart] = useState(false);
  const [toggleGoal, setToggleGoal] = useState(false);
  const [startNode, setStartNode] = useState<number[]>([]);
  const [endNode, setEndNode] = useState<number[]>([]);

  let [openList, setOpenList] = useState<Node[]>([]);
  let [closedList, setClosedList] = useState<Node[]>([]);
  let [path, setPath] = useState<number[][]>([]);

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

  function clearGrid(): void {
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

  function isWall(row: number, col: number): boolean {
    for (let i = 0; i < walls.length; i++) {
      if (isEqualsArray(walls[i], [row, col])) {
        return true;
      }
    }
    return false;
  }

  function isPath(row: number, col: number): boolean {
    for (let i = 0; i < path.length; i++) {
      if (isEqualsArray([path[i][0], path[i][1]], [row, col])) {
        return true;
      }
    }
    return false;
  }

  function isWalked(row: number, col: number): boolean {
    for (let i = 0; i < closedList.length; i++) {
      if (isEqualsArray([closedList[i].x, closedList[i].y], [row, col])) {
        return true;
      }
    }
    return false;
  }

  function isDiscovered(neighbor: Node): boolean {
    for (let i = 0; i < openList.length; i++) {
      if (openList[i] === neighbor) {
        return true;
      }
    }
    return false;
  }

  function pathfind() {
    setOpenList([...openList, grid[startNode[0]][startNode[1]]]);
    openList = [...openList, grid[startNode[0]][startNode[1]]];

    const interval = setInterval(() => {
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
        clearInterval(interval);
        let current = currentNode;
        let nestedInterval = setInterval(() => {
          if (current.parentNode !== null) {
            setPath([...path, [current.x, current.y]]);
            path.push([current.x, current.y]);
            //@ts-ignore
            current = current.parentNode;
          } else {
            clearInterval(nestedInterval);
          }
        }, 50);
      }

      let neighbors = currentNode.findNearestNeighbors(grid);
      for (let neighbor of neighbors) {
        if (isWalked(neighbor.x, neighbor.y) || isWall(neighbor.x, neighbor.y)) {
          continue;
        }

        const tentativeScoreG = currentNode.gScore + 1;
        if (!isDiscovered(neighbor)) {
          setOpenList([...openList, neighbor]);
          openList.push(neighbor);
          neighbor.gScore = tentativeScoreG;
          neighbor.hScore = neighbor.calculateHeuristic(endNode);
          neighbor.fScore = tentativeScoreG + neighbor.hScore;
          neighbor.parentNode = currentNode;
        } else if (tentativeScoreG < neighbor.gScore) {
          neighbor.gScore = tentativeScoreG;
          neighbor.hScore = neighbor.calculateHeuristic(endNode);
          neighbor.fScore = tentativeScoreG + neighbor.hScore;
          neighbor.parentNode = currentNode;
        }
      }
      if (!openList.length) {
        clearInterval(interval);
        console.log('NO PATH');
      }
    }, 10);

    // while (openList.length) {
    //   let currentNode = openList[0];
    //   let currentNodeIndex = 0;
    //   for (let i = 0; i < openList.length; i++) {
    //     if (openList[i].fScore < currentNode.fScore) {
    //       currentNode = openList[i];
    //       currentNodeIndex = i;
    //     }
    //   }

    //   let tempOpenList = [...openList];
    //   tempOpenList.splice(currentNodeIndex, 1);
    //   openList.splice(currentNodeIndex, 1);
    //   setOpenList(tempOpenList);
    //   setClosedList([...closedList, currentNode]);
    //   closedList.push(currentNode);

    //   if (isEqualsArray([currentNode.x, currentNode.y], endNode)) {
    //     let current = currentNode;
    //     while (current.parentNode !== null) {
    //       setPath([...path, [current.x, current.y]]);
    //       path.push([current.x, current.y]);
    //       current = current.parentNode;
    //     }
    //     break;
    //   }

    //   let neighbors = currentNode.findNearestNeighbors(grid);
    //   for (let neighbor of neighbors) {
    //     if (isWalked(neighbor.x, neighbor.y) || isWall(neighbor.x, neighbor.y)) {
    //       continue;
    //     }

    //     const tentativeScoreG = currentNode.gScore + 1;
    //     if (!isDiscovered(neighbor)) {
    //       setOpenList([...openList, neighbor]);
    //       openList.push(neighbor);
    //       neighbor.gScore = tentativeScoreG;
    //       neighbor.hScore = neighbor.calculateHeuristic(endNode);
    //       neighbor.fScore = tentativeScoreG + neighbor.hScore;
    //       neighbor.parentNode = currentNode;
    //     } else if (tentativeScoreG < neighbor.gScore) {
    //       neighbor.gScore = tentativeScoreG;
    //       neighbor.hScore = neighbor.calculateHeuristic(endNode);
    //       neighbor.fScore = tentativeScoreG + neighbor.hScore;
    //       neighbor.parentNode = currentNode;
    //     }
    //   }
    // }

    // if (!openList.length) {
    //   console.log('NO PATH');
    // }
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

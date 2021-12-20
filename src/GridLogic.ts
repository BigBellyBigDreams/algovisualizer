import { useState, useEffect } from 'react';
import { Node } from './astar';

export default function GridLogic() {
  const [grid, setGrid] = useState<Node[][]>([]);
  const [isDrawing, setIsDrawing] = useState(true);
  const [toggleStart, setToggleStart] = useState(false);
  const [toggleGoal, setToggleGoal] = useState(false);
  const [startNode, setStartNode] = useState<number[]>([]);
  const [endNode, setEndNode] = useState<number[]>([]);
  const numCols = 50;

  useEffect(() => {
    let tempGrid: Node[][] = [];
    for (let i = 0; i < numCols; i++) {
      tempGrid.push([]);
    }

    for (let i = 0; i < tempGrid.length; i++) {
      for (let j = 0; j < tempGrid.length / 2; j++) {
        let node = new Node(i, j, false);
        tempGrid[i][j] = node;
      }
    }
    setGrid(tempGrid);
  }, []);

  function highlightNode(row: number, col: number, isWall: boolean) {
    setGrid((prev) =>
      prev.map((el, index) => {
        if (row !== index) return el;

        return el.map((el2, index2) => {
          if (col !== index2) return el2;

          return {
            ...el2,
            isWall,
          };
        });
      })
    );
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

  function isEqualsArray(arrA: number[], arrB: number[]): Boolean {
    if (arrA.length !== arrB.length) {
      return false;
    }
    for (let i = 0; i < arrA.length; i++) {
      if (arrA[i] !== arrB[i]) {
        return false;
      }
    }
    return true;
  }

  return {
    grid,
    startNode,
    endNode,
    isDrawing,
    numCols,
    toggleStart,
    toggleGoal,
    highlightNode,
    setStart,
    setGoal,
    changeDrawingTool,
    isEqualsArray,
  };
}

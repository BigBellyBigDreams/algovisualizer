import React, { useEffect, useState } from 'react';
import { Node } from './astar';
import './index.css';

export default function Grid(): JSX.Element {
  const [grid, setGrid] = useState<Node[][]>([]);

  useEffect(() => {
    let tempGrid: Node[][] = [];
    for (var i = 0; i < 100; i++) {
      tempGrid.push([]);
    }

    for (var i = 0; i < tempGrid.length; i++) {
      for (var j = 0; j < tempGrid.length; j++) {
        let node = new Node(i, j);
        tempGrid[i][j] = node;
      }
    }
    setGrid(tempGrid);
  }, []);

  return <div></div>;
}

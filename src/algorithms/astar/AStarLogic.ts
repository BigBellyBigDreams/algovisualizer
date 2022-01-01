import React, { useState } from 'react';
import { Node } from './Node';
import { isEqualsArray, isWalked, isWall } from '../../helpers';

export default function AStarLogic(algorithm: string) {
  let grid: Node[][] = [];
  let walls: number[][] = [];
  let startNode: number[] = [];
  let endNode: number[] = [];

  let [openList, setOpenList] = useState<Node[]>([]);
  let [closedList, setClosedList] = useState<Node[]>([]);
  let [path, setPath] = useState<number[][]>([]);

  function setParameters(gridTemplate: Node[][], wallsTemplate: number[][], startNodeTemplate: number[], endNodeTemplate: number[]) {
    grid = gridTemplate;
    walls = wallsTemplate;
    startNode = startNodeTemplate;
    endNode = endNodeTemplate;
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
    if (algorithm === 'astar') {
      let start = grid[startNode[0]][startNode[1]];
      setOpenList([...openList, start]);
      openList = [...openList, start];

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
              current = current.parentNode;
            } else {
              clearInterval(nestedInterval);
            }
          }, 25);
        }

        let neighbors: Node[] = currentNode.findNearestNeighbors(grid);
        for (let neighbor of neighbors) {
          if (isWalked(neighbor.x, neighbor.y, closedList) || isWall(neighbor.x, neighbor.y, walls)) {
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
      }, 1);
    }
  }

  return { setParameters, pathfind, closedList, path };
}

import React from 'react';
import AStar from './algorithms/astar/AStarVisualization';
import Dijkstra from './algorithms/dijkstras/DijkstrasVisualization';
import Bfs from './algorithms/bfs/BfsVisualization';
import AppLogic from './AppLogic';
import { AppContext } from './context/myContext';

export default function App(): JSX.Element {
  let props: any = AppLogic();

  return (
    <div className='App'>
      <AppContext.Provider value={props}>
        <select
          onChange={(e) => {
            props.setAlgorithm(e.target.value);
          }}
          style={{ marginRight: '10px' }}
        >
          <option value='astar'>A* Search</option>
          <option value='dijkstra'>Dijkstra's Shortest Path</option>
          <option value='bfs'>Greedy Best-First Search</option>
        </select>
        Speed:
        <input
          type='range'
          min='1'
          max='15'
          value={props.algorithmSpeed}
          onChange={(e) => {
            props.setAlgorithmSpeed(parseInt(e.target.value));
          }}
        ></input>
        {props.algorithm === 'astar' ? (
          <AStar />
        ) : props.algorithm === 'dijkstra' ? (
          <Dijkstra />
        ) : props.algorithm === 'bfs' ? (
          <Bfs />
        ) : (
          <div>NONE</div>
        )}
      </AppContext.Provider>
    </div>
  );
}

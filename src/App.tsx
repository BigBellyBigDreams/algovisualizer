import React, { useState } from 'react';
import AStar from './algorithms/astar/AStarVisualization';
import Dijkstra from './algorithms/dijkstras/DijkstrasVisualization';
import Bfs from './algorithms/bfs/BfsVisualization';

function App(): JSX.Element {
  const [algorithm, setAlgorithm] = useState<string>('astar');
  const [algorithmSpeed, setAlgorithmSpeed] = useState<number>(1);

  return (
    <div className='App'>
      <select
        onChange={(e) => {
          setAlgorithm(e.target.value);
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
        value={algorithmSpeed}
        onChange={(e) => {
          setAlgorithmSpeed(parseInt(e.target.value));
        }}
      ></input>
      {algorithm === 'astar' ? (
        <AStar algorithm={algorithm} algorithmSpeed={algorithmSpeed} />
      ) : algorithm === 'dijkstra' ? (
        <Dijkstra algorithm={algorithm} algorithmSpeed={algorithmSpeed} />
      ) : algorithm === 'bfs' ? (
        <Bfs algorithm={algorithm} algorithmSpeed={algorithmSpeed} />
      ) : (
        <div>NONE</div>
      )}
    </div>
  );
}

export default App;

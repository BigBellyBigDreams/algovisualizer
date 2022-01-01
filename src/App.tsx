import React, { useState } from 'react';
import AStar from './algorithms/astar/AStarVisualization';
import Dijkstra from './algorithms/dijkstras/DijkstrasVisualization';

function App(): JSX.Element {
  const [algorithm, setAlgorithm] = useState<string>('astar');
  return (
    <div className='App'>
      <select
        onChange={(e) => {
          setAlgorithm(e.target.value);
        }}
        style={{ marginBottom: '10px' }}
      >
        <option value='astar'>a* search</option>
        <option value='dijkstra'>dijkstras</option>
      </select>
      {algorithm === 'astar' ? <AStar algorithm={algorithm} /> : <Dijkstra algorithm={algorithm} />}
    </div>
  );
}

export default App;

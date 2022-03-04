import { useContext } from 'react';
import { AppContext } from '../context/myContext';

export default function GridButtons(props: any): JSX.Element {
  let { changeDrawingTool, clearGrid }: any = useContext(AppContext);

  return (
    <div style={{ display: 'flex' }}>
      <button
        className={'grid-buttons'}
        onClick={() => {
          changeDrawingTool(true, false, false);
        }}
      >
        Draw Walls
      </button>
      <button
        className={'grid-buttons'}
        onClick={() => {
          changeDrawingTool(false, false, false);
        }}
      >
        Erase
      </button>
      <button
        className={'grid-buttons'}
        onClick={() => {
          changeDrawingTool(false, true, false);
        }}
      >
        Set Start
      </button>
      <button
        className={'grid-buttons'}
        onClick={() => {
          changeDrawingTool(false, false, true);
        }}
      >
        Set Goal
      </button>

      <button
        className={'grid-buttons'}
        onClick={() => {
          props.reset();
          clearGrid();
        }}
      >
        Clear Grid
      </button>
      <button
        className={'grid-buttons'}
        style={{ backgroundColor: 'green', color: 'white' }}
        onClick={() => {
          props.reset();
          props.pathfind();
        }}
      >
        Visualize!
      </button>
    </div>
  );
}

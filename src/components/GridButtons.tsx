export default function GridButtons(props: any): JSX.Element {
  return (
    <div style={{ display: 'flex' }}>
      <button
        className={'grid-buttons'}
        onClick={() => {
          props.changeDrawingTool(true, false, false);
        }}
      >
        Draw Walls
      </button>
      <button
        className={'grid-buttons'}
        onClick={() => {
          props.changeDrawingTool(false, false, false);
        }}
      >
        Erase
      </button>
      <button
        className={'grid-buttons'}
        onClick={() => {
          props.changeDrawingTool(false, true, false);
        }}
      >
        Set Start
      </button>
      <button
        className={'grid-buttons'}
        onClick={() => {
          props.changeDrawingTool(false, false, true);
        }}
      >
        Set Goal
      </button>
      <button
        className={'grid-buttons'}
        onClick={() => {
          props.clearGrid();
          props.reset();
        }}
      >
        Clear Grid
      </button>
      {/* <button
    className={'grid-buttons'}
    style={{ backgroundColor: 'green', color: 'white' }}
    onClick={() => {
      // Sends state of grid to selected algorithm component and visualizes
      props.sendGridData(grid, startNode, endNode);
      props.reset();
      props.pathfind();
    }}
  >
    Visualize!
  </button> */}
    </div>
  );
}

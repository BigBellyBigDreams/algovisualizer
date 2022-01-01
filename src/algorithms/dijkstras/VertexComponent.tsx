import React from 'react';
import { GridType } from '../../types';

interface VertexPropType extends GridType {}

export default function VertexComponent(): JSX.Element {
  return (
    <div
      style={{
        width: '20px',
        height: '20px',
        border: '1px solid black',
        backgroundColor: 'white',
      }}
    ></div>
  );
}

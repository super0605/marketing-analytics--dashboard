import * as React from 'react';

interface IndicatorProps {
  x: number;
  y: number;
  size?: number;
}
const Indicator = (props: IndicatorProps) => {
  const {x, y, size = 10} = props;
  return (
    <g transform={`translate(${x}, ${y})`}>
      <line x1={-(size / 2)} y1={0} x2={size / 2} y2={0} stroke="red" />
      <line x1={0} y1={-(size / 2)} x2={0} y2={size / 2} stroke="red" />
    </g>
  );
};

export default Indicator;

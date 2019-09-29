import * as React from 'react';

interface SvgLineCompProps {
  height: number;
  width: number;
  cx: number;
  cy: number;
  circleColor: string;
}
const SvgCircleComp = (props: SvgLineCompProps) => {
  const { width, height, cx, cy, circleColor } = props;

  return (
    <svg height={height} width={width}>
      <circle 
        cx={cx} 
        cy={cy} 
        r={12} 
        fill={circleColor} 
        stroke="none"
      />
    </svg>
  );
}

export default SvgCircleComp;

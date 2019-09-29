import * as React from 'react';

interface SvgLineCompProps {
  height: number;
  width: number;
  lineWidth: number;
  strokeColor: string;
  strokeWidth: number;
}
const SvgLineComp = (props: SvgLineCompProps) => {
  const { width, height, strokeWidth, lineWidth, strokeColor } = props;
  const y1 = height/2;

  return (
    <svg height={height} width={width}>
      <line 
        x1="0" 
        y1={y1}
        x2={lineWidth}
        y2={y1} 
        stroke={strokeColor}
        strokeWidth={strokeWidth}
      />
    </svg>
  );
}

export default SvgLineComp;

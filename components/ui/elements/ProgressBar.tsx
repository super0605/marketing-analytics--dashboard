import * as React from 'react';
import {colors} from "../../../constants/constants";


interface ProgressBarCompProps {
  value: number;
}
const ProgressBarComp = (props: ProgressBarCompProps) => {
  const { value } = props;
  const width = 220, height = 12;
  const strokeWidth = 4;
  const lineWidth = width - strokeWidth;
  const x = strokeWidth / 2;

  return (
    <svg viewBox={`0 0 ${width} ${height}`}>
      <line
        x1={x}
        y1={height / 2}
        x2={x + lineWidth}
        y2={height / 2}
        stroke={colors.grayLight}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
      <line
        x1={x}
        y1={height / 2}
        x2={x + (lineWidth * value)}
        y2={height / 2}
        stroke={colors.orangeOchre}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
      <circle
        cx={x + (lineWidth * value)}
        cy={height / 2}
        r={5}
        fill={colors.orangeOchre}
        stroke={colors.white}
        strokeWidth={3}
      />
    </svg>
  );
}

export default ProgressBarComp;

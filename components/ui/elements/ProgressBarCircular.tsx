import * as React from 'react';
import styled from 'styled-components';
import {colors} from "../../../constants/constants";
import {labelBigAccented} from "../../../constants/style-constants";
import {arcPathCommand} from "../../../util/util";


const Percent = styled.text`
  ${labelBigAccented}
`

interface ProgressBarCircularCompProps {
  width: number;
  height: number;
  strokeWidth: number;
  percent: number;
}
const ProgressBarCircularComp = (props: ProgressBarCircularCompProps) => {
  const { width, height, strokeWidth, percent } = props;
  // A rx ry x-axis-rotation large-arc-flag sweep-flag x y

  const arcStart = -Math.PI / 2;
  const arcEnd = arcStart + (percent * ((Math.PI * 2) * 0.999));

  return (
    <svg viewBox={`0 0 ${width} ${height}`} width={width}>
      <circle
        cx={width / 2}
        cy={width / 2}
        r={(width / 2) - (strokeWidth / 2)}
        stroke={colors.grayLight}
        strokeWidth={strokeWidth}
        fill="none"
        />

      <path
        d={arcPathCommand(width/2, height/2, width/2 - strokeWidth / 2, arcStart, arcEnd)}
        stroke={colors.primary}
        strokeWidth={strokeWidth}
        fill="none"
        strokeLinecap="round"
        />
      <Percent x={width / 2} y={height / 2} dy={6} textAnchor="middle">{`${percent*100}%`}</Percent>
    </svg>
  );
}



export default ProgressBarCircularComp;

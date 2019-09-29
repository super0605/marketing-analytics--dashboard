import * as React from 'react';
import styled from 'styled-components';
import SparkHeadline from "./SparkHeadline";
import { px, sizes } from "../../../../../constants/constants";

import sparkLine from "../../../../../static/media/sparkline.svg";

const SparkLine = styled.div`
  display: flex;
  flex-direction: column;
`

const ChartWrapper = styled.div`
  width: ${px(sizes.extremehuge)};
  height: ${px(sizes.junior)};
`

interface SparkLineCompProps {
  trend: number;
  metric: string;
}
const SparkLineComp = (props: SparkLineCompProps) => {
  
  return (
    <SparkLine>
      <SparkHeadline {...props} />
      <ChartWrapper>
        <img src={sparkLine} />
      </ChartWrapper>
    </SparkLine>
  );
}

export default SparkLineComp;

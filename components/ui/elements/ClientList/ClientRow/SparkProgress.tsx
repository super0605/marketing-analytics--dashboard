import * as React from 'react';
import styled from 'styled-components';
import SparkHeadline from "./SparkHeadline";
import {ProgressBar} from "../../../../../components";
import { px, sizes } from "../../../../../constants/constants";


const SparkProgress = styled.div`
  display: flex;
  flex-direction: column;
`

const ChartWrapper = styled.div`
  width: ${px(sizes.extremehuge)};
  height: ${px(sizes.junior)};
`

interface SparkProgressCompProps {
  trend: number;
  metric: string;
  value: number;
}

const SparkProgressComp = (props: SparkProgressCompProps) => {
  return (
    <SparkProgress>
      <SparkHeadline {...props} />
      <ChartWrapper>
        <ProgressBar value={props.value} />
      </ChartWrapper>
    </SparkProgress>
  );
}

export default SparkProgressComp;

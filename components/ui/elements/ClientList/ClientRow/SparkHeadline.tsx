import * as React from 'react';
import styled from 'styled-components';
import { labelSmallEmphasized, labelSmall } from "../../../../../constants/style-constants";
import { px, sizes } from "../../../../../constants/constants";

const SparkHeadline = styled.p`
  margin: 0 0 ${px(sizes.thin)} 0;
  padding: 0;
`;

const Trend = styled.span`
  ${labelSmallEmphasized};
  margin-right: ${px(sizes.fine)};
`;

const Metric = styled.span`
  ${labelSmall}
`;

interface SparkHeadlineCompProps {
  trend: number;
  metric: string;
}
const SparkHeadlineComp = (props: SparkHeadlineCompProps) => {
  const { trend, metric } = props;
  return (
    <SparkHeadline>
      <Trend>{`${trend > 0 ? "+" : "-"}${trend}%`}</Trend>
      <Metric>{metric}</Metric>
    </SparkHeadline>
  );
}

export default SparkHeadlineComp;

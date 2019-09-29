import * as React from 'react';
import styled from 'styled-components';
import { Select, H3 } from "../../../../../components";
import { sizes, colors, px } from "../../../../../constants/constants";
import { SelectValue } from "../../../../../constants/interfaces";

const Top10PerformingSitesTableFilter = styled.div`
  width: 100%;
  box-sizing: border-box;
  padding-bottom: ${px(sizes.fine)};
`;

interface RowProps {
  z: number;
}
const Row = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  margin-top: ${px(sizes.small)};
  // justify-content: space-between;
  padding-bottom: ${px(sizes.fine)};
  border-bottom: ${px(sizes.hair)} solid ${colors.grayMedium};
  z-index: ${(props: RowProps) => props.z};

  :last-child {
    border-bottom: none;
  }
`;

const Cell = styled.div`
`;

const Performance: SelectValue[] = [
  {
    name: 'Highest',
    value: 'highest',
  },
  {
    name: 'Lowest',
    value: 'lowest'
  }
];

const Metric: SelectValue[] = [
  {
    name: 'Impressions',
    value: 'impressions',
  },
  {
    name: 'Clicks',
    value: 'clicks',
  },
  {
    name: 'CTR',
    value: 'ctr',
  },
  {
    name: 'CPC',
    value: 'cpc',
  },
  {
    name: 'Fraud level',
    value: 'fraud level',
  },
]

const Top10PerformingSitesTableFilterCompo = () => {
  return (
    <Top10PerformingSitesTableFilter>
      <Row z={10}>
        <Cell><H3 content="Show me the " /></Cell>
        <Cell><Select key={1} z={10} choices={Performance} selectedChoice={Performance[0].name} /></Cell>
        <Cell><H3 content=" performing sites based on " /></Cell>
        <Cell><Select key={2} z={10} choices={Metric} selectedChoice={Metric[0].name} /></Cell>
      </Row>
    </Top10PerformingSitesTableFilter>
  );
}

export default Top10PerformingSitesTableFilterCompo;

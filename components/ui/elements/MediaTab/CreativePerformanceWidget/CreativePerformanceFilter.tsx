import * as React from 'react';
import styled from 'styled-components';
import { Select, H3 } from "../../../../../components";
import { sizes, colors, px } from "../../../../../constants/constants";
import { SelectValue } from "../../../../../constants/interfaces";

const CreativePerformanceFilter = styled.div`
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

const metric: SelectValue[] = [
  {
    name: 'CTR',
    value: 'ctr'
  },
  {
    name: 'VTR',
    value: 'vtr'
  },
  {
    name: 'Impressions',
    value: 'impressions'
  },
];

const campaings: SelectValue[] = [
  {
    name: 'all campaigns',
    value: 'allcampaigns'
  },
];

const sites: SelectValue[] = [
  {
    name: 'all networks',
    value: 'allnetworks'
  },
];

const CreativePerformanceFilterCompo = () => {
  return (
    <CreativePerformanceFilter>
      <Row z={10}>
        <Cell><H3 content="Highest" /></Cell>
        <Cell><Select key={1} z={10} choices={metric} selectedChoice={metric[0].name} /></Cell>
        <Cell><H3 content="across" /></Cell>
        <Cell><Select key={2} z={10} choices={campaings} selectedChoice={campaings[0].name} /></Cell>
        <Cell><H3 content="and" /></Cell>
        <Cell><Select key={2} z={10} choices={sites} selectedChoice={sites[0].name} /></Cell>
      </Row>
    </CreativePerformanceFilter>
  );
}

export default CreativePerformanceFilterCompo;

import * as React from 'react';
import styled from 'styled-components';
import { Select, H3 } from "../../../../components";
import { sizes, colors, px } from "../../../../constants/constants";
import { SelectValue } from "../../../../constants/interfaces";

const EmailTransactionsTimelineFilter = styled.div`
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

const FilterOptions: SelectValue[] = [
  {
    name: 'Revenue',
    value: 'revenue'
  },
];

const EmailTransactionsTimelineFilterCompo = () => {
  return (
    <EmailTransactionsTimelineFilter>
      <Row z={10}>
        <Cell><H3 content="Total" /></Cell>
        <Cell><Select key={1} z={10} choices={FilterOptions} selectedChoice={FilterOptions[0].name} /></Cell>
        <Cell><H3 content="over time" /></Cell>
      </Row>
    </EmailTransactionsTimelineFilter>
  );
}

export default EmailTransactionsTimelineFilterCompo;

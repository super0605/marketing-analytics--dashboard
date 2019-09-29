import * as React from 'react';
import styled from 'styled-components';
import { Select, H3 } from "../../../../components";
import { sizes, colors, px } from "../../../../constants/constants";
import { SelectValue } from "../../../../constants/interfaces";

const EmailTransactionsPillsFilter = styled.div`
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
    name: '24-Oct-18',
    value: '24-10-18'
  },
  {
    name: '25-Oct-19',
    value: '25-10-19'
  },
  {
    name: '26-Oct-18',
    value: '26-10-20'
  },
];

const FilterOptions2: SelectValue[] = [
  {
    name: '31-Oct-18',
    value: '31-10-18'
  },
  {
    name: '30-Oct-19',
    value: '30-10-19'
  },
  {
    name: '29-Oct-18',
    value: '28-10-20'
  },
];

const EmailTransactionsPillsFilterCompo = () => {
  return (
    <EmailTransactionsPillsFilter>
      <Row z={10}>
        <Cell><H3 content="I want to compare my primary dates with" /></Cell>
        <Cell><Select key={1} z={10} choices={FilterOptions} selectedChoice={FilterOptions[0].name} /></Cell>
        <Cell><H3 content="to" /></Cell>
        <Cell><Select key={2} z={10} choices={FilterOptions2} selectedChoice={FilterOptions2[0].name} /></Cell>
      </Row>
    </EmailTransactionsPillsFilter>
  );
}

export default EmailTransactionsPillsFilterCompo;

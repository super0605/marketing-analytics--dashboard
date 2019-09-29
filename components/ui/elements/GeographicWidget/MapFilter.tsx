import * as React from 'react';
import styled from 'styled-components';
import { Select } from "../../../../components";
import {sizes, colors, px} from "../../../../constants/constants";
import {SelectValue} from "../../../../constants/interfaces";

const FilterWidget = styled.div`
    width: 100%;
    box-sizing: border-box;
    padding-bottom: ${px(sizes.fine)};
    margin-left: ${px(-Math.abs(sizes.petite))};
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

const TextBy = styled.div`
    padding: ${px(sizes.micro)} ${px(sizes.small)} 0 ${px(sizes.small)};
`;

const Revenue: SelectValue[] = [
  {
    name: 'Revenue',
    value: 'revenue'
  },
  {
    name: 'Transaction',
    value: 'transaction'
  },
  {
    name: 'Sessions',
    value: 'sessions'
  },
  {
    name: 'Unique visitors',
    value: 'uniqueVisitors'
  },
  {
    name: 'Av. time on site',
    value: 'timeOnSite'
  },
]; 

const Country: SelectValue[] = [
  {
    name: 'Country',
    value: ''
  },
  {
    name: 'United State',
    value: 'USA'
  },
  {
    name: 'Russia',
    value: 'RSA'
  },
  {
    name: 'Bosnia',
    value: 'BIH'
  },
];

const MapFilter = () => {
    return (
        <FilterWidget>
            <Row z={10}>
              <Cell><Select key={1} z={10} choices={Revenue} selectedChoice={Revenue[0].name} /></Cell>
              <Cell><TextBy>by</TextBy></Cell>
              <Cell><Select key={2} z={10} choices={Country} selectedChoice={Country[0].name} /></Cell>
            </Row>
        </FilterWidget>
    );
}

export default MapFilter;

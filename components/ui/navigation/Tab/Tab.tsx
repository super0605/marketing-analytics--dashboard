import * as React from 'react';
import styled from 'styled-components';
import {px, colors, sizes, elementSizes} from "../../../../constants/constants";
import {labelMediumAccented, labelMedium} from "../../../../constants/style-constants";

const Tab = styled.div`
  display: flex;
  flex-direction: row;
`;

interface TabItemProps {
  active: boolean;
};
const TabItem = styled.div`
  ${(props: TabItemProps) => props.active
    ? labelMediumAccented
    : labelMedium};

  width: ${px(elementSizes.tabItemWidth)};
  margin-right: ${px(sizes.thin)};
  border-bottom: ${(props: TabItemProps) => props.active
    ? `2px solid ${colors.primary}`
    : "none"};
  color: ${(props: TabItemProps) => props.active
    ? colors.primary
    : colors.grayMedium};
  cursor: pointer;
`;

interface TabCompProps<T> {
  items: T[];
  getLabel: (item: T) => string;
  activItem: T;
  handleClick: (selected: T) => void;
}
function TabComp<T>(props: TabCompProps<T>) {
  const { items, getLabel, activItem, handleClick } = props;
  return (
    <Tab>
      {items.map((item, i) =>
        <TabItem
          key={`tab-${i}`}
          active={item === activItem}
          onClick={() => handleClick(item)}
        >
          {getLabel(item)}
        </TabItem>)}
    </Tab>
  );
}


export default TabComp;

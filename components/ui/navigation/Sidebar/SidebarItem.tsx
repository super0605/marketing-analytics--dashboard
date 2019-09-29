import * as React from 'react';
import styled from 'styled-components';
import {px, colors, sizes, elementSizes} from "../../../../constants/constants";
import {labelSmall} from "../../../../constants/style-constants";

interface SidebarItemProps {
  active: boolean;
}
const SidebarItem = styled.div`
  width: 100%;
  height: ${px(elementSizes.sidebarItemHeight)};
  background-color: ${(props: SidebarItemProps) => props.active ? colors.primary : "transparent"};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Icon = styled.img`
  width: ${px(elementSizes.iconSizeMid)};
  height: ${px(elementSizes.iconSizeMid)};
  margin: ${px(sizes.micro)} 0;
`;

const Label = styled.div`
  ${labelSmall};
  color: ${colors.snow};
  text-align: center;
  width: 100%;
`;

interface SidebarItemCompProps {
  active: boolean;
  iconSrc: string;
  label: string;
}
const SidebarItemComp = (props: SidebarItemCompProps) => {
  const { iconSrc, active, label } = props;
  return (
    <SidebarItem active={active}>
      <Icon src={iconSrc} />
      <Label>{label}</Label>
    </SidebarItem>
  );
}

export default SidebarItemComp;

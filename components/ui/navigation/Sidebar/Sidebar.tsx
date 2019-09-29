import * as React from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import { withRouter } from "next/router";
import {px, colors, sizes, elementSizes, SidebarItemType} from "../../../../constants/constants";
import {sidebarProps} from "../../../../constants/valuesByType";
import SidebarItem from "./SidebarItem";

const Sidebar = styled.div`
  padding-top: ${px(sizes.large)};
  width: ${px(elementSizes.sidebarWidth)};
  background-color: ${colors.blueTurquiseDeep};
  height: 100%;
`;
const LinkWrapper = styled.div`
  :nth-child(7) {
    margin-top: ${px(sizes.hefty)};
  }
  cursor: pointer;
  pointer-events: all;
`;
const A = styled.a`
  text-decoration: none;
`;

interface SidebarCompProps {
  activeItem: SidebarItemType;
}
const SidebarComp = (props: SidebarCompProps) => {
  const { activeItem } = props;
  return (
    <Sidebar>
      {Array.from(sidebarProps.keys()).map((key: SidebarItemType) => {
        const prop = sidebarProps.get(key);
        const {label, iconSrc, page, as} = prop;

        return (
          <LinkWrapper key={`sidebar-item-${key}`}>
            <Link
              href={page}
              as={as ? as : page}
              passHref
            >
              <A>
                <SidebarItem
                  active={activeItem === key}
                  iconSrc={iconSrc}
                  label={label}
                />
              </A>
            </Link>
          </LinkWrapper>
      )})}
    </Sidebar>
  );
}

export default withRouter(SidebarComp);

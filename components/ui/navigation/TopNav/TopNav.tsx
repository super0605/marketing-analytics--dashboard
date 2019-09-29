import React from "react";
import styled from "styled-components";
import Link from "next/link";
import { withRouter } from "next/router";
import UserMenu from "./UserMenu";
import {
  px,
  colors,
  sizes,
  elementSizes,
  userRoles
} from "../../../../constants/constants";
import { User } from "../../../../constants/interfaces";

import avatar from "../../../../static/media/avatar__female01.png";

const TopNav = styled.div`
  width: 100%;
  background-color: ${colors.white};
  height: ${px(elementSizes.topNavHeight)};
  box-shadow: 0 0 ${px(sizes.thin)} rgba(0, 0, 0, 0.35);
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  padding: 0 ${px(sizes.petite)} 0 ${px(sizes.petite)};
  pointer-events: all;
`;

const ClientLogo = styled.div``;

const A = styled.a`
  text-decoration: none;
  color: ${colors.grayVeryDark};
`;

const userIsabel: User = {
  avatar: avatar,
  name: "Isabel Delgado",
  role: userRoles.analyst
};

interface TopNavCompProps {
  loggedIn: boolean;
}
const TopNavComp = (props: TopNavCompProps) => {
  return (
    <TopNav>
      <Link href={"/clients"} as="/clients" passHref>
        <A><ClientLogo>VMLY&R</ClientLogo></A>
      </Link>
      {props.loggedIn && (
        <UserMenu user={userIsabel} />
      )}
    </TopNav>
  );
};

export default withRouter(TopNavComp);

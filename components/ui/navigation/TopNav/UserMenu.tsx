import * as React from 'react';
import styled from 'styled-components';
import onClickOutside from "react-onclickoutside";
import Link from "next/link";
import { withRouter } from "next/router";
import {Avatar} from "../../../../components";
import {px, sizes, elementSizes, colors} from "../../../../constants/constants";
import {labelMicro} from "../../../../constants/style-constants";
import {User} from "../../../../constants/interfaces";

const UserMenu = styled.div`
  display: flex;
  flex-direction: column;
`

const AvatarWrapper = styled.div`
  cursor: pointer;
`;

const OptionsList = styled.div`
  position: absolute;
  top: ${px(elementSizes.topNavHeight)};
  right: 0;
  border: ${px(sizes.hair)} solid ${colors.grayLight};
  background-color: ${colors.white};
`;

const Option = styled.div`
  ${labelMicro};
  padding: ${px(sizes.tiny)} ${px(sizes.big)};
  box-sizing: content-box;
  text-align: right;
  border-bottom: ${px(sizes.hair)} solid ${colors.grayLight};
  cursor: pointer;

  :hover {
    background-color: ${colors.grayLight};
  }

  :last-child {
    border-bottom: none;
  }
`;


const A = styled.a`
  text-decoration: none;
  color: ${colors.grayVeryDark};
  pointer-events: all;
`;

interface UserMenuCompProps {
  user: User;
}
interface UserMenuCompState {
  isCollapsed: boolean;
}
class UserMenuComp extends React.Component<UserMenuCompProps, UserMenuCompState> {
  constructor(props: UserMenuCompProps) {
    super(props);

    this.state = {
      isCollapsed: true,
    };

    this.toggleMenu = this.toggleMenu.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
  }

  render() {
    const { user } = this.props;
    return (
      <UserMenu>
        <AvatarWrapper onClick={this.toggleMenu}>
          <Avatar
            avatar={user.avatar}
            name={user.name}
            alignment="left"
            size="small"
          />
        </AvatarWrapper>
        {!this.state.isCollapsed &&
          <OptionsList>
            <Option onClick={this.toggleMenu}>Settings</Option>
            <Option onClick={this.toggleMenu}>Help</Option>
            <Link href={"/"} as="/" passHref>
              <A><Option onClick={this.toggleMenu}>Logout</Option></A>
            </Link>
            
          </OptionsList>
        }
      </UserMenu>
    );
  }

  handleClickOutside () {
    if (!this.state.isCollapsed) {
      this.setState({
        isCollapsed: true,
      });
    }
  }

  toggleMenu() {
    this.setState({
      isCollapsed: !this.state.isCollapsed,
    });
  }
}

export default withRouter(onClickOutside(UserMenuComp));

import React, { ChangeEvent } from "react";
import styled from "styled-components";
import Link from 'next/link';
import {
  H2,
  DropDownUp,
  Button,
  Avatar,
  IconButton,
  InputField,
  MultiSelect
} from "../../../../components";
import {
  px,
  sizes,
  colors,
  icons,
} from "../../../../constants/constants";
import { allRoles, userRoles, UserRoleType, UserModel, userRoleLabels } from '../../../../models';
import { widgetStyle } from "../../../../constants/style-constants";
import { fonts } from "../../../../constants/constants";
import { brandOption  } from "../../../../constants/interfaces";
import { validateEmail } from "../../../../util/util";

const TeamWidget = styled.div`
  ${widgetStyle};
  width: 100%;
  padding: ${px(sizes.fine)} ${px(sizes.junior)};
  box-sizing: border-box;
`;

const TeamList = styled.div`
  display: flex;
  flex-direction: column;
`;

interface RowProps {
  z: number;
}
const Row = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  margin-top: ${px(sizes.small)};
  justify-content: space-between;
  padding-bottom: ${px(sizes.fine)};
  border-bottom: ${px(sizes.hair)} solid ${colors.grayMedium};
  z-index: ${(props: RowProps) => props.z};

  :last-child {
    border-bottom: none;
  }
`;

const Cell = styled.div`
  :nth-child(1) {
    // flex-grow: 1;
    width: ${px(sizes.extremehuge)};
  }
  :nth-child(2) {
    width: ${px(sizes.extremehuge)};
  }
  :nth-child(3) {
    width: ${px(sizes.mediumhuge)};
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
  }
`;

const TH = styled.span`
  font-weight: ${fonts.weightSemiBold};
`;

const Span = styled.div`
`;

interface TeamWidgetCompProps {
  users: UserModel[];
  handleInvite?: (
    isValid: boolean,
    newUserEmail: string,
    newUserRole: UserRoleType,
    newUserDisplayName: string,
    isValidDisplayName: boolean,
  ) => void;
  handleRemove?: (user: UserModel) => void;
  handleMultiSelect?: (selection: any) => void;
  brandOptions?: Array<brandOption>;
}
interface TeamWidgetCompState {
  newUserEmail: string;
  isValidEmail: boolean;
  newUserRole: UserRoleType;
  newUserDisplayName: string;
  isValidDisplayName: boolean;
}
class TeamWidgetComp extends React.Component<
  TeamWidgetCompProps,
  TeamWidgetCompState
  > {
  constructor(props: TeamWidgetCompProps) {
    super(props);

    this.state = {
      newUserEmail: "",
      isValidEmail: true,
      newUserRole: userRoles.Analyst,
      newUserDisplayName: "",
      isValidDisplayName: false,
    };

    this.handleEmailInput = this.handleEmailInput.bind(this);
    this.handleDisplayNameInput = this.handleDisplayNameInput.bind(this);
    this.handleRoleInput = this.handleRoleInput.bind(this);
  }

  render() {
    const { users, handleInvite, handleRemove, handleMultiSelect, brandOptions } = this.props;
    const { newUserEmail, newUserRole, isValidEmail, newUserDisplayName, isValidDisplayName } = this.state;
    
    return (
      <div>
        <H2 content="Team" />
        <TeamWidget>
          <TeamList>
            <Row z={10}>
              <Cell>
                <div style={{ maxWidth: 200 }}>
                  <InputField
                    placeholder="Enter email address"
                    handleInput={this.handleEmailInput}
                    level={isValidEmail ? "valid" : "error"}
                  />
                </div>
              </Cell>
              <Cell>
                <div style={{ maxWidth: 200 }}>
                  <InputField
                    placeholder="Display name"
                    handleInput={this.handleDisplayNameInput}
                    level={isValidDisplayName ? "valid" : "error"}
                  />
                </div>
              </Cell>
              <Cell>
                <div style={{ maxWidth: 200, minWidth: 200 }}>
                  <MultiSelect
                    options={brandOptions}
                    handleSelect={handleMultiSelect}
                  />
                </div>
              </Cell>
              <Cell>
                <DropDownUp
                  choices={allRoles}
                  selectedChoice={newUserRole}
                  getLabel={(role: UserRoleType) => userRoleLabels.get(role)}
                  handleSelect={this.handleRoleInput}
                />
              </Cell>
              <Cell>
                <Button
                  label="Invite"
                  handleClick={() =>
                    handleInvite(isValidEmail, newUserEmail, newUserRole, newUserDisplayName, isValidDisplayName)
                  }
                />
              </Cell>
            </Row>
            <Row z={1}>
              <Cell><TH>Name/Email</TH></Cell>
              <Cell><TH>Status</TH></Cell>
              <Cell><TH>User Type</TH></Cell>
              <Cell><TH>Delete</TH></Cell>
            </Row>

            {users.map((user, i) => (
              <Row z={9 - i} key={`team-row-${i}`}>
                <Cell>
                  <Avatar
                    avatar={user.imageUrl}
                    name={user.displayName}
                    email={user.email}
                  />
                </Cell>
                <Cell>
                  {
                    user.hasAcceptedInvitation && 'Accepted'
                  }
                  {
                    (user.invitationCode && !user.hasAcceptedInvitation) &&
                    <Span>
                      <Span>Pending (</Span>
                      <Link href="https://api10.azurewebsites.net/auth/{{user.invitationCode}}" ><a target="_blank">{user.invitationCode}</a></Link>
                      <Span>)</Span>
                    </Span>
                  }
                </Cell>
                <Cell>
                  <DropDownUp
                    choices={allRoles}
                    selectedChoice={userRoles[user.role]}
                    getLabel={(role: UserRoleType) => userRoleLabels.get(role)}
                  />
                </Cell>
                <Cell>
                  <IconButton type={icons.close} size="small" handleClick={() => handleRemove && handleRemove(user)} />
                </Cell>
              </Row>
            ))}
          </TeamList>
        </TeamWidget>
      </div>
    );
  }


  handleEmailInput(e: ChangeEvent<HTMLInputElement>) {
    const isValidOrEmpty =
      e.target.value.length > 0 ? validateEmail(e.target.value) : true;
    this.setState({
      newUserEmail: e.target.value,
      isValidEmail: isValidOrEmpty
    });
  }

  handleDisplayNameInput(e: ChangeEvent<HTMLInputElement>) {
    const isValidOrEmpty =
      e.target.value.length > 3 ? true : false;
    this.setState({
      newUserDisplayName: e.target.value,
      isValidDisplayName: isValidOrEmpty
    });
  }

  handleRoleInput(role: UserRoleType) {
    this.setState({
      newUserRole: role,
    });
  }

}

export default TeamWidgetComp;

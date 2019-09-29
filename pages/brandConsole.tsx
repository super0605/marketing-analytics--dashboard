import React from "react";
import withAuth from '../hocs/withAuth';

import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import {
  UsersAction,
  InviteUserAction,
  BrandsAction,
} from '../redux/constants';
import { usersState } from '../redux/types/users';
import { brandsState } from '../redux/types/brands';
import { UserRoleType, AddUserRequest, userRoles, UserModel } from '../models';

import {
  TeamWidget,
  ConnectorsWidget,
  BrandSettingsWidget,
  BasePage
} from "../components";
import {
  sidebarItems,
  connectors,
  connectorGroups,
  months,
  weekModes
} from "../constants/constants";
import { brandOption } from "../constants/interfaces";
import { HeadStyle } from "../constants/head";
// import { dummyUsers } from "../constants/dummies";
import { connectorGroupProps } from "../constants/valuesByType";
import iconUpload from "../static/media/icons/icon__upload--setup.png";

interface ConsoleProps {
  userLists?: UserModel[];
  users: usersState;
  newUser: UserModel;
  brandsState: brandsState;
  getUsers(): void;
  inviteUser(userToInvite: AddUserRequest): void;
  getBrands(): void;
}
interface ConsoleState {
  brandOptions: brandOption[]
  selectedBrandIds: Array<number>
}

class Console extends React.Component<ConsoleProps, ConsoleState> {

  constructor(props: ConsoleProps) {
    super(props);
    this.state = {
      brandOptions: [],
      selectedBrandIds: [],
    }
  }

  componentDidMount() {
    this.props.getUsers();
    this.props.getBrands();
  }

  componentDidUpdate(prevProps: ConsoleProps) {
    if (this.props.newUser !== null && prevProps.newUser !== this.props.newUser) {
      this.props.getUsers();
    }
  }

  componentWillReceiveProps(nextProps: ConsoleProps) {
    const { brandsState } = nextProps;
    const brandOptions = brandsState.brandLists.brands.map((brand) => {
      const option: brandOption = {
        label: brand.name,
        value: brand.id,
      }
      return option;
    });

    this.setState({
      brandOptions,
    })
  }

  handleInvite = (
    isValid: boolean,
    newUserEmail: string,
    newUserRole: UserRoleType,
    newUserDisplayName: string,
    isValidDisplayName: boolean
  ) => {
    const role = userRoles[newUserRole];
    const userToInvite: AddUserRequest = {
      email: newUserEmail || null,
      displayName: newUserDisplayName || null,
      role: role || null,
      brands: this.state.selectedBrandIds,
    }
    if (isValid && isValidDisplayName && this.state.selectedBrandIds.length && role) {
      this.props.inviteUser(userToInvite);
    }
  }


  handleMultiSelect = (payload) => {
    let brandIds: number[] = [];
    if (payload) {
      payload.map((brand: brandOption) => {
        brandIds.push(brand.value);
      });
      this.setState({
        selectedBrandIds: brandIds,
      })
    }
  }

  render() {
    const { brandOptions } = this.state;

    return (
      <div>
        <HeadStyle />
        <BasePage activePage={sidebarItems.console}>
          <BrandSettingsWidget
            imagePreviewUrl={iconUpload}
            activeFinancialDay={0}
            activeFinancialMonth={months.jan}
            activeWeekMode={weekModes.satSun}
            handleImageChange={() => null}
            handleNameInput={() => null}
            handleDayInput={() => null}
            handleMonthInput={() => null}
            handleWeekModeToggle={() => null}
          />
          <ConnectorsWidget
            disabled={connectorGroupProps
              .get(connectorGroups.paidMedia)
              .members.concat([
                connectors.googleAnalytics,
                connectors.googleSearchConsole,
                connectors.ahrefs,
                connectors.salesforce
              ])}
            connected={[
              connectors.csvImportOrg,
              connectors.adobeAnalytics,
              connectors.semRush,
              connectors.yesMail
            ]}
            loading={[connectors.youtubeOrg, connectors.csvImportPaid]}
            handleConnectorClick={() => null}
          />
          <div style={{ height: 30 }} />

          <TeamWidget
            users={this.props.users.userLists}
            handleInvite={this.handleInvite}
            handleMultiSelect={this.handleMultiSelect}
            brandOptions={brandOptions || []}
          />
          <div style={{ height: 100 }} />
        </BasePage>
      </div>
    );
  }
}


const mapStateToProps = (state) => ({
  users: state.users,
  newUser: state.invitedUser.newUser,
  brandsState: state.brandsState,
});

const mapDispatchToprops = (dispatch: Dispatch) => ({
  getUsers: () => dispatch({ type: UsersAction.GET_USERS_REQUEST }),
  inviteUser: (userToInvite: AddUserRequest) => dispatch({ type: InviteUserAction.INVITE_USER_REQUEST, payload: { userToInvite } }),
  getBrands: () => dispatch({ type: BrandsAction.GET_BRANDS_REQUEST }),
});

export default connect(mapStateToProps, mapDispatchToprops)(withAuth(Console));

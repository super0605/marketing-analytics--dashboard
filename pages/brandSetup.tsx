import React, { ChangeEvent } from "react";
import styled from "styled-components";
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

import { remove, cloneDeep } from "lodash";
import {
  TopNav,
  HighlightsBar,
  Tab,
  ConnectorsWidget,
  TaskList,
  TeamWidget,
  Button,
  BrandSettingsWidget
} from "../components";
import { HeadStyle } from "../constants/head";
import {
  px,
  colors,
  sizes,
  setupTabs,
  SetupTabType,
  elementSizes,
  zIndices,
  ConnectorsType,
  weekModes,
  WeekModeType,
  connectors,
  ConnectorGroupType,
  connectorGroups,
  // UserRoleType,
  months,
  MonthType
} from "../constants/constants";
import { brandOption } from "../constants/interfaces";
import { dummyTaskGroups, dummyUsers } from "../constants/dummies";
import {
  setupTabLabels,
  ConnectorGroupProp,
  connectorGroupProps,
} from "../constants/valuesByType";
import { TaskGroup, User } from "../constants/interfaces";
import { isTaskListCompleted } from "../util/util";

import iconUpload from "../static/media/icons/icon__upload--setup.png";
import placeholderLogin from "../static/media/images/placeholder__login.jpg";
import defaultUserAvatar from "../static/media/avatar__persona.png";

const TopNavWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: ${zIndices.zTopNav};
`;

const Content = styled.div`
  width: 100vw;
  box-sizing: border-box;
  padding: ${px(sizes.hefty + elementSizes.topNavHeight)} 400px 0 100px;
`;

const TabRow = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;


// connectors widget
interface OverlayWrapperProps {
  enabled: boolean;
}
const OverlayWrapper = styled.div`
  position: relative;
  ::after {
    content: "";
    opacity: ${(props: OverlayWrapperProps) => (props.enabled ? 0 : 1)};
    position: absolute;
    background-color: rgba(255, 255, 255, 0.8);
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: ${zIndices.zSidebar};
    transition: opacity 0.5s linear;
    pointer-events: ${(props: OverlayWrapperProps) =>
    props.enabled ? "none" : "all"};
  }
`;

const BrandSetupWrapper = styled.div`
  margin-bottom: ${px(sizes.huge)};
`;

interface ModalWrapperProps {
  isOpen: boolean;
}
const ModalWrapper = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  opacity: ${(props: ModalWrapperProps) => (props.isOpen ? 1 : 0)};
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: ${zIndices.topMost};
  cursor: pointer;
  pointer-events: ${(props: ModalWrapperProps) =>
    props.isOpen ? "all" : "none"};
`;
const Modal = styled.div`
  width: 800px;
  height: 600px;
  background-color: ${colors.white};
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const TeamOverlay = styled(OverlayWrapper)`
  margin-top: ${px(sizes.hefty)};
`;

const NextButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  padding: ${px(sizes.tiny)} ${px(sizes.tiny)} 0 0;
`;

interface BrandSetupProps {
  userLists?: UserModel[];
  users: usersState;
  newUser: UserModel;
  brandsState: brandsState;
  getUsers(): void;
  inviteUser(userToInvite: AddUserRequest): void;
  getBrands(): void;
}

interface BrandSetupState {
  activeTab: SetupTabType;
  imagePreviewUrl: string | ArrayBuffer;
  activeWeekMode: WeekModeType;
  activeFincialDay: number;
  activeFinancialMonth: MonthType;
  isFinancialDaySet: boolean;
  isFinancialMonthSet: boolean;
  taskList: TaskGroup[];
  activeTask: number;
  connectedConnectors: ConnectorsType[];
  disabledConnectors: ConnectorsType[];
  isModalOpen: boolean;
  team: User[];
  brandOptions: brandOption[]
  selectedBrandIds: Array<number>
}
class BrandSetup extends React.Component<BrandSetupProps, BrandSetupState> {
  constructor(props: BrandSetupProps) {
    super(props);

    this.state = {
      activeTab: setupTabs.brand,
      imagePreviewUrl: iconUpload,
      activeWeekMode: weekModes.satSun,
      activeFincialDay: 0,
      activeFinancialMonth: months.jan,
      isFinancialDaySet: false,
      isFinancialMonthSet: false,
      taskList: dummyTaskGroups,
      activeTask: 0,
      connectedConnectors: [],
      disabledConnectors: [
        connectors.campaignManager,
        connectors.googleAds,
        connectors.sizmek,
        connectors.criteo
      ],
      isModalOpen: false,
      team: dummyUsers,
      brandOptions: [],
      selectedBrandIds: [],
    };

    this.setTab = this.setTab.bind(this);
    this.handleImageChange = this.handleImageChange.bind(this);
    this.handleNameInput = this.handleNameInput.bind(this);
    this.handleWeekModeToggle = this.handleWeekModeToggle.bind(this);
    this.handleConnectorClick = this.handleConnectorClick.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.completeCurrentTask = this.completeCurrentTask.bind(this);
    this.handleNewUserInvite = this.handleNewUserInvite.bind(this);
    this.handleUserRemove = this.handleUserRemove.bind(this);
    this.handleMonthInput = this.handleMonthInput.bind(this);
    this.handleDayInput = this.handleDayInput.bind(this);
  }

  componentDidMount() {
    this.props.getUsers();
    this.props.getBrands();
  }

  componentDidUpdate(prevProps) {
    if (this.props.newUser !== null && prevProps.newUser !== this.props.newUser) {
      this.props.getUsers();
    }
  }

  componentWillReceiveProps(nextProps, prevProps) {
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
    const {
      activeTab,
      imagePreviewUrl,
      activeWeekMode,
      activeFincialDay,
      activeFinancialMonth,
      taskList,
      connectedConnectors,
      disabledConnectors,
      isModalOpen,
      team,
      brandOptions
    } = this.state;

    const isInputRowCompleted = taskList[0].groupCompleted;
    const isConnectorsCompleted = [
      taskList[1],
      taskList[2],
      taskList[3],
      taskList[4],
    ].every(task => task.groupCompleted);

    return (
      <div>
        <HeadStyle />
        <TopNavWrapper>
          <TopNav loggedIn={true} />
        </TopNavWrapper>

        <ModalWrapper isOpen={isModalOpen} onClick={this.closeModal}>
          <Modal>
            <img src={placeholderLogin} />
          </Modal>
        </ModalWrapper>

        <Content>
          <TabRow>
            <Tab
              items={[setupTabs.brand, setupTabs.media, setupTabs.team]}
              getLabel={item => setupTabLabels.get(item)}
              activItem={activeTab}
              handleClick={this.setTab}
            />
            <Button label="Create" />
          </TabRow>

          {activeTab === setupTabs.brand && (
            <BrandSetupWrapper>
              <BrandSettingsWidget
                imagePreviewUrl={imagePreviewUrl as string}
                activeFinancialDay={activeFincialDay}
                activeFinancialMonth={activeFinancialMonth}
                activeWeekMode={activeWeekMode}
                handleImageChange={this.handleImageChange}
                handleNameInput={this.handleNameInput}
                handleDayInput={this.handleDayInput}
                handleMonthInput={this.handleMonthInput}
                handleWeekModeToggle={this.handleWeekModeToggle}
              />

              <OverlayWrapper enabled={isInputRowCompleted}>
                <ConnectorsWidget
                  disabled={disabledConnectors}
                  loading={[]}
                  connected={connectedConnectors}
                  imageUrl={
                    imagePreviewUrl !== iconUpload &&
                    (imagePreviewUrl as string)
                  }
                  handleConnectorClick={this.handleConnectorClick}
                />
              </OverlayWrapper>

              <TeamOverlay enabled={isConnectorsCompleted}>
                {/* <TeamWidget users={team} handleInvite={this.handleNewUserInvite} handleRemove={this.handleUserRemove} /> */}
                <TeamWidget
                  users={this.props.users.userLists}
                  handleInvite={this.handleInvite}
                  handleMultiSelect={this.handleMultiSelect}
                  brandOptions={brandOptions || []}
                />
              </TeamOverlay>
            </BrandSetupWrapper>
          )}
          {activeTab === setupTabs.media && (
            <div style={{ marginTop: 40 }}>TBC</div>
          )}
        </Content>

        <HighlightsBar>
          <TaskList taskGroups={taskList} />
          <NextButtonWrapper>
            <Button
              label="Next"
              size="small"
              color={colors.orangeVivid}
              handleClick={this.completeCurrentTask}
            />
          </NextButtonWrapper>
        </HighlightsBar>
      </div>
    );
  }

  handleNewUserInvite(isValid: boolean, newUserEmail: string, newUserRole: UserRoleType) {
    if (isValid && newUserEmail.length > 0) {
      const newTeam = cloneDeep(this.state.team);
      newTeam.push({
        avatar: defaultUserAvatar,
        name: "",
        email: newUserEmail,
        role: newUserRole,
      });

      this.setState({
        team: newTeam,
      });
    }
  }

  handleMonthInput(month: MonthType) {
    const alteredTaskList = cloneDeep(this.state.taskList);
    if (this.state.isFinancialDaySet) {
      alteredTaskList[0].tasks[2].completed = true;
    }

    this.setState({
      activeFinancialMonth: month,
      isFinancialMonthSet: true,
      taskList: alteredTaskList,
    })
  }

  handleDayInput(day: number) {
    const alteredTaskList = cloneDeep(this.state.taskList);

    if (this.state.isFinancialMonthSet) {
      alteredTaskList[0].tasks[2].completed = true;
    }
    this.setState({
      activeFincialDay: day,
      isFinancialDaySet: true,
      taskList: alteredTaskList,
    })
  }

  handleUserRemove(userToRemove: User) {
    const newTeam = remove(cloneDeep(this.state.team),
      member => member.email !== userToRemove.email);

    this.setState({
      team: newTeam
    })
  }

  closeModal() {
    this.setState({
      isModalOpen: false
    });
  }

  handleImageChange(e: ChangeEvent<HTMLInputElement>) {
    e.preventDefault();

    let reader = new FileReader();
    let file = e.target.files[0];

    const { taskList } = this.state;
    taskList[0].tasks[1].completed = true;

    if (isTaskListCompleted(taskList[0].tasks)) {
      taskList[0].groupCompleted = true;
    }

    reader.onloadend = () => {
      this.setState({
        imagePreviewUrl: reader.result,
        taskList
      });
    };

    reader.readAsDataURL(file);
  }

  handleNameInput(e: ChangeEvent<HTMLInputElement>) {
    const hasName = e.target.value.length > 0;
    const { taskList } = this.state;
    taskList[0].tasks[0].completed = hasName;

    if (isTaskListCompleted(taskList[0].tasks)) {
      taskList[0].groupCompleted = true;
    }

    this.setState({
      taskList
    });
  }

  handleWeekModeToggle(weekMode: WeekModeType) {
    const { taskList } = this.state;
    taskList[0].tasks[3].completed = true;

    if (isTaskListCompleted(taskList[0].tasks)) {
      taskList[0].groupCompleted = true;
    }

    this.setState({
      activeWeekMode: weekMode,
      taskList
    });
  }

  getConnectorGroupCompleted = (
    connector: ConnectorsType
  ): ConnectorGroupType | null => {
    if (
      connector === connectors.googleAnalytics ||
      connector === connectors.adobeAnalytics
    ) {
      return connectorGroups.siteAnalytics;
    } else if (
      connector === connectors.googleSearchConsole ||
      connector === connectors.semRush ||
      connector === connectors.ahrefs
    ) {
      return connectorGroups.seo;
    } else if (
      connector === connectors.salesforce ||
      connector === connectors.yesMail
    ) {
      return connectorGroups.email;
    }
  };

  getGroupMembers = (
    connectorGroupProps: Map<ConnectorGroupType, ConnectorGroupProp>,
    connector: ConnectorsType
  ): ConnectorsType[] => {
    let members = null;
    Array.from(connectorGroupProps.values()).forEach(group => {
      if (group.members.includes(connector)) {
        members = group.members.filter(conn => conn !== connector);
      }
    });

    return members;
  };

  getAlteredTaskListByConnector = (
    connector: ConnectorsType,
    taskList: TaskGroup[]
  ): TaskGroup[] => {
    taskList.forEach(taskGroup => {
      if (taskGroup.tasks) {
        taskGroup.tasks.forEach(task => {
          if (task.connector === connector) {
            task.completed = !task.completed;
          }
        });
      }
      if (taskGroup.taskLists) {
        taskGroup.taskLists.forEach(taskList => {
          taskList.tasks.forEach(task => {
            if (task.connector === connector) {
              task.completed = !task.completed;
            }
          });
        });
      }
    });

    return taskList;
  };

  handleConnectorClick(connector: ConnectorsType) {
    const { connectedConnectors, disabledConnectors, taskList } = this.state;
    const members = this.getGroupMembers(connectorGroupProps, connector);
    const isSocialConnector =
      connectorGroupProps
        .get(connectorGroups.socialOrg)
        .members.includes(connector) ||
      connectorGroupProps
        .get(connectorGroups.socialPaid)
        .members.includes(connector);

    const alteredTaskList = this.getAlteredTaskListByConnector(
      connector,
      cloneDeep(taskList)
    );

    if (connectedConnectors.includes(connector)) {
      // remove from active
      this.setState({
        connectedConnectors: remove(
          connectedConnectors,
          conn => conn !== connector
        ),
        disabledConnectors: remove(
          disabledConnectors,
          conn => !members.includes(conn)
        ),
        taskList: alteredTaskList,
      });
    } else {
      // add to active

      const completedConnectorGroup = this.getConnectorGroupCompleted(
        connector
      );

      let nextActive = 0 + this.state.activeTask;
      if (completedConnectorGroup === connectorGroups.siteAnalytics) {
        alteredTaskList[1].groupCompleted = true;
        nextActive = 2;
      }
      if (completedConnectorGroup === connectorGroups.seo) {
        alteredTaskList[2].groupCompleted = true;
        nextActive = 3;
      }
      if (completedConnectorGroup === connectorGroups.email) {
        alteredTaskList[3].groupCompleted = true;
        nextActive = 4;
      }
      if (completedConnectorGroup === connectorGroups.socialOrg) {
        alteredTaskList[4].groupCompleted = true;
        nextActive = 5;
      }

      this.setState({
        connectedConnectors: connectedConnectors.concat(connector),
        disabledConnectors: !isSocialConnector
          ? disabledConnectors.concat(members)
          : disabledConnectors,
        isModalOpen: true,
        taskList: alteredTaskList,
        activeTask: nextActive,
      });
    }
  }

  setTab(tab: SetupTabType) {
    this.setState({
      activeTab: tab
    });
  }

  completeCurrentTask() {
    const { activeTask } = this.state;
    const alteredTaskList = cloneDeep(this.state.taskList);
    alteredTaskList[activeTask].groupCompleted = true;

    this.setState({
      taskList: alteredTaskList,
      activeTask: (activeTask < alteredTaskList.length - 2) ? activeTask + 1 : activeTask,
    });
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

export default connect(mapStateToProps, mapDispatchToprops)(withAuth(BrandSetup));


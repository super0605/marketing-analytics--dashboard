export interface ADUserModel {
  id: string
  displayName: string
  principalName: string
  type: string
  isEnabled: boolean
}

export interface BrandModel {
  id: number
  key:	string
  name:	string
  tenantId: number	
  tenant: TenantModel
}

export interface TenantModel {
  id: number
  key:	string
  name:	string
}

export interface UserModel {
  id: number
  tenantId: number
  email:	string
  role:	string
  hasAcceptedInvitation:	boolean
  invitationCode:	string
  displayName:	string
  imageUrl: string
  tenant:	TenantModel
  brands: BrandModel[]
  groups: GroupModel[]
}

export interface GroupModel {
  id:	number
  name:	string
  tenantId:	number
  tenant:	TenantModel
  users:	UserModel[]
}


export enum userRoles {
  Administrator,
  PowerAnalyst,
  Analyst,
  Client
};
export type UserRoleType = userRoles;
export const allRoles = [
  userRoles.Administrator,
  userRoles.PowerAnalyst,
  userRoles.Analyst,
  userRoles.Client,
];
export const userRoleLabels = new Map<UserRoleType, string>([
  [userRoles.Administrator, "Administrator"],
  [userRoles.Analyst, "Analyst"],
  [userRoles.PowerAnalyst, "Power Analyst"],
  [userRoles.Client, "Client"]
]);

export interface AddUserRequest {
  email:	string
  displayName:	string
  role:	string
  brands: number[]
}

export interface LookupModel {
  key: string
  text: string
}

export interface LookupListModel {
  [key: string]: LookupModel[]
}

// webiste summary
export interface Value {
  current: number;
  previous: number;
  change: number;
}

export interface WebsiteSummaryModel {
  current: number;
  previous: number;
  change: number;
}

export interface WebsiteSummariesModel {
  [key: string]: WebsiteSummaryModel
}

export interface WebsiteBehaviourChannelsModel {
  [key: string]: Value;
}

export interface WebsiteBehaviourTimelineModel {
  [key: string]: Value;
}

export interface WebsiteTransactionsSummaryModel {
  current: number;
  previous: number;
  change: number;
}

export interface WebsiteTransactionsSummariesModel {
  [key: string]: WebsiteTransactionsSummaryModel
}

export interface WebsiteTransactionsTimelineModel {
  [key: string]: Value;
}

export interface WebsiteTransactionsChannelModel {
  [key: string]: Value;
}

export interface WebsiteTransactionsProductsModel {
  [key: string]: Value;
}

export interface WebsiteGeographicModel {
  [key: string]: {
    [key: string]: Value;
  }
}
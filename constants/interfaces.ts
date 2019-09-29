import {UserRoleType, ConnectorsType, globalFiltersQuery} from "./constants";
import { LookupModel } from "~/models";

export interface Client {
  name: string,
  logo?: string,
}

export interface ClientSummary {
  client: Client,
  sparkLine: string,
  sparkProgress: number,
  activity?: Activity,
}

export interface User {
  name: string,
  avatar: string,
  role: UserRoleType,
  email?: string,
}

export interface Activity {
  content: ActivityComment
  time: string,
}

export interface ActivityComment {
  user: User,
  message: string,
}
export interface ActivityProblem {
  level: "warning" | "error",
  message: string,
}

export interface SelectValue {
  name: String,
  value: String
}

export interface CustomLegendItem {
  name: string,
  color: string,
  shape?: string,
  lineWidth?: number,
  strokeWidth?: number,
}

export interface MapAnalyticsData {
  country: String,
  countryCode: string,
  revenue: number,
  change: number,
}

export interface Task {
  name: string;
  completed: boolean;
  connector?: ConnectorsType;
}
export interface TitledTaskList {
  title: string;
  tasks: Task[];
}
export interface TaskGroup {
  name: string;
  message: string;
  groupCompleted: boolean;
  tasks?: Task[];
  taskLists?: TitledTaskList[];
} 

// tree table 
export interface TreeTableColumn {
  name: string;
  title: string;
  width?: number;
  unit?: string;
}


export interface TreeTableData {
  uuid?: number,
  channel: string,
  [key: string]: any,
  change: number,
  children?: TreeTableData[],
}

// stacked bar
export interface StackedBarRevenueData {
  name: string;
  title?: string;
  [key: string]: any;
  color?: string;
}

// email tab matrix of campaign
export interface matrixData {
  strokeColor: string;
  strokeWidth: number;
}

export interface matrix {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  stroke: string;
  strokeWidthVal: number;
}

// brands type

export interface brandOption {
  label: string;
  value: number;
  color?: string;
  isFixed?: boolean;
  disabled?: boolean;
}

// global filters query
export interface globalFiltersQueryObj {
  [globalFiltersQuery.Range]: string;
  [globalFiltersQuery.Channel]: string;
  [globalFiltersQuery.Device]: string;
  [globalFiltersQuery.Region]: string;
  [globalFiltersQuery.CompareWith]: string;
}
export type globalFiltersQueryObjType = globalFiltersQueryObj;

export interface globalFiltersObj {
  [globalFiltersQuery.Range]: LookupModel;
  [globalFiltersQuery.Channel]: LookupModel;
  [globalFiltersQuery.Device]: LookupModel;
  [globalFiltersQuery.Region]: LookupModel;
  [globalFiltersQuery.CompareWith]: LookupModel;
}
export type globalFiltersObjType = globalFiltersObj;

// websit tab
// // website behaviour pills properties
export interface  websitePillProperty {
  pillColor: string;
  pillValUnit: string;
  pillValColor: string;
  pillChangeValUnit: string;
  pillChangeValColor: string;
}
export type WebsitePillPropertyType = websitePillProperty;

export interface websiteBehaviourChannelChartObj {
  x: number;
  y: number;
  z: string;
  text: string;
}
export type websiteBehaviourChannelChartObjType = websiteBehaviourChannelChartObj;

export interface websiteBehaviourTimelinechartObj {
  name: string;
  current: number;
  previous: number;
}
export type websiteBahaviourTimelineChartObjType = websiteBehaviourTimelinechartObj;

export interface websiteTransactionsTimelinechartObj {
  name: string;
  current: number;
  previous: number;
}
export type websiteTransactionsTimelineChartObjType = websiteTransactionsTimelinechartObj;
// general table
export interface GeneralTH {
  key: string;
  value: string;
  width: number;
  formatter?: (item: string | number) => string | number;
}
export type GeneralTHType = GeneralTH;

export interface GeneralTD {
  key: string;
  value: string | number;
  formatter?: (item: string | number) => string | number;
}

// website transaction products data 
export interface websiteTransactionsProductData {
  name: string;
  title?: string;
  [key: string]: any;
  change: number;
  color?: string;
}
export type websiteTransactionsPRoductDataType = websiteTransactionsProductData;

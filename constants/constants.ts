// string and num constants
export enum sizes {
  hair = 1,
  dblhair = 2,
  bristle = 3,
  micro = 4,
  tiny = 6,
  thin = 8,
  fine = 10,
  little = 14,
  small = 18,
  petite = 20,
  junior = 24,
  compact = 28,
  twice = 32,
  medium = 36,
  hefty = 40,
  big = 48,
  large = 56,
  wide = 72,
  huge = 90,
  mediumhuge = 154,
  extremehuge = 200,
}
export const px = (value: number): string => `${value}px`;

export const rem = 16;

// fonts
export enum fonts {
  headerFont = "'Open Sans', Helvetica, Arial,serif",
  weightRegular = "400",
  weightSemiBold = "600",
  weightBold = "700",
}

export enum fontSizesEmMajorThird {
  macro = "0.512em",
  micro = "0.64em",
  small = "0.8em",
  base = "1em",
  medium = "1.25em",
  big = "1.563em",
  large = "1.953em",
  huge = "2.441em",
  gigantic = "3.052em",
}

// colors
export enum colors {
  transparent = "rgba(0, 0, 0, 0)",
  white = "#ffffff",
  red = "#ff0000",
  black = "#161616",
  blackTotal = "#000000",
  blackAlpha10 = "rgba(0, 0, 0, 0.10)",
  blackAlpha12 = "rgba(0, 0, 0, 0.12)",
  blackAlpha14 = "rgba(0, 0, 0, 0.14)",
  grayVeryDark = "#343434",
  grayDark = "#646464",
  grayShady = "#909090",
  grayMedium = "#C8C8C8",
  grayLight = "#F0F0F0",
  grayUltraLight = "#F5F5F5",
  snow = "#FAFAFA",
  blueViking = "#53B0BF",
  blueVikingAlph5 = "rgba(118, 134, 137, 0.05)",
  blueTurquiseDeep = "#125969",
  orangeOchre = "#DD8226",
  orangeVivid = "#F69808",
  orangeVividAlpha5 = "rgba(246, 152, 8, 0.05)",
  orangeTan = "#FCAC64",
  redBrick = "#D13C4B",
  blueDatavizPrimary = "#350B48",
  purpleDark = "#350B48",
  purpleLight = "#8284d8",
  primary = blueViking,
  pillColorGrayLight = "#D2E3F0",
  pillColorGrayMedium = "#4394C3",
  pillColorGrayDark = "#063062",
  pillColorRed = "#DA1717",
}
export type ColorType = colors;

// z-indices
export enum zIndices {
  topMost = 1000,
  zTopNav = topMost,
  zDropdown = zTopNav - 1,
  zSidebar = zTopNav - 10,
}

// elevation
export enum elevation {
  dp05 =  "  0 0   2px "    + colors.blackAlpha10 +
          ", 0 2px 2px "    + colors.blackAlpha12,
  
  dp1 =   "  0 0   2px "    + colors.blackAlpha10 +
          ", 0 2px 2px "    + colors.blackAlpha12 + 
          ", 0 1px 3px "    + colors.blackAlpha14,
  
  dp2 =   "  0 2px 4px "    + colors.blackAlpha10 +
          ", 0 3px 4px "    + colors.blackAlpha12 + 
          ", 0 1px 5px "    + colors.blackAlpha14,

  dp3 =   "  0 3px 3px "    + colors.blackAlpha10 +
          ", 0 3px 4px "    + colors.blackAlpha12 + 
          ", 0 1px 8px "    + colors.blackAlpha14,

  dp4 =   "  0 2px 4px "    + colors.blackAlpha10 +
          ", 0 4px 5px "    + colors.blackAlpha12 + 
          ", 0 1px 10px "   + colors.blackAlpha14,
  
  dp6 =   "  0 6px 10px "   + colors.blackAlpha10 +
          ", 0 1px 18px "   + colors.blackAlpha12 + 
          ", 0 3px 5px "    + colors.blackAlpha14,
  
  dp8 =   "  0 8px 10px 1px "   + colors.blackAlpha10 +
          ", 0 3px 14px 3px "   + colors.blackAlpha12 + 
          ", 0 4px 5px "        + colors.blackAlpha14,
  
  dp12 =  "  0 12px 17px 2px "  + colors.blackAlpha10 +
          ", 0 5px 22px 4px "   + colors.blackAlpha12 + 
          ", 0 7px 8px "        + colors.blackAlpha14,
  
  dp16 =  "  0 16px 24px 2px "  + colors.blackAlpha10 +
          ", 0 6px 30px 5px "   + colors.blackAlpha12 + 
          ", 0 8px 10px "       + colors.blackAlpha14,
}

// breakpoints
export enum breakpoints {
  breakXs = 30 * rem,
  breakXss = 42 * rem,
  breakS = 58 * rem,
  breakM = 80 * rem,
}

// layout grid
const columnWidth = 102;
const gutterWidth = 16;

const betweenColumns = (columnWidth: number, gutterWidth: number, numColumns: number) => {
  return (columnWidth * numColumns) + (gutterWidth * (numColumns - 1));
}


// element sizes
export enum elementSizes {
  multiToggleHeight = sizes.compact,
  inputHeight = sizes.twice,
  iconSizeMid = sizes.twice,
  topNavHeight = sizes.hefty,
  sidebarItemHeight = 64,
  sidebarWidth = 100,
  highlightsBarWidth = 220,
  connectorsWidgetHeight = 434,
  tabItemWidth = 102,
  contentAreaWide = betweenColumns(columnWidth, gutterWidth, 10),
  buttonHeightSmall = 18,
  buttonHeightMedium = 24,
  buttonHeightBig = 30.
}

//
export enum opacities {
  disabled = 0.3,
}

// types
export enum icons {
  add,
  menu,
  close,
  closeTiny,
  upload,
  highlights,
  highlightsInv,
}
export type IconType = icons;

export enum avatars {
  female01,
  female02,
  female03,
  male01,
  male02,
}
export type AvatarType = avatars;

export enum sidebarItems {
  brandGravity,
  website,
  email,
  media,
  social,
  search,
  console,
}
export type SidebarItemType = sidebarItems;

export enum dropDownDirections {
  down,
  up
}
export type DropDownType = dropDownDirections;


export enum userRoles {
  analyst,
  poweranalyst,
  client
};
export type UserRoleType = userRoles;
export const allRoles = [
  userRoles.analyst,
  userRoles.poweranalyst,
  userRoles.client
];

export enum weekModes {
  satSun,
  sunSat,
}
export type WeekModeType = weekModes;

// connectors
export enum connectors {
  adobeAnalytics,
  googleAnalytics,
  googleSearchConsole,
  semRush,
  ahrefs,
  salesforce,
  yesMail,
  campaignManager,
  googleAds,
  sizmek,
  criteo,
  facebookOrg,
  instagramOrg,
  linkedinOrg,
  youtubeOrg,
  pinterestOrg,
  twitterOrg,
  csvImportOrg,
  facebookPaid,
  instagramPaid,
  linkedinPaid,
  youtubePaid,
  pinterestPaid,
  twitterPaid,
  csvImportPaid,
}
export type ConnectorsType = connectors;

export enum connectorGroups {
  siteAnalytics,
  seo,
  email,
  paidMedia,
  socialOrg,
  socialPaid,
}
export type ConnectorGroupType = connectorGroups;

export enum setupTabs {
  brand,
  media,
  team
}
export type SetupTabType = setupTabs;

export enum toggleStates {
  left,
  right,
}
export type ToggleStateType = toggleStates;


export enum connectorStates {
  empty,
  add,
  connected,
  disabled,
}

// global filters
export enum globalFilters {
  Countries,
  Regions,
  Channels,
  DeviceTypes,
  Users,
  DateRanges,
  ComparisonPeriods,
}
export type GlobalFiltersType = globalFilters;

export enum globalFiltersQuery {
  Range,
  CompareWith,
  Device,
  Channel,
  Region,
}
export type GlobalFiltersQueryType = globalFiltersQuery;

export enum filtersDate {
  lastWeek,
  lastMonth,
  lastSeven,
  lastThirty,
}
export type FilterDateType = filtersDate;

export enum filtersChannel {
  channel,
  direct,
  organicSearch,
  social,
  email,
  affiliates,
  referall,
  paidSearch,
  otherAdvertising,
  display,
}
export type FilterChannelType = filtersChannel;

export enum filtersDevice {
  all,
  desktop,
  tablet,
  mobile,
}
export type FilterDeviceType = filtersDevice;

export enum filtersRegion {
  latinAmerica,
  asiaPacific,
  europe,
  greaterChina,
  middleEastAfrica,
  northAmerica,
}
export type FilterRegionType = filtersRegion;

export enum filtersComparison {
  vsLastYear,
  vsLastQuarter,
}
export type FilterComparisonType = filtersComparison;


export enum months {
  jan,
  feb,
  mar,
  apr,
  may,
  jun,
  jul,
  aug,
  sep,
  oct,
  nov,
  dec,
}
export type MonthType = months;


export type ConnectorStateType = connectorStates;
// sunburst data
export type SunburstChildren = {
  name: string;
  value?: number;
  children?: Array<{}>;
}

export type SunburstData = {
  name?: string;
  value?: number;
  children: SunburstChildren[];
}

// website tab
export enum websiteBehaviourPills {
  Sessions,
  Users,
  AverageTimeOnSite,
  BounceRate,
  PagesPerSession,
}
export type WebsiteBehaviourPillsType = websiteBehaviourPills;

export enum websiteTransactionsPills {
  Revenue,
  Orders,
  ConversionRate,
  RevenuePerOrder,
  Units,
}
export type WebsiteTransactionsPillsType = websiteTransactionsPills;

export enum websiteGeographicMetrics {
  Revenue,
  Orders,
  Units,
  Users,
  Sessions,
}
export type WebsiteGeographicMetricsType = websiteGeographicMetrics;

export enum websiteTransactionProductsMetrics {
  Revenue,
  UniquePurchases,
  Units,
}
export type WebsiteTransactionProductsMetricsType = websiteTransactionProductsMetrics;

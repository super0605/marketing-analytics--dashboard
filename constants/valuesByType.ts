import {
  sidebarItems,
  SidebarItemType,
  userRoles,
  UserRoleType,
  weekModes,
  WeekModeType,
  icons,
  IconType,
  connectors,
  ConnectorsType,
  ConnectorGroupType,
  connectorGroups,
  AvatarType,
  avatars,
  SetupTabType,
  setupTabs,
  filtersDate,
  filtersChannel,
  filtersDevice,
  filtersRegion,
  filtersComparison,
  FilterDateType,
  FilterChannelType,
  FilterDeviceType,
  FilterRegionType,
  FilterComparisonType,
  months,
  MonthType,
  GlobalFiltersType,
  globalFilters,
  WebsiteBehaviourPillsType,
  websiteBehaviourPills,
  GlobalFiltersQueryType,
  globalFiltersQuery,
  colors,
  websiteTransactionsPills,
  WebsiteTransactionsPillsType,
  WebsiteTransactionProductsMetricsType,
  websiteTransactionProductsMetrics,
} from "./constants";

import iconAdd from "../static/media/icons/icon__add--filled.png";
import iconClose from "../static/media/icons/icon__close--small.png";
import iconCloseTiny from "../static/media/icons/icon__close.png";
import iconHighlights from "../static/media/icons/icon__highlights.png";
import iconHighlightsInverted from "../static/media/icons/icon__highlights--inverted.png";
import iconSidebarBrandGravity from "../static/media/icons/icon__sidebar__brand-gravity.png";
import iconSidebarWebsite from "../static/media/icons/icon__sidebar__website.png";
import iconSidebarEmail from "../static/media/icons/icon__sidebar__email.png";
import iconSidebarMedia from "../static/media/icons/icon__sidebar__media.png";
import iconSidebarSocial from "../static/media/icons/icon__sidebar__social.png";
import iconSidebarSearch from "../static/media/icons/icon__sidebar__search.png";
import iconSidebarConsole from "../static/media/icons/icon__sidebar__console.png";

import avatarFemale01 from "../static/media/avatar__female01.png";
import avatarFemale02 from "../static/media/avatar__female02.png";
import avatarFemale03 from "../static/media/avatar__female03.png";
import avatarMale01 from "../static/media/avatar__male01.png";
import avatarMale02 from "../static/media/avatar__male02.png";
import { WebsitePillPropertyType } from "./interfaces";

interface SidebarProp {
  label: string;
  iconSrc: string;
  page: string;
  as?: string;
}
export const sidebarProps = new Map<SidebarItemType, SidebarProp>([
  [
    sidebarItems.brandGravity,
    {
      label: "Brand Gravity",
      iconSrc: iconSidebarBrandGravity,
      page: "/brandGravity",
      as: "/brand-gravity"
    }
  ],
  [
    sidebarItems.website,
    {
      label: "Website",
      iconSrc: iconSidebarWebsite,
      page: "/website"
    }
  ],
  [
    sidebarItems.email,
    {
      label: "Email",
      iconSrc: iconSidebarEmail,
      page: "/email"
    }
  ],
  [
    sidebarItems.media,
    {
      label: "Media",
      iconSrc: iconSidebarMedia,
      page: "/media"
    }
  ],
  [
    sidebarItems.social,
    {
      label: "Social",
      iconSrc: iconSidebarSocial,
      page: "/social"
    }
  ],
  [
    sidebarItems.search,
    {
      label: "Search",
      iconSrc: iconSidebarSearch,
      page: "/search"
    }
  ],
  [
    sidebarItems.console,
    {
      label: "Console",
      iconSrc: iconSidebarConsole,
      page: "/brandConsole",
      as: "/brand-console"
    }
  ]
]);

export const userRoleLabels = new Map<UserRoleType, string>([
  [userRoles.analyst, "Analyst"],
  [userRoles.poweranalyst, "Power Analyst"],
  [userRoles.client, "Client"]
]);

export const setupTabLabels = new Map<SetupTabType, string>([
  [setupTabs.brand, "Brand"],
  [setupTabs.media, "Media"],
  [setupTabs.team, "Team"]
]);

export const monthProps = new Map<
  MonthType,
  {
    labelShort: string;
    labelFull: string;
    days: number;
  }
>([
  [months.jan, { labelShort: "Jan", labelFull: "January", days: 31 }],
  [months.feb, { labelShort: "Feb", labelFull: "February", days: 28 }],
  [months.mar, { labelShort: "Mar", labelFull: "March", days: 31 }],
  [months.apr, { labelShort: "Apr", labelFull: "April", days: 30 }],
  [months.may, { labelShort: "May", labelFull: "May", days: 31 }],
  [months.jun, { labelShort: "Jun", labelFull: "June", days: 30 }],
  [months.jul, { labelShort: "Jul", labelFull: "July", days: 31 }],
  [months.aug, { labelShort: "Aug", labelFull: "August", days: 31 }],
  [months.sep, { labelShort: "Sep", labelFull: "September", days: 30 }],
  [months.oct, { labelShort: "Oct", labelFull: "October", days: 31 }],
  [months.nov, { labelShort: "Nov", labelFull: "November", days: 30 }],
  [months.dec, { labelShort: "Dec", labelFull: "December", days: 31 }],

]);

// global filters
export const globalFiltersLabels = new Map<GlobalFiltersType, string>([
  [globalFilters.Countries, "Countries"],
  [globalFilters.Regions, "Regions"],
  [globalFilters.Channels, "Channels"],
  [globalFilters.DeviceTypes, "DeviceTypes"],
  [globalFilters.Users, "Users"],
  [globalFilters.DateRanges, "DateRanges"],
  [globalFilters.ComparisonPeriods, "ComparisonPeriods"],
])
export const filtersDateLabels = new Map<FilterDateType, string>([
  [filtersDate.lastWeek, "Last Week"],
  [filtersDate.lastMonth, "Last Month"],
  [filtersDate.lastSeven, "Last 7 days"],
  [filtersDate.lastThirty, "Last 30 days"],
]);
export const filtersChannelLabels = new Map<FilterChannelType, string>([
  [filtersChannel.channel, "Channel"],
  [filtersChannel.direct, "Direct"],
  [filtersChannel.organicSearch, "Organic Search"],
  [filtersChannel.social, "Social"],
  [filtersChannel.email, "Email"],
  [filtersChannel.affiliates, "Affiliates"],
  [filtersChannel.referall, "Referral"],
  [filtersChannel.paidSearch, "Paid Search"],
  [filtersChannel.otherAdvertising, "Other Advertising"],
  [filtersChannel.display, "Diplay"],
]);
export const filtersDeviceLabels = new Map<FilterDeviceType, string>([
  [filtersDevice.all, "All"],
  [filtersDevice.desktop, "Desktop"],
  [filtersDevice.tablet, "Tablet"],
  [filtersDevice.mobile, "Mobile"]
]);
export const filtersRegionLabels = new Map<FilterRegionType, string>([
  [filtersRegion.latinAmerica, "Latin America"],
  [filtersRegion.europe, "Europe"],
  [filtersRegion.asiaPacific, "Asia Pacific"],
  [filtersRegion.greaterChina, "Greater China"],
  [filtersRegion.middleEastAfrica, "Middle East & Africa"],
  [filtersRegion.northAmerica, "North America"]
]);
export const filtersComparisonLabels = new Map<FilterComparisonType, string>([
  [filtersComparison.vsLastYear, "vs. last year"],
  [filtersComparison.vsLastQuarter, "vs. last quarter"]
]);

export const weekModeLabels = new Map<WeekModeType, string>([
  [weekModes.satSun, "Sat-Sun"],
  [weekModes.sunSat, "Sun-Sat"]
]);

export const iconUrls = new Map<IconType, string>([
  [icons.add, iconAdd],
  [icons.close, iconClose],
  [icons.closeTiny, iconCloseTiny],
  [icons.highlights, iconHighlights],
  [icons.highlightsInv, iconHighlightsInverted]
]);

export const avatarUrls = new Map<AvatarType, string>([
  [avatars.female01, avatarFemale01],
  [avatars.female02, avatarFemale02],
  [avatars.female03, avatarFemale03],
  [avatars.male01, avatarMale01],
  [avatars.male02, avatarMale02]
]);

// global filter query
export const globalFiltersQueryKeys = new Map<GlobalFiltersQueryType, string>([
  [globalFiltersQuery.Range, "Range"],
  [globalFiltersQuery.Channel, "Channel"],
  [globalFiltersQuery.Device, "Device"],
  [globalFiltersQuery.Region, "Region"],
  [globalFiltersQuery.CompareWith, "CompareWith"],
]);

// connector widget
const connectorSettings = {
  headlineHeight: 16,
  rowHeight: 24,

  ySiteAnalytics: 42,
  ySEO: 122,
  yEmail: 226,
  yPaidMedia: 308,
  ySocialOrg: 42,
  ySocialPaid: 242
};

export interface ConnectorGroupProp {
  label: string;
  y: number;
  side: "left" | "right";
  members: ConnectorsType[];
  disabled?: boolean;
}
export const connectorGroupProps = new Map<
  ConnectorGroupType,
  ConnectorGroupProp
>([
  [
    connectorGroups.siteAnalytics,
    {
      label: "Site analytics",
      y: connectorSettings.ySiteAnalytics,
      side: "left",
      members: [connectors.googleAnalytics, connectors.adobeAnalytics]
    }
  ],
  [
    connectorGroups.seo,
    {
      label: "SEO",
      y: connectorSettings.ySEO,
      side: "left",
      members: [
        connectors.googleSearchConsole,
        connectors.semRush,
        connectors.ahrefs
      ]
    }
  ],
  [
    connectorGroups.email,
    {
      label: "Email",
      y: connectorSettings.yEmail,
      side: "left",
      members: [connectors.salesforce, connectors.yesMail]
    }
  ],
  [
    connectorGroups.paidMedia,
    {
      label: "Paid Media",
      y: connectorSettings.yPaidMedia,
      side: "left",
      members: [
        connectors.campaignManager,
        connectors.googleAds,
        connectors.sizmek,
        connectors.criteo
      ],
      disabled: true
    }
  ],
  [
    connectorGroups.socialOrg,
    {
      label: "Social - organic",
      y: connectorSettings.ySocialOrg,
      side: "right",
      members: [
        connectors.facebookOrg,
        connectors.instagramOrg,
        connectors.linkedinOrg,
        connectors.youtubeOrg,
        connectors.pinterestOrg,
        connectors.twitterOrg,
        connectors.csvImportOrg
      ]
    }
  ],
  [
    connectorGroups.socialPaid,
    {
      label: "Social - paid",
      y: connectorSettings.ySocialPaid,
      side: "right",
      members: [
        connectors.facebookPaid,
        connectors.instagramPaid,
        connectors.linkedinPaid,
        connectors.youtubePaid,
        connectors.pinterestPaid,
        connectors.twitterPaid,
        connectors.csvImportPaid
      ]
    }
  ]
]);

const {
  headlineHeight,
  rowHeight,
  ySiteAnalytics,
  ySEO,
  yEmail,
  yPaidMedia,
  ySocialOrg,
  ySocialPaid
} = connectorSettings;
export interface ConnectorProp {
  label: string;
  y: number;
  side: "left" | "right";
}
export const connectorProps = new Map<ConnectorsType, ConnectorProp>([
  [
    connectors.googleAnalytics,
    {
      label: "Google Analytics",
      y: ySiteAnalytics + headlineHeight,
      side: "left"
    }
  ],
  [
    connectors.adobeAnalytics,
    {
      label: "Adobe Analytics",
      y: ySiteAnalytics + headlineHeight + rowHeight,
      side: "left"
    }
  ],
  [
    connectors.googleSearchConsole,
    {
      label: "Google Search Console",
      y: ySEO + headlineHeight,
      side: "left"
    }
  ],
  [
    connectors.semRush,
    {
      label: "SEMrush",
      y: ySEO + headlineHeight + rowHeight,
      side: "left"
    }
  ],
  [
    connectors.ahrefs,
    {
      label: "AHRefs",
      y: ySEO + headlineHeight + rowHeight * 2,
      side: "left"
    }
  ],

  [
    connectors.salesforce,
    {
      label: "Salesforce",
      y: yEmail + headlineHeight,
      side: "left"
    }
  ],
  [
    connectors.yesMail,
    {
      label: "YesMail",
      y: yEmail + headlineHeight + rowHeight,
      side: "left"
    }
  ],

  [
    connectors.campaignManager,
    {
      label: "Campaign Manger (DCM)",
      y: yPaidMedia + headlineHeight,
      side: "left"
    }
  ],
  [
    connectors.googleAds,
    {
      label: "Google Ads",
      y: yPaidMedia + headlineHeight + rowHeight,
      side: "left"
    }
  ],
  [
    connectors.sizmek,
    {
      label: "Sizmek",
      y: yPaidMedia + headlineHeight + rowHeight * 2,
      side: "left"
    }
  ],
  [
    connectors.criteo,
    {
      label: "Criteo",
      y: yPaidMedia + headlineHeight + rowHeight * 3,
      side: "left"
    }
  ],

  [
    connectors.facebookOrg,
    {
      label: "Facebook",
      y: ySocialOrg + headlineHeight,
      side: "right"
    }
  ],
  [
    connectors.instagramOrg,
    {
      label: "Instagram",
      y: ySocialOrg + headlineHeight + rowHeight,
      side: "right"
    }
  ],
  [
    connectors.linkedinOrg,
    {
      label: "LinkedIn",
      y: ySocialOrg + headlineHeight + rowHeight * 2,
      side: "right"
    }
  ],
  [
    connectors.youtubeOrg,
    {
      label: "Youtube",
      y: ySocialOrg + headlineHeight + rowHeight * 3,
      side: "right"
    }
  ],
  [
    connectors.pinterestOrg,
    {
      label: "Pinterest",
      y: ySocialOrg + headlineHeight + rowHeight * 4,
      side: "right"
    }
  ],
  [
    connectors.twitterOrg,
    {
      label: "Twitter",
      y: ySocialOrg + headlineHeight + rowHeight * 5,
      side: "right"
    }
  ],
  [
    connectors.csvImportOrg,
    {
      label: "CSV Import",
      y: ySocialOrg + headlineHeight + rowHeight * 6,
      side: "right"
    }
  ],

  [
    connectors.facebookPaid,
    {
      label: "Facebook Ads",
      y: ySocialPaid + headlineHeight,
      side: "right"
    }
  ],
  [
    connectors.instagramPaid,
    {
      label: "Instagram Ads",
      y: ySocialPaid + headlineHeight + rowHeight,
      side: "right"
    }
  ],
  [
    connectors.linkedinPaid,
    {
      label: "Linkedin Ads",
      y: ySocialPaid + headlineHeight + rowHeight * 2,
      side: "right"
    }
  ],
  [
    connectors.youtubePaid,
    {
      label: "Youtube",
      y: ySocialPaid + headlineHeight + rowHeight * 3,
      side: "right"
    }
  ],
  [
    connectors.pinterestPaid,
    {
      label: "Pinterest",
      y: ySocialPaid + headlineHeight + rowHeight * 4,
      side: "right"
    }
  ],
  [
    connectors.twitterPaid,
    {
      label: "Twitter Ads",
      y: ySocialPaid + headlineHeight + rowHeight * 5,
      side: "right"
    }
  ],
  [
    connectors.csvImportPaid,
    {
      label: "CSV Import",
      y: ySocialPaid + headlineHeight + rowHeight * 6,
      side: "right"
    }
  ]
]);

// website Behaviour pills
export const websiteBehaviourPillsKeys = new Map<WebsiteBehaviourPillsType, string>([
  [websiteBehaviourPills.Sessions, "Sessions"],
  [websiteBehaviourPills.Users, "Users"],
  [websiteBehaviourPills.AverageTimeOnSite, "AverageTimeOnSite"],
  [websiteBehaviourPills.BounceRate, "BounceRate"],
  [websiteBehaviourPills.PagesPerSession, "PagesPerSession"],
]);

export const websiteBehaviourPillsLabels = new Map<WebsiteBehaviourPillsType, string>([
  [websiteBehaviourPills.Sessions, "Sessions"],
  [websiteBehaviourPills.Users, "Unique visitors"],
  [websiteBehaviourPills.AverageTimeOnSite, "Avg. time on site"],
  [websiteBehaviourPills.BounceRate, "Bounce rate"],
  [websiteBehaviourPills.PagesPerSession, "Pages per visit"],
]);

export const websitePillProperties = new Map<WebsiteBehaviourPillsType, WebsitePillPropertyType>([
  [websiteBehaviourPills.Sessions, {
    pillColor: colors.pillColorGrayLight,
    pillValUnit: "k",
    pillValColor: "#000",
    pillChangeValUnit: "%",
    pillChangeValColor: "#000", 
  }],
  [websiteBehaviourPills.Users, {
    pillColor: colors.pillColorGrayMedium,
    pillValUnit: "k",
    pillValColor: "#000",
    pillChangeValUnit: "%",
    pillChangeValColor: "#000",
  }],
  [websiteBehaviourPills.AverageTimeOnSite, {
    pillColor: colors.pillColorGrayDark,
    pillValUnit: "s",
    pillValColor: "#000",
    pillChangeValUnit: "%",
    pillChangeValColor: "#000",
  }],
  [websiteBehaviourPills.BounceRate, {
    pillColor: colors.pillColorRed,
    pillValUnit: "%",
    pillValColor: "#000",
    pillChangeValUnit: "%",
    pillChangeValColor: "#000",
  }],
  [websiteBehaviourPills.PagesPerSession, {
    pillColor: colors.pillColorGrayLight,
    pillValUnit: "k",
    pillValColor: "#000",
    pillChangeValUnit: "%",
    pillChangeValColor: "#000",
  }],
]);

// website transactions pills
export const websiteTransactionsPillsKeys = new Map<WebsiteTransactionsPillsType, string>([
  [websiteTransactionsPills.Revenue, "Revenue"],
  [websiteTransactionsPills.Orders, "Orders"],
  [websiteTransactionsPills.Units, "Units"],
  [websiteTransactionsPills.ConversionRate, "ConversionRate"],
  [websiteTransactionsPills.RevenuePerOrder, "RevenuePerOrder"],
]);

export const websiteTransactionsPillsLabels = new Map<WebsiteTransactionsPillsType, string>([
  [websiteTransactionsPills.Revenue, "Revenue"],
  [websiteTransactionsPills.Orders, "Transactions"],
  [websiteTransactionsPills.Units, "Units"],
  [websiteTransactionsPills.ConversionRate, "Conversion rate"],
  [websiteTransactionsPills.RevenuePerOrder, "Revenue per order"],
]);

export const websiteTransactionsPillProperties = new Map<WebsiteTransactionsPillsType, WebsitePillPropertyType>([
  [websiteTransactionsPills.Revenue, {
    pillColor: colors.pillColorGrayLight,
    pillValUnit: "k",
    pillValColor: "#000",
    pillChangeValUnit: "%",
    pillChangeValColor: "#000", 
  }],
  [websiteTransactionsPills.Orders, {
    pillColor: colors.pillColorGrayMedium,
    pillValUnit: "k",
    pillValColor: "#000",
    pillChangeValUnit: "%",
    pillChangeValColor: "#000",
  }],
  [websiteTransactionsPills.Units, {
    pillColor: colors.pillColorGrayDark,
    pillValUnit: "s",
    pillValColor: "#000",
    pillChangeValUnit: "%",
    pillChangeValColor: "#000",
  }],
  [websiteTransactionsPills.ConversionRate, {
    pillColor: colors.pillColorRed,
    pillValUnit: "%",
    pillValColor: "#000",
    pillChangeValUnit: "%",
    pillChangeValColor: "#000",
  }],
  [websiteTransactionsPills.RevenuePerOrder, {
    pillColor: colors.pillColorGrayLight,
    pillValUnit: "k",
    pillValColor: "#000",
    pillChangeValUnit: "%",
    pillChangeValColor: "#000",
  }],
]);

// webiste transaction product metrics
export const websiteTransactionProductsKeys = new Map<WebsiteTransactionProductsMetricsType, string>([
  [websiteTransactionProductsMetrics.Revenue, "Revenue"],
  [websiteTransactionProductsMetrics.UniquePurchases, "UniquePurchases"],
  [websiteTransactionProductsMetrics.Units, "Units"],
]);

export const websiteTransactionProductsLabels = new Map<WebsiteTransactionProductsMetricsType, string>([
  [websiteTransactionProductsMetrics.Revenue, "Revenue"],
  [websiteTransactionProductsMetrics.UniquePurchases, "Unique Purchases"],
  [websiteTransactionProductsMetrics.Units, "Units"],
]);


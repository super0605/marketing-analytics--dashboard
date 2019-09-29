import { userRoles, connectors } from "../constants/constants";
import { TaskGroup, User } from "./interfaces";
import { connectorProps } from "../constants/valuesByType";
import avatarFemale02 from "../static/media/avatar__female02.png";
import avatarMale01 from "../static/media/avatar__male01.png";

export const dummyTaskGroups: TaskGroup[] = [
  {
    name: "Brand Setup",
    message: "Let’s get your brand account setup:",
    groupCompleted: false,
    tasks: [
      {
        name: "Enter brand name",
        completed: false
      },
      {
        name: "Upload or drag and drop your logo",
        completed: false
      },
      {
        name: "What's the first day of your financial year?",
        completed: false
      },
      {
        name: "Weekly report period",
        completed: false
      }
    ]
  },
  {
    name: "Site Analytics",
    message: "First, let’s connect your website analytics",
    groupCompleted: false,
    tasks: [
      {
        name: connectorProps.get(connectors.googleAnalytics).label,
        completed: false,
        connector: connectors.googleAnalytics,
      },
      {
        name: connectorProps.get(connectors.adobeAnalytics).label,
        completed: false,
        connector: connectors.adobeAnalytics
      }
    ]
  },
  {
    name: "SEO",
    message: `Thanks, we're now collecting data. \n\r
    
    To track your site's SEO performance, let's add these services`,
    groupCompleted: false,
    tasks: [
      {
        name: connectorProps.get(connectors.googleSearchConsole).label,
        completed: false,
        connector: connectors.googleSearchConsole
      },
      {
        name: connectorProps.get(connectors.semRush).label,
        completed: false,
        connector: connectors.semRush
      },
      {
        name: connectorProps.get(connectors.ahrefs).label,
        completed: false,
        connector: connectors.ahrefs
      }
    ]
  },
  {
    name: "Email",
    message: `Ok, they’re in the queue.

    For email (CRM) performance reports, please connect one of these providers`,
    groupCompleted: false,
    tasks: [
      {
        name: connectorProps.get(connectors.salesforce).label,
        completed: false,
        connector: connectors.salesforce
      },
      {
        name: connectorProps.get(connectors.yesMail).label,
        completed: false,
        connector: connectors.yesMail
      }
    ]
  },
  {
    name: "Social",
    message: `Next, on to social.

    Some of these connectors are a little more complicated, but we’ll take you through it`,
    groupCompleted: false,
    taskLists: [
      {
        title: "Social – organic",
        tasks: [
          {
            name: connectorProps.get(connectors.facebookOrg).label,
            completed: false,
            connector: connectors.facebookOrg
          },
          {
            name: connectorProps.get(connectors.instagramOrg).label,
            completed: false,
            connector: connectors.instagramOrg
          },
          {
            name: connectorProps.get(connectors.linkedinOrg).label,
            completed: false,
            connector: connectors.linkedinOrg
          },
          {
            name: connectorProps.get(connectors.youtubeOrg).label,
            completed: false,
            connector: connectors.youtubeOrg
          },
          {
            name: connectorProps.get(connectors.pinterestOrg).label,
            completed: false,
            connector: connectors.pinterestOrg
          },
          {
            name: connectorProps.get(connectors.twitterOrg).label,
            completed: false,
            connector: connectors.twitterOrg
          },
          {
            name: connectorProps.get(connectors.csvImportOrg).label,
            completed: false,
            connector: connectors.csvImportOrg
          }
        ]
      },
      {
        title: "Social – organic",
        tasks: [
          {
            name: connectorProps.get(connectors.facebookPaid).label,
            completed: false,
            connector: connectors.facebookPaid
          },
          {
            name: connectorProps.get(connectors.instagramPaid).label,
            completed: false,
            connector: connectors.instagramPaid
          },
          {
            name: connectorProps.get(connectors.linkedinPaid).label,
            completed: false,
            connector: connectors.linkedinPaid
          },
          {
            name: connectorProps.get(connectors.youtubePaid).label,
            completed: false,
            connector: connectors.youtubePaid
          },
          {
            name: connectorProps.get(connectors.pinterestPaid).label,
            completed: false,
            connector: connectors.pinterestPaid
          },
          {
            name: connectorProps.get(connectors.twitterPaid).label,
            completed: false,
            connector: connectors.twitterPaid
          },
          {
            name: connectorProps.get(connectors.csvImportPaid).label,
            completed: false,
            connector: connectors.csvImportPaid
          }
        ]
      }
    ]
  },
  {
    name: "Team",
    message: `Now that we’re busy importing data, it’s time to add team members and give them access. Adding colleagues or clients (read on) is easy, just follow the steps.`,
    groupCompleted: false,
    tasks: []
  },
  {
    name: "end",
    message: `You are welcome to make further adjustments. To complete Brand Setup and enter the Master Client View, simply click the create button.`,
    groupCompleted: false,
    tasks: []
  }
];

export const dummyUsers: User[] = [
  {
    avatar: avatarFemale02,
    name: "Rafeeda Nouri",
    role: userRoles.analyst,
    email: "r.nouri@gmail.com"
  },
  {
    avatar: avatarMale01,
    name: "Louis Parsons",
    role: userRoles.client,
    email: "louis.parsons@king.us"
  }
];


export const dummyExecutiveSummary = 
`This month's highlights include a substantial increase (over 60%) in website activity and revenue when compared to the previous period. Revenue from Google Ads increased 96.92% and organic revenue decreased 13.78%. Google PPC also generated 341 calls from mobile devices.

Revenue by channel:
● Organic: $31,194.00
● Google PPC: $44,838.00
● Referral: $2,960.00
● Bing/Yahoo PPC: $6,585.00
● Retargeting: $1,915.00`;
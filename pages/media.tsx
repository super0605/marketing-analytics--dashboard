import React from "react";
import withAuth from '../hocs/withAuth';
import { BasePage, ActivitySummaryWidget, CreativePerformanceWidget, FilterWidget, Top10PerformingSitesWidget } from "../components";
import { sidebarItems } from "../constants/constants";
import { HeadStyle } from "../constants/head";


export default withAuth(() => (
  <div>
    <HeadStyle />
    <BasePage activePage={sidebarItems.media}>
      <FilterWidget />

      <ActivitySummaryWidget />

      <CreativePerformanceWidget />

      <Top10PerformingSitesWidget />
      
    </BasePage>
  </div>
));

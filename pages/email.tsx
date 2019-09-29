import React from 'react'
import withAuth from '../hocs/withAuth';
import {BasePage, FilterWidget, EmailCampaignWidget, EmailTransactionsWidget, EmailAudienceWidget, GeographicWidget} from "../components";
import {sidebarItems } from '../constants/constants';
import {HeadStyle } from '../constants/head';


export default withAuth(() => (
  <div>
    <HeadStyle />

    <BasePage activePage={sidebarItems.email}>
      <FilterWidget />

      <EmailCampaignWidget />

      <EmailTransactionsWidget />

      <EmailAudienceWidget />

      <GeographicWidget />
    </BasePage>
  </div>
));

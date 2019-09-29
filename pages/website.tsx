import React from 'react'
import withAuth from '../hocs/withAuth';
import {GeographicWidget, GoalsWidget, BehaviourWidget, TransactionsWidget, FilterWidget, BasePage} from '../components/';
import {sidebarItems} from '../constants/constants';
import {HeadStyle } from '../constants/head';

export default withAuth(() => (
  <div>
    <HeadStyle />
    
    <BasePage activePage={sidebarItems.website}>
      
      <FilterWidget />
      
      {/* <GoalsWidget /> */}

      <BehaviourWidget />

      <TransactionsWidget />

      <GeographicWidget />

    </BasePage>
  </div>
));

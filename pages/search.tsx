import React from 'react';
import withAuth from '../hocs/withAuth';
import styled from "styled-components";
import {BasePage} from "../components";
import {sidebarItems } from '../constants/constants';
import {HeadStyle } from '../constants/head';

import wireframeSearch from "../static/media/images/wireframes__search.jpg";

const Placeholder = styled.img`
  width: 100%;
`;

export default withAuth(() => (
  <div>
    <HeadStyle />
    
    <BasePage activePage={sidebarItems.search}>
      <Placeholder src={wireframeSearch} />
    </BasePage>
  </div>
));
 
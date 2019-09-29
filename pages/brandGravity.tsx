import React from 'react';
import withAuth from '../hocs/withAuth';
import styled from "styled-components";
import {BasePage} from "../components";
import {sidebarItems } from '../constants/constants';
import {HeadStyle } from '../constants/head';

import brandGravity from "../static/media/images/placeholder__brandGravity.jpg";

const Placeholder = styled.img`
  width: 100%;
`;

export default withAuth(() => (
  <div>
    <HeadStyle />
    
    <BasePage activePage={sidebarItems.brandGravity} background="#EAEAEC">
      <Placeholder src={brandGravity} />
    </BasePage>
  </div>
));

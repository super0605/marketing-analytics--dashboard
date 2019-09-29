import * as React from "react";
import styled from "styled-components";
import {
  TopNav,
  Sidebar,
  HighlightsBar,
  ExecutiveSummary,
  SystemMessage,
} from "../../../../components";
import {
  px,
  SidebarItemType,
  zIndices,
  elementSizes,
  sizes
} from "../../../../constants/constants";
import {dummyExecutiveSummary} from "../../../../constants/dummies";

const NavigationWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  box-sizing: border-box;
  overflow: hidden;
  margin: 0;
  padding: 0;
  pointer-events: none;
  z-index: ${zIndices.zTopNav};
`;

const TopNavWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
`;

const ContentWrapper = styled.div`
  width: 100%;
  padding-left: ${px(elementSizes.sidebarWidth)};
  margin-top: ${px(elementSizes.topNavHeight)};
  padding-top: ${px(sizes.hefty)};
`;

const ContentArea = styled.div`
  width: 100%;
  box-sizing: border-box;
  padding: 0 ${px(300)} ${px(sizes.huge)} ${px(sizes.large)};
`;

interface BasePageCompProps {
  activePage: SidebarItemType;
  children?: React.ReactNode;
  background?: string;
}
const BasePageComp = (props: BasePageCompProps) => {
  const { activePage, background } = props;
  return (
    <div
      style={{
        backgroundColor: background ? background : "inherit"
      }}
    >
      <ContentWrapper>
        <NavigationWrapper>
          <Sidebar activeItem={activePage} />
          <TopNavWrapper>
            <TopNav loggedIn={true} />
          </TopNavWrapper>
        </NavigationWrapper>

        <ContentArea>{props.children}</ContentArea>
        <HighlightsBar>
          <ExecutiveSummary
            text={dummyExecutiveSummary}
          />
          <SystemMessage
            text="Increase in average time on site"
          />
          <SystemMessage
            text="Pages per visit is the onsite behaviour with the largest YoY decrease (3.4%)"
          />
        </HighlightsBar>
      </ContentWrapper>
    </div>
  );
};

export default BasePageComp;

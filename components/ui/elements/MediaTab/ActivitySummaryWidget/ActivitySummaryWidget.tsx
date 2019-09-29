import * as React from 'react';
import styled from 'styled-components';
import { sizes, px } from "../../../../../constants/constants";
import { H1, RangeGradientBar } from "../../../../../components";
import { widgetStyle } from '../../../../../constants/style-constants';
import ActivitySummaryIntro from './ActivitySummaryIntro';
import ActivitySummaryPills from './ActivitySummaryPills';

const ActivitySummaryWidget = styled.div`
  width: 100%;
  padding-top: ${px(sizes.junior)};
`;

const WidgetBaseLayout = styled.div`
  ${widgetStyle};
  width: 100%;
  padding: ${px(sizes.fine)} ${px(sizes.junior)};
  box-sizing: border-box;
`;

const ComponentWrapper = styled.div`
  width: 100%;
`;

interface SpaceDividerProps {
  height: number;
}
const SpaceDivider = styled.div`
  width: 100%;
  height: ${(props: SpaceDividerProps) => props.height}px;
`;

const ActivitySummaryWidgetCompo = () => {
  return (
    <ActivitySummaryWidget>
      <H1 content="Activity summary" />
      <ActivitySummaryIntro
        date="January 2019"
        spend={5000}
        sites={20}
        partners={20}
        liveCampaigns={12}
        impressions={6.5}
        avgCTR={3.4}
      />
      <WidgetBaseLayout>
        <ComponentWrapper>
          <SpaceDivider height={sizes.petite} />
          <ActivitySummaryPills />
          <RangeGradientBar
            startVal="Low"
            endVal="High"
            title="Performance"
            barWidth={150}
            gradient="background-image: linear-gradient(to right, #720606, #973644, #b0647d, #c293b0, #d5c2d8, #ccc1d4, #c5c0cf, #c0bfc9, #9292a3, #64677e, #37405c, #041d3b);"
          />
        </ComponentWrapper>
      </WidgetBaseLayout>
    </ActivitySummaryWidget>
  );
}

export default ActivitySummaryWidgetCompo;

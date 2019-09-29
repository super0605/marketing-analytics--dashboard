import * as React from 'react';
import styled from 'styled-components';
import { sizes, px } from "../../../../../constants/constants";
import { H1, Divider } from "../../../../../components";
import { widgetStyle } from '../../../../../constants/style-constants';
import Top10PerformingSitestIntro from './Top10PerformingSitestIntro';
import Top10PerformingSitesTable from './Top10PerformingSitesTable';
import Top10PerformingSitesTableFilter from './Top10PerformingSitesTableFilter';


const Top10PerformingSitesWidget = styled.div`
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

const Top10PerformingSitesWidgetCompo = () => {
  return (
    <Top10PerformingSitesWidget>
      <H1 content="Top 10 performing sites" />
      <Top10PerformingSitestIntro
        spend={10.3}
        impressions={23}
      />

      <WidgetBaseLayout>
        <ComponentWrapper>
          <SpaceDivider height={sizes.petite} />
          <Top10PerformingSitesTableFilter />
          <Top10PerformingSitesTable />
        </ComponentWrapper>
      </WidgetBaseLayout>
    </Top10PerformingSitesWidget>
  );
}

export default Top10PerformingSitesWidgetCompo;

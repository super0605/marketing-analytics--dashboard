import * as React from 'react';
import styled from 'styled-components';
import { sizes, px } from "../../../../../constants/constants";
import { H1, Divider } from "../../../../../components";
import { widgetStyle } from '../../../../../constants/style-constants';
import CreativePerformanceFilter from './CreativePerformanceFilter';
import CreativePerformanceCloud from './CreativePerformanceCloud';
import CreativePerformanceTable from './CreativePerformanceTable';

const CreativePerformanceWidget = styled.div`
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

const CreativePerformanceWidgetCompo = () => {
  return (
    <CreativePerformanceWidget>
      <H1 content="Creative performance" />
      
      <WidgetBaseLayout>
        <ComponentWrapper>
          <SpaceDivider height={sizes.petite} />
          <CreativePerformanceFilter />
          <CreativePerformanceCloud />
        </ComponentWrapper>
        <Divider />
        <ComponentWrapper>
          <SpaceDivider height={sizes.petite} />
          <CreativePerformanceTable />
        </ComponentWrapper>
      </WidgetBaseLayout>
    </CreativePerformanceWidget>
  );
}

export default CreativePerformanceWidgetCompo;

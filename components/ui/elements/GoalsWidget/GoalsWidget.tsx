import * as React from 'react';
import styled from 'styled-components';
import CurrentGoals from './CurrentGoals';
import { sizes, px } from "../../../../constants/constants";
import { H1, Divider, TimelineWidget } from "../../../../components";
import { widgetStyle, labelMediumEmphasized } from '../../../../constants/style-constants';

const GoalsWidget = styled.div`
    width: 100%;
    padding-top: ${px(sizes.junior)};
`;

const WidgetBaseLayout = styled.div`
    ${widgetStyle};
    width: 100%;
    padding: ${px(sizes.fine)} ${px(sizes.junior)};
    box-sizing: border-box;
`;

const LabelDescription = styled.div`
    ${labelMediumEmphasized};
    padding-bottom: ${px(sizes.fine)};
`;

const GoalsWidgetCompo = () => {
  return (
    <GoalsWidget>
      <H1 content="Goals" />
      <LabelDescription>
        The % transaction offsetting carbon footprint goal has the highest increase since last period
      </LabelDescription>
      <WidgetBaseLayout>
        <CurrentGoals />
        <Divider />
        <TimelineWidget />
      </WidgetBaseLayout>
    </GoalsWidget>
  );
}

export default GoalsWidgetCompo;

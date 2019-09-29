import * as React from 'react';
import styled from 'styled-components';
import { sizes, px } from "../../../../constants/constants";
import BehaviourPills from "./BehaviourPills";
import BehaviourChannelChart from "./BehaviourChannelChart";
import BehaviourTimeline from "./BehaviourTimeline";
import { H1, Divider } from "../../../../components";
import { widgetStyle, labelMediumEmphasized } from '../../../../constants/style-constants';

const Behaviour = styled.div`
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

const BehaviourCompo = () => {
  return (
    <Behaviour>
      <H1 content="Behaviour" />
      <LabelDescription>
        Pages per visit is the onsite behaviour with the largest YoY decrease(3.4%)
      </LabelDescription>
      <WidgetBaseLayout>
        <BehaviourPills />
        <Divider />
        <BehaviourChannelChart />
        <Divider />
        <BehaviourTimeline />
      </WidgetBaseLayout>
    </Behaviour>
  );
}

export default BehaviourCompo;

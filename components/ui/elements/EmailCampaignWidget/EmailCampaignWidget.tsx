import * as React from 'react';
import styled from 'styled-components';
import { sizes, px } from "../../../../constants/constants";
import { H1, Divider, H3 } from "../../../../components";
import { widgetStyle, labelMediumEmphasized } from '../../../../constants/style-constants';
import EmailCampaignPills from './EmailCampaignPills';
import EmailCampaignPerformance from './EmailCampaignPerformance';

const EmailCampaignWidget = styled.div`
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

const EmailCampaignWidgetCompo = () => {
  return (
    <EmailCampaignWidget>
      <H1 content="Campaign" />
      <LabelDescription>
        Refresh your summer look campagin had our highest click through rate so far this year
      </LabelDescription>
      <WidgetBaseLayout>
        <ComponentWrapper>
          <SpaceDivider height={sizes.petite} />
          <EmailCampaignPills />
        </ComponentWrapper>
        <Divider />
        <ComponentWrapper>
          <SpaceDivider height={sizes.petite} />
          <H3 content="Campaign performance" />
          <EmailCampaignPerformance />
        </ComponentWrapper>
      </WidgetBaseLayout>
    </EmailCampaignWidget>
  );
}

export default EmailCampaignWidgetCompo;

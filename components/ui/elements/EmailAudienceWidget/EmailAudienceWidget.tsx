import * as React from 'react';
import styled from 'styled-components';
import { sizes, px } from "../../../../constants/constants";
import { H1, Divider, H3} from "../../../../components";
import EmailAudiencePills from "./EmailAudiencePills";
import EmailAudienceGrowth from "./EmailAudienceGrowth";
import { widgetStyle, labelMediumEmphasized } from '../../../../constants/style-constants';

const EmailAudienceWidget = styled.div`
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

const EmailAudienceWidgetCompo = () => {
  return (
    <EmailAudienceWidget>
      <H1 content="Audience" />
      <LabelDescription>
        Our unsubscribe rate is up year over year, but trending down year to date
      </LabelDescription>
      <WidgetBaseLayout>
        <ComponentWrapper>
          <SpaceDivider height={sizes.petite} />
          <EmailAudiencePills />
        </ComponentWrapper>
        <Divider />
        <ComponentWrapper>
          <SpaceDivider height={sizes.petite} />
          <H3 content="Audience growth over period" />
          <EmailAudienceGrowth />
        </ComponentWrapper>
      </WidgetBaseLayout>
    </EmailAudienceWidget>
  );
}

export default EmailAudienceWidgetCompo;

import * as React from 'react';
import styled from 'styled-components';
import { sizes, px } from "../../../../constants/constants";
import { H1, Divider } from "../../../../components";
import EmailTransactionsPills from "./EmailTransactionsPills";
import EmailTransactionsPillsFilter from "./EmailTransactionsPillsFilter";
import EmailTransactionsTimeline from "./EmailTransactionsTimeline";
import { widgetStyle, labelMediumEmphasized } from '../../../../constants/style-constants';

const EmailTransactionsWidget = styled.div`
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

const EmailTransactionsWidgetCompo = () => {
  return (
    <EmailTransactionsWidget>
      <H1 content="Transactions" />
      <LabelDescription>
        August was our highest month ever for CRM revenue
      </LabelDescription>
      <WidgetBaseLayout>
        <ComponentWrapper>
          <SpaceDivider height={sizes.petite} />
          <EmailTransactionsPillsFilter />
          <EmailTransactionsPills />
        </ComponentWrapper>
        <Divider />
        <ComponentWrapper>
          <SpaceDivider height={sizes.petite} />
          <EmailTransactionsTimeline />         
        </ComponentWrapper>
      </WidgetBaseLayout>
    </EmailTransactionsWidget>
  );
}

export default EmailTransactionsWidgetCompo;

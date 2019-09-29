import * as React from 'react';
import styled from 'styled-components';
import { sizes, colors, px } from "../../../../../constants/constants";
import { labelMediumEmphasized } from '../../../../../constants/style-constants';

const ActivitySummaryIntro = styled.div`
  width: 100%;
  box-sizing: border-box;
  padding-bottom: ${px(sizes.fine)};
`;

const LabelDescription = styled.div`
  ${labelMediumEmphasized};
  padding-bottom: ${px(sizes.fine)};
`;

interface RowProps {
  z: number;
}
const Row = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  margin-top: ${px(sizes.small)};
  // justify-content: space-between;
  padding-bottom: ${px(sizes.fine)};
  border-bottom: ${px(sizes.hair)} solid ${colors.grayMedium};
  z-index: ${(props: RowProps) => props.z};

  :last-child {
    border-bottom: none;
  }
`;

const Cell = styled.div`
`;

interface ActivitySummaryIntroCompoProps {
  date: string;
  spend: number;
  sites: number;
  partners: number;
  liveCampaigns: number;
  impressions: number;
  avgCTR: number;
} 
class ActivitySummaryIntroCompo extends React.Component<ActivitySummaryIntroCompoProps> {
  constructor(props: ActivitySummaryIntroCompoProps) {
    super(props);
  }

  render() {
    const { 
      date,
      spend,
      sites,
      partners,
      liveCampaigns,
      impressions,
      avgCTR
    } = this.props;
    return(
      <ActivitySummaryIntro>
      <Row z={1}>
        <Cell>
          <LabelDescription>
            In {date} we invested ${spend} to deliver {liveCampaigns} active campaigns across {sites | partners} partners giving {impressions}m impressions and an average CTR of {avgCTR}%
          </LabelDescription>
        </Cell>
      </Row>
    </ActivitySummaryIntro>
    );
  }
}

export default ActivitySummaryIntroCompo;

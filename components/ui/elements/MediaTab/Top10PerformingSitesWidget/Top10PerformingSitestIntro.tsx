import * as React from 'react';
import styled from 'styled-components';
import { sizes, colors, px } from "../../../../../constants/constants";
import { labelMediumEmphasized } from '../../../../../constants/style-constants';

const Top10PerformingSitesIntro = styled.div`
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

interface Top10PerformingSitesIntroCompoProps {
  spend: number;
  impressions: number;
} 
class Top10PerformingSitesIntroCompo extends React.Component<Top10PerformingSitesIntroCompoProps> {
  constructor(props: Top10PerformingSitesIntroCompoProps) {
    super(props);
  }

  render() {
    const { 
      spend,
      impressions,
    } = this.props;
    return(
      <Top10PerformingSitesIntro>
      <Row z={1}>
        <Cell>
          <LabelDescription>
            The top 10 sites account for {spend}% of our total budget for the period and delivered {impressions}% of impressions.
          </LabelDescription>
        </Cell>
      </Row>
    </Top10PerformingSitesIntro>
    );
  }
}

export default Top10PerformingSitesIntroCompo;

import * as React from 'react';
import styled from 'styled-components';
import { sizes, px } from "../../../../../constants/constants";
import { labelMediumEmphasized } from '../../../../../constants/style-constants';
import { fonts, fontSizesEmMajorThird } from '../../../../../constants/constants';


const Top10PerformingSiteCard = styled.div`
  width: 100%;
  box-sizing: border-box;
  padding: ${px(sizes.fine)};
`;

const CardTitle = styled.div`
  ${labelMediumEmphasized};
  font-size: ${fontSizesEmMajorThird.medium};
  font-weight: ${fonts.weightSemiBold};
  padding-bottom: ${px(sizes.petite)};
  text-align: left;
`;

const InfoLabel = styled.div`
  ${labelMediumEmphasized};
  font-size: ${fontSizesEmMajorThird.base};
  text-align: left;
`;

const CardImage = styled.img`
  width: 100%;
  height: 100%;
  padding: ${px(sizes.fine)} 0 ${px(sizes.fine)} 0;
`;

const Rating = styled.div`
  ${labelMediumEmphasized};
  font-size: ${fontSizesEmMajorThird.small};
  font-weight: ${fonts.weightSemiBold};
  padding-bottom: ${px(sizes.petite)};
  width: fit-content;
  padding: 2px;
  background-color: #FD8003;
  border-radius: 5px;
`;

interface Top10PerformingSiteCardCompoProps {
  title: string;
  budget: number;
  metricName: string;
  metricValue: number;
  revenue: number;
  ctr: number;
  cardImg: string;
  fraudLevel: number;
  rating: string;
}
interface Top10PerformingSiteCardCompoState {
  cloudViewWidth: number;
}
class Top10PerformingSiteCardCompo extends React.Component<Top10PerformingSiteCardCompoProps, Top10PerformingSiteCardCompoState> {
  constructor(props: Top10PerformingSiteCardCompoProps) {
    super(props);
    this.state = {
      cloudViewWidth: 0
    }
  }

  public render() {

    const { title, budget, metricName, metricValue, revenue, ctr, cardImg, fraudLevel, rating } = this.props;
    return (
      <Top10PerformingSiteCard>
        <CardTitle>
          {title}
        </CardTitle>
        <InfoLabel>
          Budget | ${budget}
        </InfoLabel>
        <InfoLabel>
          {metricName} | {metricValue}m
        </InfoLabel>
        <InfoLabel>
          Revenue | ${revenue}
        </InfoLabel>
        <InfoLabel>
          CTR | {ctr}%
        </InfoLabel>
        <InfoLabel>
          Fraud level | {fraudLevel}%
        </InfoLabel>
        <CardImage src={cardImg} />
        <Rating>
          {rating} rating
        </Rating>
      </Top10PerformingSiteCard>
    );
  }
}

export default Top10PerformingSiteCardCompo;

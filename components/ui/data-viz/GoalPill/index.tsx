import * as React from 'react';
import styled from 'styled-components';
import { widgetStyle, baseFontStyleProps } from '../../../../constants/style-constants';
import { sizes, px, colors, fonts } from '../../../../constants/constants';
import { ArrowDown } from 'styled-icons/fa-solid/ArrowDown';
import { ArrowUp } from 'styled-icons/fa-solid/ArrowUp';

const GoalPill = styled.div`
  ${widgetStyle};
  width: 100%;
  box-sizing: border-box;
  margin: ${px(sizes.fine)} ${px(sizes.fine)} ${px(sizes.junior)} ${px(sizes.fine)};
`;

const PillBoxTitle = styled.div`
  width: 100%;
  ${baseFontStyleProps};
  font-weight: ${fonts.weightSemiBold};
  background-color: ${colors.white};
  border-color: ${colors.grayLight};
  border-image: none;
  border-style: solid solid none;
  border-width: 2px 0 0;
  color: inherit;
  margin-bottom: 0;
  padding: ${px(sizes.little)} ${px(sizes.little)} ${px(sizes.fine)} ${px(sizes.little)};
  min-height: 48px;
  position: relative;
  clear: both;
`;

interface DividerProps {
  dividerColor: string;
  dividerHeight: number;
}
const Divider = styled.div`
  width: 100%;
  height: 4px;
  height: ${(props: DividerProps) => props.dividerHeight}'px';
  background-color: ${(props: DividerProps) => props.dividerColor};
`;

const PillBoxContent = styled.div`
  background-color: ${colors.white};
  color: inherit;
  padding: ${px(sizes.little)} ${px(sizes.petite)} ${px(sizes.petite)} ${px(sizes.petite)};
  border-color: ${colors.grayMedium};
  border-image: none;
  border-style: solid solid none;
  border-width: 1px 0;
  clear: both;
`;

const Description = styled.div`
  width: 100%;
  font-size: ${px(sizes.little)};
`;

const Value = styled.div`
  width: 100%;
  ${baseFontStyleProps};
  font-weight: ${fonts.weightSemiBold};
  font-size: ${px(sizes.junior)};
`;

const StatPercent = styled.div`
  width: 100%;
  position: relative;

  @media (max-width: 1485px) {
    display: block;
  }
`;

const Conversion = styled.div`
  float: left;
  margin-bottom: ${px(sizes.small)};
  position: relative;

  @media (max-width: 1485px) {
    margin-bottom: 0px;
    float: none;
  }
`;

const Span = styled.span`
`;
const Small = styled.small``;

interface StatValProps {
  arrow: string;
}
const StatVal = styled.div`
  float: right;
  margin-bottom: ${px(sizes.small)};
  position: relative;

  @media (max-width: 1485px) {
    margin-bottom: 0px;
    float: none;
  }
  color: ${(props: StatValProps) => props.arrow == 'up' ? colors.blueViking : colors.red};
`;

interface GoalPillCompoProps {
  title: String;
  description: String;
  value: Number;
  conversion: Number;
  statVal: Number;
  arrow: string;
  dividerColor?: string;
  dividerHeight?: number;
}
class GoalPillCompo extends React.Component<GoalPillCompoProps> {
  constructor(props: GoalPillCompoProps) {
    super(props);
  }

  public render() {
    const { title, description, value, conversion, statVal, arrow, dividerColor, dividerHeight } = this.props;
    return (
      <GoalPill>
        <PillBoxTitle>
          {title}
        </PillBoxTitle>
        <Divider dividerColor={dividerColor || colors.blueTurquiseDeep} dividerHeight={dividerHeight || 4} />
        <PillBoxContent >
          <Description>
            {description}
          </Description>
          <Value>
            {value}%
          </Value>
          <StatPercent>
            <Conversion>
              <Span>{conversion}%</Span>
              <Small>conversion</Small>
            </Conversion>
            <StatVal arrow={arrow}>
              {
                arrow == 'up'
                ?
                <ArrowUp size={14} />
                :
                <ArrowDown size={14} />
              }
              <Span>{statVal}%</Span>
              <Small> YoY</Small>
            </StatVal>
          </StatPercent>
        </PillBoxContent>
      </GoalPill>
    );
  }
};

export default GoalPillCompo;
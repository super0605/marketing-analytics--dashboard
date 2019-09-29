import * as React from 'react';
import styled from 'styled-components';
import { baseFontStyleProps } from '../../../../constants/style-constants';
import { sizes, px, colors, fonts, fontSizesEmMajorThird } from '../../../../constants/constants';
import { ArrowDown } from 'styled-icons/fa-solid/ArrowDown';
import { ArrowUp } from 'styled-icons/fa-solid/ArrowUp';

const ActivityPill = styled.div`
  width: 100%;
  box-sizing: border-box;
  margin-bottom: ${px(sizes.junior)};
  padding-left: ${px(sizes.fine)};
  padding-right: ${px(sizes.fine)};
`;

const PillBoxTitle = styled.div`
  width: 100%;
  ${baseFontStyleProps};
  font-size: ${fontSizesEmMajorThird.medium};
  font-weight: ${fonts.weightSemiBold};
  background-color: ${colors.white};
  color: inherit;
  margin-bottom: 0;
  min-height: 30px;
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
  clear: both;
`;

const Description = styled.div`
  width: 100%;
  font-size: ${px(sizes.little)};
`;

const Value = styled.div`
  ${baseFontStyleProps};
  font-weight: ${fonts.weightSemiBold};
  font-size: ${px(sizes.junior)}
`;

const StatPercent = styled.div`
  display: flex;
`;

const Span = styled.span`
`;
const Small = styled.small``;

interface StatValProps {
  color?: string;
}
const StatVal = styled.div`
  width: 100%;
  position: relative;
  color: ${(props: StatValProps) => props.color};
`;
const StatValWrap = styled.div`
  position: absolute;
  right: 0;
  bottom: 2px;
`;

interface ActivityPillCompoProps {
  title: String;
  description?: String;
  value: Number;
  statVal: Number;
  arrow: string;
  dividerColor?: string;
  dividerHeight?: number;
  unit?: string;
  statValColor?: string;
}
class ActivityPillCompo extends React.Component<ActivityPillCompoProps> {
  constructor(props: ActivityPillCompoProps) {
    super(props);
  }

  public render() {
    const { title, description, value, statVal, arrow, dividerColor, dividerHeight, unit, statValColor } = this.props;
    return (
      <ActivityPill>
        <PillBoxTitle>
          {title}
        </PillBoxTitle>
        <PillBoxContent >
          <Description>
            {description}
          </Description>
          <StatPercent>
            <Value>
              {value}%
            </Value>
            <StatVal color={statValColor}>
              <StatValWrap>
                {
                  arrow == 'up'
                  ?
                  <ArrowUp size={14} />
                  :
                  <ArrowDown size={14} />
                }
                <Span>{statVal}{unit}</Span>
                <Small>&nbsp;MoM</Small>
              </StatValWrap>
            </StatVal>
          </StatPercent>
        </PillBoxContent>
        <Divider dividerColor={dividerColor || colors.blueTurquiseDeep} dividerHeight={dividerHeight || 4} />
      </ActivityPill>
    );
  }
};

export default ActivityPillCompo;
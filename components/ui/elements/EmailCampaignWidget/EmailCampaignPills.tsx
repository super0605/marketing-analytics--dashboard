import * as React from 'react';
import styled from 'styled-components';
import { Pill, RangeGradientBar } from "../../../../components";
import { labelMediumEmphasized } from '../../../../constants/style-constants';
import { px, sizes } from '../../../../constants/constants';

const EmailCampaginPills = styled.div`
  width: 100%;
`;

interface EmailCampaginPillItemProps {
  width: number;
};
const EmailCampaginPillItem = styled.div`
  width: ${(props: EmailCampaginPillItemProps) => props.width}${"px"};
`;

const PillTitle = styled.div`
  width: 100%;
  ${labelMediumEmphasized};
  text-align: center;
  padding-top :${px(sizes.thin)};
  padding-bottom: ${px(sizes.junior)};
`;

const Row = styled.div`
  width: 100%;
  &::after {
    content: "";
    clear: both;
    display: table;
  }
`;

function getWidthString(span, specified?) {
  if (!span) return;

  let width = span / (specified || 12) * 100;
  return `width: ${width}%`;
}

interface ColumnProps {
  xs?: string;
  sm?: string;
  md?: string;
  lg?: string;
  specified?: number;
}
const Column = styled.div`
  float: left;
  ${(props: ColumnProps) => (props.xs ? getWidthString(props.xs, props.specified) : "width: 100%")};

  @media only screen and (min-width: 768px) {
    ${(props: ColumnProps) => (props.sm ? getWidthString(props.sm, props.specified) : "width: 100%")};
  }

  @media only screen and (min-width: 992px) {
    ${(props: ColumnProps) => (props.md ? getWidthString(props.md, props.specified) : "width: 100%")};
  }

  @media only screen and (min-width: 1200px) {
    ${(props: ColumnProps) => (props.lg ? getWidthString(props.lg, props.specified) : "width: 100%")};
  }
`;

const ItemCenter = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const RiseBar = styled.div`
  padding-top: ${px(sizes.junior)};
  padding-bottom: ${px(sizes.junior)};
`;

const PillsData = [
  {
    pillTitle: "Sent",
    pillColor: "#D2E3F0",
    firstVal: 235,
    firstValSignal: "k",
    secondVal: 1.4,
    secondValSignal: "%", 
  },
  {
    pillTitle: "Delivered",
    pillColor: "#4394C3",
    firstVal: 20,
    firstValSignal: "k",
    secondVal: 10.4,
    secondValSignal: "%", 
  },
  {
    pillTitle: "Opened",
    pillColor: "#063062",
    firstVal: 23,
    firstValSignal: "%",
    secondVal: 22,
    secondValSignal: "%", 
  },
  {
    pillTitle: "Clicked",
    pillColor: "#DA1717",
    firstVal: 4,
    firstValSignal: "%",
    secondVal: 2,
    secondValSignal: "%", 
  },
  {
    pillTitle: "Conversions",
    pillColor: "#D2E3F0",
    firstVal: 8,
    firstValSignal: "%",
    secondVal: +7,
    secondValSignal: "%", 
  }
];

class EmailCampaginPillsCompo extends React.Component {

  public render() {
    return (
      <div>
        <EmailCampaginPills>
          <Row>
            {
              PillsData.map((pill, k) => (
                <Column key={k} specified={15} lg="3" md="5" sm="5" xs="15">
                  <ItemCenter>
                    <EmailCampaginPillItem key={k} width={210}>
                      <PillTitle>
                        {pill.pillTitle}
                      </PillTitle>
                      <Pill
                        pillWidth={210}
                        pillHeight={210}
                        pillCx={100}
                        pillCy={100}
                        pillInnerRadius={85}
                        pillouterRadius={100}
                        pillFill={pill.pillColor}
                        pillFirstVal={pill.firstVal}
                        pillFirstValColor="#000000"
                        pillFirstSignal={pill.firstValSignal}
                        pillSecondVal={pill.secondVal}
                        pillSecondValColor="#000000"
                        pillSecondSignal={pill.secondValSignal}
                      />
                    </EmailCampaginPillItem>
                  </ItemCenter>
                </Column>
              ))
            }
          </Row>
          <Row>
            <RiseBar>
              <RangeGradientBar
                startVal="Low"
                endVal="High"
                name="rise"
                barWidth={150}
                gradient="background-image: linear-gradient(to right, #720606, #973644, #b0647d, #c293b0, #d5c2d8, #ccc1d4, #c5c0cf, #c0bfc9, #9292a3, #64677e, #37405c, #041d3b);"
              />
            </RiseBar>
          </Row>
        </EmailCampaginPills>
      </div>
    );
  }
};

export default EmailCampaginPillsCompo;
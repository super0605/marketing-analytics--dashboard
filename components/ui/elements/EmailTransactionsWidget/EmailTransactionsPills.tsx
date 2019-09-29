import * as React from 'react';
import styled from 'styled-components';
import { Pill, RangeGradientBar } from "../../../../components";
import { labelMediumEmphasized } from '../../../../constants/style-constants';
import { px, sizes } from '../../../../constants/constants';

const EmailTransactionsPills = styled.div`
  width: 100%;
`;

interface EmailTransactionsPillItemProps {
  width: number;
};
const EmailTransactionsPillItem = styled.div`
  width: ${(props: EmailTransactionsPillItemProps) => props.width}${"px"};
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
    pillTitle: "Revenue",
    pillColor: "#D2E3F0",
    firstVal: 234,
    firstValSignal: "k",
    secondVal: 1.4,
    secondValSignal: "%", 
  },
  {
    pillTitle: "Transactions",
    pillColor: "#4394C3",
    firstVal: 20,
    firstValSignal: "k",
    secondVal: 10.4,
    secondValSignal: "%", 
  },
  {
    pillTitle: "Units",
    pillColor: "#063062",
    firstVal: 45,
    firstValSignal: "s",
    secondVal: 120.4,
    secondValSignal: "%", 
  },
  {
    pillTitle: "Conversion rate",
    pillColor: "#DA1717",
    firstVal: 35,
    firstValSignal: "%",
    secondVal: -100.4,
    secondValSignal: "%", 
  },
  {
    pillTitle: "Revenue per order",
    pillColor: "#D2E3F0",
    firstVal: 4.3,
    firstValSignal: "",
    secondVal: +0.4,
    secondValSignal: "%", 
  }
];

class EmailTransactionsPillsCompo extends React.Component {

  public render() {
    return (
      <div>
        <EmailTransactionsPills>
          <Row>
            {
              PillsData.map((pill, k) => (
                <Column key={k} specified={15} lg="3" md="5" sm="5" xs="15">
                  <ItemCenter>
                    <EmailTransactionsPillItem key={k} width={210}>
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
                    </EmailTransactionsPillItem>
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
        </EmailTransactionsPills>
      </div>
    );
  }
};

export default EmailTransactionsPillsCompo;
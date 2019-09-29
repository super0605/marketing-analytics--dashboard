import * as React from 'react';
import styled from 'styled-components';
// import { Row, Col } from 'styled-bootstrap-grid';
import { ActivityPill } from "../../../../../components";
import { colors, sizes, px } from "../../../../../constants/constants";

const ActivitySummaryPills = styled.div`
  width: 100%;
`;

const ActivitySummaryPillsWrapper = styled.div`
  margin-left: ${px(-1 * sizes.fine)};
  margin-right: ${px(-1 * sizes.fine)};
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

  @media only screen and (min-width: 1070px) {
    ${(props: ColumnProps) => (props.sm ? getWidthString(props.sm, props.specified) : "width: 100%")};
  }

  @media only screen and (min-width: 1170px) {
    ${(props: ColumnProps) => (props.md ? getWidthString(props.md, props.specified) : "width: 100%")};
  }

  @media only screen and (min-width: 1550px) {
    ${(props: ColumnProps) => (props.lg ? getWidthString(props.lg, props.specified) : "width: 100%")};
  }
`;

const ActivityPillsData = [
  {
    title: 'Impressions',
    value: 23.5,
    statVal: 3.4,
    arrow: 'up',
    dividerColor: colors.pillColorGrayLight,
    dividerHeight: 4,
    unit: "%",
    statValColor: colors.pillColorGrayLight
  },
  {
    title: 'Clicks',
    value: 23.5,
    statVal: 3.4,
    arrow: 'up',
    dividerColor: colors.pillColorGrayMedium,
    dividerHeight: 4,
    unit: "%",
    statValColor: colors.pillColorGrayMedium
  },
  {
    title: 'Ad spend',
    value: 23.5,
    statVal: 3.4,
    arrow: 'up',
    dividerColor: colors.pillColorGrayDark,
    dividerHeight: 4,
    unit: "%",
    statValColor: colors.pillColorGrayDark
  },
  {
    title: 'Roas',
    value: 23.5,
    statVal: 3.4,
    arrow: 'up',
    dividerColor: colors.pillColorRed,
    dividerHeight: 4,
    unit: "%",
    statValColor: colors.pillColorRed
  },
  {
    title: 'VTR',
    value: 23.5,
    statVal: 3.4,
    arrow: 'up',
    dividerColor: colors.pillColorGrayLight,
    dividerHeight: 4,
    unit: "%",
    statValColor: colors.pillColorGrayLight
  },
  {
    title: 'CTR',
    value: 23.5,
    statVal: 3.4,
    arrow: 'up',
    dividerColor: colors.pillColorGrayMedium,
    dividerHeight: 4,
    unit: "%",
    statValColor: colors.pillColorGrayMedium
  },
]

class ActivitySummaryPillsCompo extends React.Component {
  public render() {
    return (
      <ActivitySummaryPills>
        <ActivitySummaryPillsWrapper>
          <Row>
            {
              ActivityPillsData.map((pill, k) => (
                <Column lg="2" md="4" sm="12" xs="12" key={k}>
                  <ActivityPill
                    key={k}
                    title={pill.title}
                    value={pill.value}
                    statVal={pill.statVal}
                    arrow={pill.arrow}
                    dividerColor={pill.dividerColor}
                    dividerHeight={pill.dividerHeight}
                    unit={pill.unit}
                    statValColor={pill.statValColor}
                  />
                </Column>
              ))
            }
          </Row>
        </ActivitySummaryPillsWrapper>
      </ActivitySummaryPills>
    );
  }
};

export default ActivitySummaryPillsCompo;
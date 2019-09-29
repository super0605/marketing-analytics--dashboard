import * as React from 'react';
import styled from 'styled-components';
import { sizes, px } from "../../../../../constants/constants";
import Top10PerformingSiteCard from './Top10PerformingSiteCard';


const Top10PerformingSitesTable = styled.div`
  width: 100%;
  box-sizing: border-box;
  padding-bottom: ${px(sizes.fine)};
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

const TableWrapper = styled.div`
  margin: 0 ${px(-1 * sizes.fine)} 0 ${px(-1 * sizes.fine)};
`;

const dummyTopsitesData = [
  {
    title: '10th Man Media',
    budget: 1555,
    metricName: 'Impressions',
    metricValue: 23,
    revenue: 53,
    ctr: 25.9,
    cardImg: 'https://thrivethemes.com/wp-content/uploads/2015/01/hero-image-3.jpg',
    fraudLevel: 34.3,
    rating: 'Gold',
  },
  {
    title: '10th Man Media',
    budget: 1555,
    metricName: 'Impressions',
    metricValue: 23,
    revenue: 53,
    ctr: 25.9,
    cardImg: 'https://thrivethemes.com/wp-content/uploads/2015/01/hero-image-3.jpg',
    fraudLevel: 34.3,
    rating: 'Gold',
  },
  {
    title: '10th Man Media',
    budget: 1555,
    metricName: 'Impressions',
    metricValue: 23,
    revenue: 53,
    ctr: 25.9,
    cardImg: 'https://thrivethemes.com/wp-content/uploads/2015/01/hero-image-3.jpg',
    fraudLevel: 34.3,
    rating: 'Gold',
  },
  {
    title: '10th Man Media',
    budget: 1555,
    metricName: 'Impressions',
    metricValue: 23,
    revenue: 53,
    ctr: 25.9,
    cardImg: 'https://thrivethemes.com/wp-content/uploads/2015/01/hero-image-3.jpg',
    fraudLevel: 34.3,
    rating: 'Gold',
  },
  {
    title: '10th Man Media',
    budget: 1555,
    metricName: 'Impressions',
    metricValue: 23,
    revenue: 53,
    ctr: 25.9,
    cardImg: 'https://thrivethemes.com/wp-content/uploads/2015/01/hero-image-3.jpg',
    fraudLevel: 34.3,
    rating: 'Gold',
  },
  {
    title: '10th Man Media',
    budget: 1555,
    metricName: 'Impressions',
    metricValue: 23,
    revenue: 53,
    ctr: 25.9,
    cardImg: 'https://thrivethemes.com/wp-content/uploads/2015/01/hero-image-3.jpg',
    fraudLevel: 34.3,
    rating: 'Gold',
  },
  {
    title: '10th Man Media',
    budget: 1555,
    metricName: 'Impressions',
    metricValue: 23,
    revenue: 53,
    ctr: 25.9,
    cardImg: 'https://thrivethemes.com/wp-content/uploads/2015/01/hero-image-3.jpg',
    fraudLevel: 34.3,
    rating: 'Gold',
  },
  {
    title: '10th Man Media',
    budget: 1555,
    metricName: 'Impressions',
    metricValue: 23,
    revenue: 53,
    ctr: 25.9,
    cardImg: 'https://thrivethemes.com/wp-content/uploads/2015/01/hero-image-3.jpg',
    fraudLevel: 34.3,
    rating: 'Gold',
  },
  {
    title: '10th Man Media',
    budget: 1555,
    metricName: 'Impressions',
    metricValue: 23,
    revenue: 53,
    ctr: 25.9,
    cardImg: 'https://thrivethemes.com/wp-content/uploads/2015/01/hero-image-3.jpg',
    fraudLevel: 34.3,
    rating: 'Gold',
  },
  {
    title: '10th Man Media',
    budget: 1555,
    metricName: 'Impressions',
    metricValue: 23,
    revenue: 53,
    ctr: 25.9,
    cardImg: 'https://thrivethemes.com/wp-content/uploads/2015/01/hero-image-3.jpg',
    fraudLevel: 34.3,
    rating: 'Gold',
  },
];

interface Top10PerformingSitesTableCompoState {
  cloudViewWidth: number;
}
class Top10PerformingSitesTableCompo extends React.Component<{}, Top10PerformingSitesTableCompoState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      cloudViewWidth: 0
    }
  }

  public render() {

    return (
      <Top10PerformingSitesTable>
        <TableWrapper>
          <Row>
            {
              dummyTopsitesData && dummyTopsitesData.map((data, index) => (
                <Column key={index} specified={15} lg="3" md="5" sm="7" xs="15">
                  <Top10PerformingSiteCard
                    key={index}
                    title={data.title}
                    budget={data.budget}
                    metricName={data.metricName}
                    metricValue={data.metricValue}
                    revenue={data.revenue}
                    ctr={data.ctr}
                    cardImg={data.cardImg}
                    fraudLevel={data.fraudLevel}
                    rating={data.rating}
                  />
                </Column>
              ))
            }
          </Row>
        </TableWrapper>
      </Top10PerformingSitesTable>
    );
  }
}

export default Top10PerformingSitesTableCompo;

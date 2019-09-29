import * as React from 'react';
import styled from 'styled-components';
import { GeneralTimelineChart, CustomLegend } from "../../../../components";
import EmailTransactionsTimelineFilter from './EmailTransactionsTimelineFilter';
import { sizes, px } from "../../../../constants/constants";
import { CustomLegendItem } from "../../../../constants/interfaces";

const EmailTransactionsTimeline = styled.div`
  width: 100%;
  padding-top: ${px(sizes.junior)};
  padding-bottom: ${px(sizes.junior)};
`;

const timelineData = [
  {
    "name": "Jan",
    "uv": 4200,
    "pv": 2400,
    "amt": 2400
  },
  {
    "name": "Feb",
    "uv": 3000,
    "pv": 1398,
    "amt": 2210
  },
  {
    "name": "Mar",
    "uv": 4325,
    "pv": 9800,
    "amt": 2290
  },
  {
    "name": "Apr",
    "uv": 2780,
    "pv": 3908,
    "amt": 2000
  },
  {
    "name": "May",
    "uv": 6800,
    "pv": 4800,
    "amt": 2181
  },
  {
    "name": "Jun",
    "uv": 2390,
    "pv": 3800,
    "amt": 2500
  },
  {
    "name": "Jul",
    "uv": 3490,
    "pv": 4300,
    "amt": 2100
  },
  {
    "name": "Aug",
    "uv": 1890,
    "pv": 2400,
    "amt": 2100
  },
  {
    "name": "Sep",
    "uv": 3500,
    "pv": 4300,
    "amt": 2100
  },
  {
    "name": "Oct",
    "uv": 3490,
    "pv": 2181,
    "amt": 2100
  },
  {
    "name": "Nov",
    "uv": 2400,
    "pv": 3908,
    "amt": 2100
  },
  {
    "name": "Dec",
    "uv": 8253,
    "pv": 4300,
    "amt": 2100
  },
]

const CustomLegendWrapper = styled.div`
  width: 100%;
  padding-left: ${px(sizes.junior)}
`;

const CustomLegendData: CustomLegendItem[] = [
  {
    name: "Primary period",
    color: '#350B48',
  },
  {
    name: "Comparison period",
    color: '#9A85A4',
  },
];

class EmailTransactionsTimelineCompo extends React.Component {

  public render() {
    return (
      <EmailTransactionsTimeline>
        <EmailTransactionsTimelineFilter />
        <GeneralTimelineChart
          timelineData={timelineData}
          chartHeight={300}
          yAxisName="Sessions"
        />
        <CustomLegendWrapper>
          <CustomLegend legendData={CustomLegendData} yAxisName="" shape='line' />
        </CustomLegendWrapper>
      </EmailTransactionsTimeline>
    );
  }
};

export default EmailTransactionsTimelineCompo;
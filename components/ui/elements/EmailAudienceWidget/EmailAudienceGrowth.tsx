import * as React from 'react';
import styled from 'styled-components';
import { BarAndStackedBarChart, CustomLegend } from "../../../../components";
import { CustomLegendItem } from "../../../../constants/interfaces";
import { sizes, px } from "../../../../constants/constants";

const EmailCampaignPerformance = styled.div`
  width: 100%;
  padding-top: ${px(sizes.junior)};
  padding-bottom: ${px(sizes.junior)};
`;

const CustomLegendContainer = styled.div`
  display: flex;
`;

const CustomLegendData: CustomLegendItem[] = [
  {
    name: "Unsubscribes",
    color: '#350B48',
    lineWidth: 20,
    strokeWidth: 20,
  },
  {
    name: "Existing audience",
    color: '#4394C3',
    lineWidth: 20,
    strokeWidth: 20,
  },
  {
    name: "Audience net change",
    color: '#D2E3F0',
    lineWidth: 20,
    strokeWidth: 20,
  },
];

const data = [
  { date: 'Dec-17', unsubscribe: 3570, existingAudience: 6535, audienceNetChange: 2400 },
  { date: 'Jan-18', unsubscribe: 2100, existingAudience: 4050, audienceNetChange: 2210 },
  { date: 'Feb-18', unsubscribe: 5000, existingAudience: 9800, audienceNetChange: 2290 },
  { date: 'Mar-18', unsubscribe: 1500, existingAudience: 3908, audienceNetChange: 2000 },
  { date: 'Apr-18', unsubscribe: 1890, existingAudience: 4800, audienceNetChange: 2181 },
  { date: 'May-18', unsubscribe: 2390, existingAudience: 3800, audienceNetChange: 2500 },
  { date: 'Jun-18', unsubscribe: 3800, existingAudience: 4300, audienceNetChange: 2100 },
  { date: 'Jul-18', unsubscribe: 2181, existingAudience: 2210, audienceNetChange: 3908 },
  { date: 'Aug-18', unsubscribe: 5800, existingAudience: 9800, audienceNetChange: 1050 },
];

const colour = [
  '#350B48', '#4394C3', '#D2E3F0',
];

const datakey = [
  {
    name: "Unsubscribes",
    key: "unsubscribe",
  },
  {
    name: "Existing audience",
    key: "existingAudience",
  },
  {
    name: "Audience net change",
    key: 'audienceNetChange',
  }
];

class EmailCampaignPerformanceCompo extends React.Component {

  public render() {

    return (
      <EmailCampaignPerformance>
        <BarAndStackedBarChart
          data={data}
          colour={colour}
          barSize={50}
          chartHeight={300}
          XAxisDatakey="date"
          YAxisName="audience"
          dataKey={datakey}
          yAxisName="Audience"
        />
        <CustomLegendContainer>
          <CustomLegend legendData={CustomLegendData} yAxisName="" />
        </CustomLegendContainer>
      </EmailCampaignPerformance>
    );
  }
};

export default EmailCampaignPerformanceCompo;
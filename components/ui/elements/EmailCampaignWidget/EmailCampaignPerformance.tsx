import * as React from 'react';
import styled from 'styled-components';
import { PerformanceChart, CustomLegend } from "../../../../components";
import { CustomLegendItem } from "../../../../constants/interfaces";
import { sizes, px, colors } from "../../../../constants/constants";

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
    name: "Delivered",
    color: '#4394C3',
    lineWidth: 20,
    strokeWidth: 20,
  },
  {
    name: "Click rate",
    color: colors.blueDatavizPrimary,
  },
  {
    name: "Open rate",
    color: '#FD8003',
  },
];

const data = [
  { name: '02-Feb-18', deivered: 5500, openrate: 8, clickrate: 24 },
  { name: '03-Feb-18', deivered: 4200, openrate: 9, clickrate: 56 },
  { name: '04-Feb-18', deivered: 6600, openrate: 35, clickrate: 89 },
  { name: '05-Feb-18', deivered: 2500, openrate: 80, clickrate: 34 },
  { name: '06-Feb-18', deivered: 1500, openrate: 11, clickrate: 63 },
  { name: '07-Feb-18', deivered: 4400, openrate: 68, clickrate: 14 },
  { name: '08-Feb-18', deivered: 6300, openrate: 90, clickrate: 67 }
];

const matrixDataArray = [
  [
    {
      strokeColor: '#350B48',
      strokeWidth: 20,
    },
    {
      strokeColor: '#A4CEE0',
      strokeWidth: 20,
    },
    {
      strokeColor: '#4394C3',
      strokeWidth: 20,
    },
    {
      strokeColor: '#063062',
      strokeWidth: 20,
    },
    {
      strokeColor: '#DA1717',
      strokeWidth: 20,
    },
  ],
  [
    {
      strokeColor: '#063062',
      strokeWidth: 20,
    },
    {
      strokeColor: '#DA1717',
      strokeWidth: 20,
    },
    {
      strokeColor: '#8884d8',
      strokeWidth: 20,
    },
  ],
  [
    {
      strokeColor: '#DA1717',
      strokeWidth: 20,
    },
    {
      strokeColor: '#8884d8',
      strokeWidth: 20,
    },
    {
      strokeColor: '#8884d8',
      strokeWidth: 20,
    },
  ],
  [
    {
      strokeColor: '#350B48',
      strokeWidth: 20,
    },
    {
      strokeColor: '#A4CEE0',
      strokeWidth: 20,
    },
    {
      strokeColor: '#4394C3',
      strokeWidth: 20,
    },
    {
      strokeColor: '#063062',
      strokeWidth: 20,
    },
    {
      strokeColor: '#DA1717',
      strokeWidth: 20,
    },
  ],
  [
    {
      strokeColor: '#A4CEE0',
      strokeWidth: 20,
    },
  ],
  [
    {
      strokeColor: '#063062',
      strokeWidth: 20,
    },
  ],
  [
    {
      strokeColor: '#063062',
      strokeWidth: 20,
    },
    {
      strokeColor: '#DA1717',
      strokeWidth: 20,
    },
    {
      strokeColor: '#8884d8',
      strokeWidth: 20,
    },
  ],
];

class EmailCampaignPerformanceCompo extends React.Component {

  public render() {

    return (
      <EmailCampaignPerformance>
        <CustomLegendContainer>
          <CustomLegend legendData={CustomLegendData} yAxisName="" />
        </CustomLegendContainer>
        <PerformanceChart PerformanceData={data} chartHeight={400} matrixDataArray={matrixDataArray} yAxisName="Open / Click rate" />
      </EmailCampaignPerformance>
    );
  }
};

export default EmailCampaignPerformanceCompo;
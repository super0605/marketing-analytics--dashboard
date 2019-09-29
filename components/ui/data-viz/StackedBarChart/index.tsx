import * as React from 'react';
import styled from 'styled-components';
import {
  ResponsiveContainer, ComposedChart, Bar, XAxis, YAxis, Tooltip, Legend, LabelList
} from 'recharts';
import { sizes, px } from "../../../../constants/constants";
import { StackedBarRevenueData } from "../../../../constants/interfaces";

const StackedBarChart = styled.div`
  width: 100%;
  padding-top: ${px(sizes.junior)};
  padding-bottom: ${px(sizes.junior)};
`;

interface StackedBarChartCompoProps {
  metric: string;
  barData: StackedBarRevenueData[];
  totalRevenue: number;
}
interface StackedBarChartCompoState {
  barData: StackedBarRevenueData[];
}
class StackedBarChartCompo extends React.Component<StackedBarChartCompoProps, StackedBarChartCompoState> {
  constructor(props: StackedBarChartCompoProps) {
    super(props);
  }

  makeChartData = (data: Array<object>, totalRevenue: number) => {
    let chartData: Object = {
      name: '',
    }
    data && data.map((item: StackedBarRevenueData) => {
      var key = item.name;
      var value = (item[this.props.metric] / totalRevenue * 100).toFixed(2);

      chartData[key] = value;
    })

    return chartData;
  }

  public render() {
    const { barData, totalRevenue } = this.props;
    let chartData: Array<object> = [];
    chartData.push(this.makeChartData(barData, totalRevenue));
    let labelIndex: number = 0;

    const renderCustomizedLabel = (props) => {
      const { x, y, width } = props;
      const radius = 10;
      labelIndex = labelIndex + 1;
      const i = labelIndex > 0 ? labelIndex - 1 : 0;

      if (labelIndex == barData.length) {
        labelIndex = 0;
      }

      let productName = barData[i].name;
      const productValue = chartData[0][productName];
      const unit = '%';

      return (
        <g>
          <text x={x + width / 2} y={y + 50 - radius} fill="#fff" textAnchor="middle" dominantBaseline="middle">
            {
              productValue > 20
                ?
                productName + " : " + productValue + unit
                :
                "..."
            }
          </text>
        </g>
      );
    };

    return (
      <StackedBarChart>
        <div style={{ width: '100%', height: "200px" }}>
          {
            barData &&
            <ResponsiveContainer>
              <ComposedChart width={600} height={100} data={chartData}
                margin={{ top: 0, right: 15, left: 15, bottom: 0 }} layout="vertical">
                <XAxis type="number" axisLine={false} tickLine={false} unit="%" />
                <YAxis dataKey="name" type="category" hide={true} />
                <Tooltip />
                <Legend />
                {
                  barData.map((data: StackedBarRevenueData, k) => (
                    k == 0
                      ?
                      <Bar key={k} dataKey={data.name} stackId="a" fill={data.color} background={{ fill: '#eee' }}>
                        <LabelList dataKey="name" content={renderCustomizedLabel} />
                      </Bar>
                      :
                      <Bar key={k} dataKey={data.name} stackId="a" fill={data.color}>
                        <LabelList dataKey="name" content={renderCustomizedLabel} />
                      </Bar>
                  ))
                }
              </ComposedChart>
            </ResponsiveContainer>
          }

        </div>
      </StackedBarChart>
    );
  }
};

export default StackedBarChartCompo;
import * as React from 'react';
import styled from 'styled-components';
import {
  ResponsiveContainer, ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, Label
} from 'recharts';
import { websiteBehaviourChannelChartObjType } from '~/constants/interfaces';

const ChannelChart = styled.div`
  width: 100%;
`;

interface ChannelChartCompoProps {
  metric: string;
  channelChartsData: Array<websiteBehaviourChannelChartObjType[]>;
  colors: Array<string>;
  fillColor: string;
  chartHeight?: number;
  yAxisName?: string;
}
class ChannelChartCompo extends React.Component<ChannelChartCompoProps> {
  constructor(props: ChannelChartCompoProps) {
    super(props);
  }

  public render() {
    const { metric, channelChartsData, colors, fillColor, chartHeight, yAxisName } = this.props;
    const lastShape = (props) => {
      const { cx, cy, payload } = props;
      return (
        <g>
          <circle cx={cx} cy={cy} r={12} fill={payload.z == "current" ? colors[0] : colors[1]} stroke="none" />
          <text x={cx} y={0} dy={20} textAnchor="middle" fill="#000000">
            {payload.text}
          </text>
        </g>
      );
    };

    const toRound = (decimal, fixed = 0) => {
      if (decimal > 1000) {
        return `${(decimal / 1000).toFixed(fixed)}`;
      } else {
        return decimal;
      }
    };

    return (
      <div>
        <ChannelChart>
          <div style={{ width: '100%', height: chartHeight || 300 }}>
            <ResponsiveContainer>
              <ScatterChart width={600} height={400} margin={{ top: 50, right: 20, bottom: 0, left: 20 }}>
                <CartesianGrid strokeDasharray="3 ,3" />
                <XAxis type="number" dataKey={'x'} name='YoY' tick={false} unit='%' />
                <YAxis type="number" dataKey={'y'} name={metric} tickFormatter={toRound}  unit='k'>
                  <Label angle={270} position='left' style={{ textAnchor: 'middle' }}>
                    {yAxisName}
                  </Label>
                </YAxis>
                <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                {
                  channelChartsData && channelChartsData.map((chartData, index) => (
                    <Scatter key={index} name={chartData[0].text} data={chartData} fill='#350B48' line={{ stroke: "#350B48", strokeWidth: 2 }} shape={lastShape} />    
                  ))
                }
              </ScatterChart>
            </ResponsiveContainer>
          </div>
        </ChannelChart>
      </div>
    );
  }
};

export default ChannelChartCompo;
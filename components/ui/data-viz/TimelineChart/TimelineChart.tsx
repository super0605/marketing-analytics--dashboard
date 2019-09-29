import * as React from 'react';
import styled from 'styled-components';
import {
  ResponsiveContainer, ComposedChart, Line, Area, XAxis, YAxis, CartesianGrid, Tooltip, ReferenceLine, Label
} from 'recharts';
import { colors } from '../../../../constants/constants';

const TimelineChart = styled.div`
  width: 100%;
`;

interface TimelineChartCompoProps {
  chartHeight: number;
  timelineData: Array<Object>;
  yAxisName: string;
}
class TimelineChartCompo extends React.Component<TimelineChartCompoProps> {
  constructor(props: TimelineChartCompoProps) {
    super(props);
  }

  public render() {

    const { timelineData, chartHeight, yAxisName } = this.props;
    const toRound = (decimal, fixed = 0) => {
      if (decimal >= 1000) {
        return `${(decimal / 1000).toFixed(fixed)}k`;
      } else {
        return decimal;
      }
    };

    return (
      <div>
        <TimelineChart>
          <div style={{ width: '100%', height: chartHeight || 300 }}>
            <ResponsiveContainer>
              <ComposedChart
                width={500}
                height={400}
                data={timelineData}
                margin={{
                  top: 20, right: 0, bottom: 20, left: 0,
                }}
              >

                <CartesianGrid stroke="#f5f5f5" strokeDasharray="3, 3" />
                <XAxis dataKey="name" padding={{ left: -45, right: 10 }} />
                <YAxis tickFormatter={toRound}>
                  <Label angle={270} position='insideLeft' style={{ textAnchor: 'middle' }}>
                    {yAxisName}
                  </Label>
                </YAxis>
                <Tooltip />
                <ReferenceLine x="H" stroke="green" label="Now" />
                <ReferenceLine y={3000} label="Target" stroke={colors.grayDark} strokeDasharray="3 3" />

                <Area type="monotone" dataKey="fu" stroke={colors.purpleDark} fill={colors.purpleDark} />
                <Area type="monotone" dataKey="fb" stroke={colors.purpleLight} fill={colors.purpleLight} />

                <Line type="natural" dataKey="uv" stroke="#350B48" strokeWidth={2} dot={false} />

              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </TimelineChart>
      </div>
    );
  }
};

export default TimelineChartCompo;
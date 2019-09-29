import * as React from 'react';
import styled from 'styled-components';
import {
  ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ReferenceLine, Label, Brush
} from 'recharts';

const GeneralTimelineChart = styled.div`
  width: 100%;
`;

interface GeneralTimelineChartCompoProps {
  chartHeight: number;
  timelineData: Array<Object>;
  yAxisName?: string;
}
class GeneralTimelineChartCompo extends React.Component<GeneralTimelineChartCompoProps> {
  constructor(props: GeneralTimelineChartCompoProps) {
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
        <GeneralTimelineChart>
          <div style={{ width: '100%', height: chartHeight || 300 }}>
            <ResponsiveContainer>
              <LineChart
                width={500}
                height={chartHeight}
                data={timelineData}
                margin={{
                  top: 20, right: 30, bottom: 20, left: 20,
                }}
              >
                <CartesianGrid stroke="#f5f5f5" strokeDasharray="3, 3" />
                <XAxis dataKey="name" />
                <YAxis tickFormatter={toRound}>
                  <Label angle={270} position='left' style={{ textAnchor: 'middle' }}>
                    {yAxisName}
                  </Label>
                </YAxis>
                <Tooltip />
                <ReferenceLine x="H" stroke="green" label="Now" />

                <Line type="natural" dataKey="current" stroke="#350B48" strokeWidth={2} dot={false} />
                <Line type="natural" dataKey="previous" stroke="#9A85A4" strokeWidth={2} dot={false} strokeDasharray="3 3" />

                {/* <Brush /> */}
              </LineChart>
            </ResponsiveContainer>
          </div>
        </GeneralTimelineChart>
      </div>
    );
  }
};

export default GeneralTimelineChartCompo;
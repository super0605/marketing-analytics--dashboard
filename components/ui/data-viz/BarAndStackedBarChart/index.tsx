import * as React from 'react';
import styled from 'styled-components';
import {
  ResponsiveContainer, ComposedChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Label
} from 'recharts';
import _ from 'lodash';
import { sizes, px, colors } from "../../../../constants/constants";

const BarAndStackedBarChart = styled.div`
  width: 100%;
`;

const CustomTooltipWrapper = styled.div`
  width: 100%;
  background-color: ${colors.grayLight};
  padding: ${px(sizes.fine)};
`;

const CustomTooltipHeader = styled.div`
  width: 100%;
  border-bottom: solid 1px ${colors.red};
`;

const CustomTooltipContent = styled.div`
  width: 100%;
`;

interface dataKey {
  name: string;
  key: string;
}
interface BarAndStackedBarChartCompoProps {
  data: Array<Object>;
  colour: Array<string>;
  barSize?: number;
  chartHeight?: number;
  XAxisDatakey: string;
  YAxisName?: string;
  dataKey: dataKey[];
  yAxisName?: string;
}
class BarAndStackedBarChartCompo extends React.Component<BarAndStackedBarChartCompoProps> {
  constructor(props: BarAndStackedBarChartCompoProps) {
    super(props);
  }

  public render() {
    const { chartHeight, data, colour, barSize, XAxisDatakey, YAxisName, dataKey, yAxisName } = this.props;

    const getBarPath = (x: number, y: number, width: number, height: number, barHeight: number) => {
      return `M${x + width / 4},${y + height}
              L${x + width / 4 + width / 2},${y + height}
              L${x + width / 4 + width / 2},${y + height - barHeight}
              L${x + width / 4},${y + height - barHeight}
              Z`;
    };

    const getBackgroundPath = (x: number, y: number, width: number, height: number) => {
      return `M${x},${y}
              L${x + width},${y}
              L${x + width},${y + height}
              L${x},${y + height}
              Z`;
    }

    const CustomBar = (props) => {
      const { fill, x, y, width, height, payload } = props;
      const barHeight = (height * payload[dataKey[0].key]) / payload[dataKey[1].key];

      return (
        <g>
          <path d={getBackgroundPath(x, y, width, height)} stroke="none" fill={fill} />;
          <path fill={colour[0] || '#350B48'} d={getBarPath(x, y, width, height, barHeight)}></path>;
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

    const CustomTooltip = (props) => {
      const { payload, label, active } = props;
      if (active) {
        const unsubscribeVal = _.find(data, [XAxisDatakey, label]);
        return (
          <div className="custom-tooltip">
            <CustomTooltipWrapper>
              <CustomTooltipHeader>
                <p className="label">{`${label}`}</p>
              </CustomTooltipHeader>
              <CustomTooltipContent>
                <p className="label">{`${dataKey[0].name} : ${unsubscribeVal[dataKey[0].key]}`}</p>
                <p className="label">{`${dataKey[1].name} : ${payload[0].value}`}</p>
                <p className="label">{`${dataKey[2].name} : ${payload[1].value}`}</p>
              </CustomTooltipContent>
            </CustomTooltipWrapper>
          </div>
        )
      }

      return null;
    }

    return (
      <div>
        <BarAndStackedBarChart>
          <div style={{ width: '100%', height: chartHeight || 300 }}>
            <ResponsiveContainer>
              <ComposedChart width={600} height={300} data={data}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey={XAxisDatakey} />
                <YAxis name={YAxisName} tickFormatter={toRound} unit="k">
                  <Label angle={270} position='left' style={{ textAnchor: 'middle' }}>
                    {yAxisName}
                  </Label>
                </YAxis>
                <Tooltip content={CustomTooltip} />
                <Bar dataKey={dataKey[1].key} stackId="a" fill={colour[1] || '#4394C3'} shape={CustomBar} barSize={barSize || 50} />
                <Bar dataKey={dataKey[2].key} stackId="a" fill={colour[2] || '#D2E3F0'} barSize={barSize || 50} />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </BarAndStackedBarChart>
      </div>
    );
  }
};

export default BarAndStackedBarChartCompo;
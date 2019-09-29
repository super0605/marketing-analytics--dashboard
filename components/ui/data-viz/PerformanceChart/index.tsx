import * as React from 'react';
import styled from 'styled-components';
import {
  ResponsiveContainer, ComposedChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Bar, LabelList, Label
} from 'recharts';
import { matrixData, matrix } from "../../../../constants/interfaces";
import { sizes, px, colors, fonts, fontSizesEmMajorThird } from "../../../../constants/constants";

const PerformanceChart = styled.div`
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
  max-height: 320px;
  overflow-y: hidden;
`;

const TooltipCard = styled.div`
  width: 100%;
  padding: ${px(sizes.fine)};
`;
const TooltipCardTitle = styled.div`
  font-size: ${fontSizesEmMajorThird.base};
  font-weight: ${fonts.weightSemiBold};
`;
const TooltipCardVal = styled.p`
  font-size: ${fontSizesEmMajorThird.base};
`;

const tooltipData = [
  {
    title: 'this is a longish campaign name',
    delivered: 3200,
    revenue: 600,
    ctr: 23,
  },
  {
    title: 'this is a longish campaign name',
    delivered: 1235,
    revenue: 850,
    ctr: 12,
  },
  {
    title: 'this is a longish campaign name',
    delivered: 7200,
    revenue: 230,
    ctr: 65,
  },
];

interface PerformanceChartCompoProps {
  chartHeight: number;
  PerformanceData: Array<Object>;
  matrixDataArray: Array<matrixData>[];
  yAxisName?: string;
}
class PerformanceChartCompo extends React.Component<PerformanceChartCompoProps> {
  constructor(props: PerformanceChartCompoProps) {
    super(props);
  }

  makeMatrixBlockData = (matrixData: matrixData[], x: number, y: number, width: number, height: number) => {
    let matrixArray: Array<matrix> = [];
    const matrixBlockMargin = 40;
    const totalHeight = height + matrixBlockMargin;
    const matrixMarginRight = 5;
    const matrixMarginBottom = 5;
    const strokeWidth = (width - 10) / 3;
    if (matrixData !== undefined && matrixData.length > 0) {
      matrixData.map((data: matrixData, k) => {
        const x1 = x + strokeWidth * (k % 3) + matrixMarginRight * (k % 3);
        const y1 = y + totalHeight + strokeWidth * (k / 3 | 0) + matrixMarginBottom * (k / 3 | 0);
        const x2 = x1 + strokeWidth;
        const y2 = y1;
        const stroke = data.strokeColor;
        const strokeWidthVal = data.strokeWidth || strokeWidth;
        const matrix: matrix = {
          x1: x1,
          y1: y1,
          x2: x2,
          y2: y2,
          stroke: stroke,
          strokeWidthVal: strokeWidthVal,
        }
        matrixArray.push(matrix);
      });
    }

    return matrixArray;
  }

  public render() {

    const { PerformanceData, chartHeight, matrixDataArray, yAxisName } = this.props;

    const renderCustomizedLabel = (props) => {
      const { x, y, width, height } = props;
      const matrixBlockData = this.makeMatrixBlockData(matrixDataArray[props.index], x, y, width, height);

      return (
        <g>
          {
            matrixBlockData.map((data: matrix, k) => (
              <line
                key={k}
                x1={data.x1}
                y1={data.y1}
                x2={data.x2}
                y2={data.y2}
                stroke={data.stroke}
                strokeWidth={data.strokeWidthVal}
              />
            ))
          }
        </g>
      );
    };

    const CustomTooltip = (props) => {
      const { label, active } = props;
      if (active) {
        return (
          <div className="custom-tooltip">
            <CustomTooltipWrapper>
              <CustomTooltipHeader>
                <p className="label">{`${label}`}</p>
              </CustomTooltipHeader>
              <CustomTooltipContent>
                {
                  tooltipData.map((data, k) => (
                    <TooltipCard key={k}>
                      <TooltipCardTitle>
                        {data.title}
                      </TooltipCardTitle>
                      <TooltipCardVal>
                        delivered | {data.delivered}
                      </TooltipCardVal>
                      <TooltipCardVal>
                        revenue | ${data.revenue}
                      </TooltipCardVal>
                      <TooltipCardVal>
                        CTR | {data.ctr}%
                      </TooltipCardVal>
                    </TooltipCard>
                  ))
                }
              </CustomTooltipContent>
            </CustomTooltipWrapper>
          </div>
        )
      }

      return null;
    }

    const toRound = (decimal, fixed = 0) => {
      if (decimal >= 1000) {
        return `${(decimal / 1000).toFixed(fixed)}`;
      } else {
        return decimal;
      }
    };

    return (
      <div>
        <PerformanceChart>
          <div style={{ width: '100%', height: chartHeight || 300 }}>
            <ResponsiveContainer>
              <ComposedChart width={600} height={400} data={PerformanceData}
                margin={{ top: 20, right: 20, bottom: 50, left: 20 }}>
                <CartesianGrid stroke='#f5f5f5' strokeDasharray="3, 3" />
                <XAxis dataKey="name" />
                <YAxis 
                  yAxisId="left" 
                  unit="%" 
                >
                  <Label angle={270} position='left' style={{ textAnchor: 'middle' }}>
                    {yAxisName}
                  </Label>
                </YAxis>
                <YAxis 
                  yAxisId="right" 
                  orientation="right" 
                  tickFormatter={toRound}
                  unit="k" 
                  axisLine={false}
                  tickLine={false}
                  padding={{ top: 0, bottom: 2 }}
                >
                  <Label angle={270} position='right' style={{ textAnchor: 'middle' }}>
                    Delivered
                  </Label>
                </YAxis>
                <Tooltip content={CustomTooltip} />
                <Bar dataKey='deivered' yAxisId="right" barSize={70} fill={colors.grayLight}>
                  <LabelList dataKey="name" content={renderCustomizedLabel} />
                </Bar>
                <Line type='monotone' yAxisId="left" dataKey='openrate' stroke='#FD8003' strokeWidth={2} dot={true} />
                <Line type='monotone' yAxisId="left" dataKey='clickrate' stroke='#350B48' strokeWidth={2} dot={true} />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </PerformanceChart>
      </div>
    );
  }
};

export default PerformanceChartCompo;
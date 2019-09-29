import * as React from 'react';
import styled from 'styled-components';
import { PieChart, Pie, Sector, Tooltip, RechartsFunction } from 'recharts';
import { sizes, px, colors } from "../../../../constants/constants";

const Pill = styled.div`
  width: 100%;
  cursor: pointer;
`;

const CustomTooltipWrapper = styled.div`
  width: 100%;
  background-color: ${colors.grayLight};
  padding: ${px(sizes.fine)};
`;

interface PillCompoProps {
  pillKey?: number;
  pillWidth: number;
  pillHeight: number;
  pillCx: number;
  pillCy: number;
  pillInnerRadius: number;
  pillouterRadius: number;
  pillFill: string;
  pillVal: number;
  pillValColor: string;
  pillValUnit: string;
  pillChangeVal: number;
  pillChangeValColor: string;
  pillChangeValUnit: string;
  handleSelectPill?: (pillKey: number) => void;
}
interface PillCompoState {
  activeIndex: number;
}
class PillCompo extends React.Component<PillCompoProps, PillCompoState> {
  constructor(props: PillCompoProps) {
    super(props);

    this.state = {
      activeIndex: 0,
    };
  }

  handleClickPill = () => {
    this.props.handleSelectPill(this.props.pillKey);
  }

  public render() {
    const {
      pillWidth,
      pillHeight,
      pillCx,
      pillCy,
      pillInnerRadius,
      pillouterRadius,
      pillFill,
      pillVal,
      pillValColor,
      pillValUnit,
      pillChangeVal,
      pillChangeValColor,
      pillChangeValUnit,
    } = this.props;

    const toRound = (decimal, fixed = 0, pillValUnit) => {
      if (decimal >= 1000) {
        return `${(decimal / 1000).toFixed(fixed)}${pillValUnit}`;
      } else {
        if (pillValUnit == "k") {
          return decimal;
        } else {
          return `${decimal}${pillValUnit}`;
        }

      }
    };

    const data = [{ name: 'Group A', value: 400 },];
    const renderActiveShape = (props) => {
      const { cx, cy, innerRadius, outerRadius, startAngle, endAngle,
        fill } = props;

      return (
        <g>
          <text x={cx} y={cy - 10} dy={8} textAnchor="middle" fontSize="40" fontWeight="800" fill={pillValColor}>{toRound(pillVal, 2, pillValUnit)}</text>
          <text x={cx} y={cy + 20} dy={8} textAnchor="middle" fill={pillChangeValColor}>{Math.sign(pillChangeVal) == 1 ? "+" : "-"}{Math.abs(pillChangeVal)}{pillChangeValUnit}</text>
          <Sector
            cx={cx}
            cy={cy}
            innerRadius={innerRadius}
            outerRadius={outerRadius}
            startAngle={startAngle}
            endAngle={endAngle}
            fill={fill}
          />
        </g>
      );
    };

    const CustomTooltip = (props) => {
      const { active } = props;
      if (active) {
        return (
          <div className="custom-tooltip">
            <CustomTooltipWrapper>
              <p className="label">{pillVal}{pillValUnit}</p>
              <p className="label">{Math.sign(pillChangeVal) == 1 ? "+" : "-"}{Math.abs(pillChangeVal)}{pillChangeValUnit}</p>
            </CustomTooltipWrapper>
          </div>
        )
      }
    }

    return (
      <Pill onClick={this.handleClickPill}>
        <PieChart width={pillWidth} height={pillHeight}>
          <Pie
            dataKey="value"
            activeIndex={this.state.activeIndex}
            activeShape={renderActiveShape}
            data={data}
            cx={pillCx}
            cy={pillCy}
            innerRadius={pillInnerRadius}
            outerRadius={pillouterRadius}
            fill={pillFill}
          />
          <Tooltip content={CustomTooltip} />
        </PieChart>
      </Pill>
    );
  }
};

export default PillCompo;
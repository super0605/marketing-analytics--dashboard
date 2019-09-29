import React from "react";
import styled from "styled-components";
import { SvgLine, SvgCircle } from "../../../../components";
import { colors, sizes, px } from "../../../../constants/constants";
import { CustomLegendItem } from "../../../../constants/interfaces";

import iconLevelUp from "../../../../static/media/icons/icon__level--up.png";

const CustomLegend = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`

const LegendContainer = styled.ul`
  display: flex;
`;

const LegendItem = styled.li`
  display: flex;
  margin-right: ${px(sizes.junior)};
`;

const LegendItemText = styled.span`
  color: ${colors.grayVeryDark};
  line-height: 30px;
`;

const IconImage = styled.img`
  top: ${px(sizes.thin)};
  left: ${px(sizes.thin)};
  width: ${px(sizes.petite)};
  height: ${px(sizes.petite)};
  margin-right: ${px(sizes.micro)};
`;

interface CustomLegendCompoProps {
  legendData: Array<CustomLegendItem>;
  yAxisName?: string;
  shape?: string;
}
const CustomLegendCompo = (props: CustomLegendCompoProps) => {
  const { legendData, yAxisName, shape } = props;
  return (
    <CustomLegend>
      <LegendContainer>
        {
          yAxisName &&
          <LegendItem>
            <IconImage src={iconLevelUp} />
            <LegendItemText>{yAxisName}</LegendItemText>
          </LegendItem>
        }
        {

          legendData.map((item, k) => (
            <LegendItem key={k}>
              {
                shape == 'circle'
                  ?
                  <SvgCircle
                    width={30}
                    height={30}
                    cx={15}
                    cy={15}
                    circleColor={item.color}
                  />
                  :
                  <SvgLine
                    width={30}
                    height={30}
                    strokeColor={item.color}
                    strokeWidth={item.strokeWidth || 7}
                    lineWidth={item.lineWidth || 20}
                  />
              }
              <LegendItemText>{item.name}</LegendItemText>
            </LegendItem>
          ))
        }
      </LegendContainer>
    </CustomLegend>
  );
};

export default CustomLegendCompo;
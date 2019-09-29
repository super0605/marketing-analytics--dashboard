import * as React from "react";
import styled from "styled-components";
import Measure, { ContentRect } from "react-measure";
import { H2 } from "../../../../components";
import ConnectorAndLabel from "./ConnectorAndLabel";
import {
  colors,
  elementSizes,
  opacities,
  ConnectorGroupType,
  ConnectorsType,
  connectorStates
} from "../../../../constants/constants";
import {
  widgetStyle,
  labelSmallAccented
} from "../../../../constants/style-constants";
import { connectorsWidgetSizes } from "../../../../constants/elementSettings";
import {
  connectorProps,
  connectorGroupProps
} from "../../../../constants/valuesByType";

const SVG = styled.svg`
  ${widgetStyle};
`;

const LabelHeadline = styled.text`
  ${labelSmallAccented};
`;

interface ConnectorLineProps {
  lineStart: [number, number];
  lineEnd: [number, number];
  handleOffset: number;
  side: "left" | "right";
  style: "solid" | "dotted";
}
const ConnectorLine = (props: ConnectorLineProps) => {
  const { lineStart, lineEnd, handleOffset, side, style } = props;
  const handleOne = {
    x: lineStart[0] + (side === "left" ? -handleOffset : handleOffset),
    y: lineStart[1]
  };
  const handleTwo = {
    x: lineEnd[0] + (side === "left" ? handleOffset : -handleOffset),
    y: lineEnd[1]
  };
  return (
    <path
      d={`M ${lineStart[0]} ${lineStart[1]}
          C ${handleOne.x} ${lineStart[1]},
            ${handleTwo.x} ${handleTwo.y},
            ${lineEnd[0]} ${lineEnd[1]}`}
      stroke={colors.primary}
      strokeDasharray={style === "dotted" ? "4" : ""}
      strokeWidth={connectorsWidgetSizes.connectorLineWidth}
      fill="none"
    />
  );
};

interface ConnectorsWidgetCompProps {
  connected: ConnectorsType[];
  loading: ConnectorsType[];
  disabled: ConnectorsType[];
  imageUrl?: string;
  handleConnectorClick: (connector: ConnectorsType) => void;
}
interface ConnectorsWidgetCompState {
  width: number;
}
class ConnectorsWidgetComp extends React.Component<
  ConnectorsWidgetCompProps,
  ConnectorsWidgetCompState
> {
  constructor(props: ConnectorsWidgetCompProps) {
    super(props);
    this.handleResize = this.handleResize.bind(this);

    this.state = {
      width: 0
    };
  }

  public render() {
    const {
      connected,
      loading,
      disabled,
      imageUrl,
      handleConnectorClick
    } = this.props;
    const { width } = this.state;

    const height = elementSizes.connectorsWidgetHeight,
      circleSize = connectorsWidgetSizes.circleSize,
      leftOfCircle = width / 2 - circleSize / 2,
      rightOfCircle = width / 2 + circleSize / 2,
      leftRightAreaWidth = (width - circleSize) / 2,
      areaHalfLeftX = leftRightAreaWidth / 2,
      areaHalfRightX = width - leftRightAreaWidth / 2;

    const textOffset = 100;
    const connectorsPositionLeft = areaHalfLeftX + textOffset;
    const connectorsPositionRight = areaHalfRightX - textOffset;

    return (
      <Measure bounds={true} onResize={this.handleResize}>
        {({ measureRef }) => {
          return (
            <div ref={measureRef}>
              <H2 content="Connectors" />
              <SVG viewBox={`0 0 ${width} ${height}`} width="100%">
                <circle
                  cx={width / 2}
                  cy={height / 2}
                  r={circleSize / 2}
                  stroke={colors.primary}
                  strokeWidth={connectorsWidgetSizes.connectorLineWidth}
                  fill="none"
                />
                {imageUrl && (
                  <g>
                    <clipPath id="clipCircle">
                      <circle
                        r={circleSize / 2}
                        cx={width / 2} 
                        cy={height / 2}
                      />
                    </clipPath>
                    <image
                      xlinkHref={imageUrl}
                      x={width / 2 - circleSize / 2}
                      y={height / 2 - circleSize / 2}
                      height={circleSize}
                      width={circleSize}
                      clipPath="url(#clipCircle)"
                    />
                  </g>
                )}

                {/* headlines */}
                {Array.from(connectorGroupProps.keys()).map(
                  (key: ConnectorGroupType) => {
                    const props = connectorGroupProps.get(key);
                    const { label, y, side, disabled } = props;
                    return (
                      <LabelHeadline
                        key={key}
                        x={
                          side === "left"
                            ? connectorsPositionLeft
                            : connectorsPositionRight
                        }
                        y={y}
                        opacity={disabled ? opacities.disabled : 1}
                        textAnchor={side === "left" ? "end" : "start"}
                      >
                        {label}
                      </LabelHeadline>
                    );
                  }
                )}

                {/* connectors */}
                {Array.from(connectorProps.keys()).map(
                  (key: ConnectorsType) => {
                    const props = connectorProps.get(key);
                    const { label, y, side } = props;
                    const connectorX =
                      side === "left"
                        ? connectorsPositionLeft
                        : connectorsPositionRight;
                    const circleSide =
                      side === "left" ? leftOfCircle : rightOfCircle;

                    const isDisabled = disabled.includes(key);
                    const isLoading = loading.includes(key);
                    const isConnected = connected.includes(key);

                    return (
                      <g key={`connector-${key}`}>
                        <ConnectorAndLabel
                          x={connectorX}
                          y={y}
                          label={label}
                          direction={side}
                          connector={key}
                          type={
                            isDisabled
                              ? connectorStates.disabled
                              : isLoading
                              ? connectorStates.empty
                              : isConnected
                              ? connectorStates.connected
                              : connectorStates.add
                          }
                          handleClick={handleConnectorClick}
                        />
                        {isConnected && (
                          <ConnectorLine
                            lineStart={[circleSide, height / 2]}
                            lineEnd={[connectorX, y]}
                            side={side}
                            handleOffset={80}
                            style="solid"
                          />
                        )}
                        {isLoading && (
                          <ConnectorLine
                            lineStart={[circleSide, height / 2]}
                            lineEnd={[connectorX, y]}
                            side={side}
                            handleOffset={80}
                            style="dotted"
                          />
                        )}
                      </g>
                    );
                  }
                )}
              </SVG>
            </div>
          );
        }}
      </Measure>
    );
  }

  private handleResize = (contentRect: ContentRect) => {
    this.setState({
      width: (contentRect.entry && contentRect.entry.width) || 0
    });
  };
}

// const

export default ConnectorsWidgetComp;

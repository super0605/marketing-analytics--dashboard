import * as React from "react";
import styled from "styled-components";
import {
  colors,
  opacities,
  ConnectorsType,
  ConnectorStateType,
  connectorStates
} from "../../../../constants/constants";
import { labelSmall } from "../../../../constants/style-constants";
import { connectorsWidgetSizes } from "../../../../constants/elementSettings";

const ClickableCircle = styled.circle`
  cursor: pointer;
`;

interface ConnectorEmptyProps {
  size: number;
}
const ConnectorEmpty = (props: ConnectorEmptyProps) => (
  <circle
    cx={0}
    cy={0}
    r={props.size / 2}
    strokeWidth={2}
    stroke={colors.primary}
    fill="none"
  />
);

interface ConnectorPlusProps {
  size: number;
  disabled?: boolean;
}
const ConnectorPlus = (props: ConnectorPlusProps) => {
  const { size = 10, disabled } = props;
  const lineLength = size - 10;
  return (
    <g>
      <circle
        cx={0}
        cy={0}
        r={size / 2}
        stroke={colors.primary}
        strokeWidth={2}
        strokeOpacity={disabled ? opacities.disabled : 1}
        fill="none"
      />
      <line
        x1={-(lineLength / 2)}
        y1={0}
        x2={lineLength / 2}
        y2={0}
        stroke={colors.primary}
        strokeWidth={2}
        strokeOpacity={disabled ? opacities.disabled : 1}
        fill="none"
        strokeLinecap="round"
      />
      <line
        x1={0}
        y1={-(lineLength / 2)}
        x2={0}
        y2={lineLength / 2}
        stroke={colors.primary}
        strokeWidth={2}
        strokeOpacity={disabled ? opacities.disabled : 1}
        fill="none"
        strokeLinecap="round"
      />
    </g>
  );
};

interface ConnectorCheckProps {
  size: number;
}
const ConnectorCheck = (props: ConnectorCheckProps) => {
  const { size = 10 } = props;
  return (
    <g>
      <circle cx={0} cy={0} r={size / 2} fill={colors.primary} />
      <path
        d={`
        M ${-(size / 2) + 3} ${-(size / 2) + 8},
        ${-1} ${size / 2 - 6},
        ${size / 2 - 4} ${-(size / 2) + 5}`}
        stroke={colors.white}
        strokeWidth={2}
        fill="none"
      />
    </g>
  );
};

interface ConnectorProps {
  x: number;
  y: number;
  size?: number;
  type: ConnectorStateType;
  connector: ConnectorsType;
  handleClick: (connector: ConnectorsType) => void;
}
const Connector = (props: ConnectorProps) => {
  const { x, y, size = 10, type, connector, handleClick } = props;
  return (
    <g
      transform={`translate(${x}, ${y})`}
      onClick={() => handleClick(connector)}
    >
      {type === connectorStates.disabled && (
        <ConnectorPlus size={size} disabled={true} />
      )}
      {type === connectorStates.empty && <ConnectorEmpty size={size} />}
      {type === connectorStates.add && <ConnectorPlus size={size} />}
      {type === connectorStates.connected && <ConnectorCheck size={size} />}
      {type !== connectorStates.disabled && (
        <ClickableCircle
          cx={0}
          cy={0}
          r={size / 2}
          stroke="none"
          fill={colors.transparent}
        />
      )}
    </g>
  );
};

const Label = styled.text`
  ${labelSmall};
`;

interface ConnectorAndLabelProps {
  x: number;
  y: number;
  label: string;
  direction: "left" | "right";
  type: ConnectorStateType;
  connector: ConnectorsType;
  handleClick: (connector: ConnectorsType) => void;
}
const ConnectorAndLabelComp = (props: ConnectorAndLabelProps) => {
  const { x, y, label, direction, type, connector, handleClick } = props;
  const connectorSize = connectorsWidgetSizes.connectorSize;

  return (
    <g transform={`translate(${x}, ${y})`}>
      <Connector
        x={direction === "left" ? -connectorSize / 2 : connectorSize / 2}
        y={0}
        size={connectorSize}
        type={type}
        connector={connector}
        handleClick={handleClick}
      />

      <Label
        x={direction === "left" ? -connectorSize - 10 : connectorSize + 10}
        y={0}
        dy={5}
        opacity={type === connectorStates.disabled ? opacities.disabled : 1}
        textAnchor={direction === "left" ? "end" : "start"}
      >
        {label}
      </Label>
    </g>
  );
};

export default ConnectorAndLabelComp;

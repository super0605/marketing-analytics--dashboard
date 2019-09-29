import * as React from "react";
import styled from "styled-components";
import { px, sizes, colors } from "../../../../constants/constants";
import {
  labelMicro,
  labelMicroAccented
} from "../../../../constants/style-constants";
import { cutTextAtMaxLength } from "../../../../util/util";

const ExecutiveSummary = styled.div`
  width: 100%;
  padding: ${px(sizes.tiny)};
  background-color: ${colors.blueVikingAlph5};
  margin-bottom: ${px(sizes.tiny)};
`;

const Title = styled.div`
  ${labelMicroAccented};
  margin: ${px(sizes.micro)} 0 ${px(sizes.tiny)} 0;
`;
interface TextProps {
  isExpanded: boolean;
}
const Text = styled.textarea`
  ${labelMicro};
  resize: none;
  width: 100%;
  height: ${(props: TextProps) =>
    props.isExpanded ? px(sizes.extremehuge) : px(sizes.huge)};
  background-color: transparent;
  border: none;
  outline: none;
  cursor: default;

  :focus {
    cursor: unset;
    background-color: white;
    padding: ${px(sizes.dblhair)};
    border: 1px solid ${colors.grayMedium};
    border-radius: ${px(sizes.micro)};
  }
`;

const ButtonRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: ${px(sizes.fine)};
`;
const TextButton = styled.div`
  ${labelMicro};
  color: ${colors.primary};
  cursor: pointer;
`;

interface CaretProps {
  isExpanded: boolean;
}
const Caret = styled.svg`
  cursor: pointer;
  transform: ${(props: CaretProps) => `rotate(${props.isExpanded ? 180 : 0}deg)`};
`;

interface ExecutiveSummaryCompProps {
  text: string;
}
interface ExecutiveSummaryCompState {
  isExpanded: boolean;
  isEditable: boolean;
  text: string;
}
class ExecutiveSummaryComp extends React.Component<
  ExecutiveSummaryCompProps,
  ExecutiveSummaryCompState
> {
  private textAreaRef: React.RefObject<HTMLTextAreaElement>;
  constructor(props: ExecutiveSummaryCompProps) {
    super(props);
    this.textAreaRef = React.createRef();
    this.state = {
      isExpanded: false,
      isEditable: false,
      text: this.props.text
    };

    this.handleExpanderToggle = this.handleExpanderToggle.bind(this);
    this.handleEditClick = this.handleEditClick.bind(this);
    this.handleDoneClick = this.handleDoneClick.bind(this);
    this.handleTextInput = this.handleTextInput.bind(this);
  }

  render() {
    const { isExpanded, isEditable, text } = this.state;
    return (
      <ExecutiveSummary>
        <Title>Executive Summary</Title>

        <Text
          ref={this.textAreaRef}
          isExpanded={isExpanded}
          disabled={!isEditable}
          value={isExpanded ? text : cutTextAtMaxLength(text, 214)}
          onChange={this.handleTextInput}
        />

        <ButtonRow>
          { !isEditable &&
            <TextButton onClick={this.handleEditClick}>Edit</TextButton>
          }     
          { !isEditable &&
            <Caret
              width="10px"
              height="6px"
              viewBox="0 0 10 6"
              isExpanded={isExpanded}
              onClick={this.handleExpanderToggle}
            >
              <polyline
                points="0 0 5 5 10 0"
                fill="none"
                stroke={colors.primary}
                strokeWidth={1.5}
              />
            </Caret>
          }
          { isEditable &&
            <TextButton onClick={this.handleDoneClick}>Done</TextButton>
          }
        </ButtonRow>
      </ExecutiveSummary>
    );
  }

  handleTextInput(e: React.FormEvent<HTMLTextAreaElement>) {
    this.setState({
      text: e.currentTarget.value,
    });
  }

  handleEditClick() {
    this.setState({
      isExpanded: true,
      isEditable: true,
    },() => this.textAreaRef.current.focus());
  }

  handleDoneClick() {
    this.setState({
      isExpanded: false,
      isEditable: false,
    });
  }

  handleExpanderToggle() {
    this.setState({
      isExpanded: !this.state.isExpanded
    });
  }
}

export default ExecutiveSummaryComp;

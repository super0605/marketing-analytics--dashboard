import * as React from "react";
import styled from "styled-components";
import {
  icons,
  colors,
  sizes,
  px,
  elementSizes,
  elevation
} from "../../../../constants/constants";
import {
  labelMicro,
  labelBaseAccented
} from "../../../../constants/style-constants";
import { iconUrls } from "../../../../constants/valuesByType";

interface HighlightsBarProps {
  isCollapsed: boolean;
}
const HighlightBarWrapper = styled.div`
  position: fixed;
  width: ${(props: HighlightsBarProps) =>
    props.isCollapsed ? px(sizes.large) : px(elementSizes.highlightsBarWidth)};
  height: 80vh;
  right: ${px(sizes.medium)};
  top: ${px(sizes.huge)};
`;

const HighlightsBar = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: flex-end;
  background-color: ${(props: HighlightsBarProps) => props.isCollapsed ? colors.transparent : colors.white};
  box-shadow: ${(props: HighlightsBarProps) =>
    props.isCollapsed ? "none" : elevation.dp2};
  border-radius: ${(props: HighlightsBarProps) =>
    props.isCollapsed ? 0 : px(sizes.thin)};
`;

const Icon = styled.img`
  width: 100%;
  height: 100%;
`;

// CollapsedButton
const CollapsedButton = styled.div`
  display: flex;
  flex-direction: column;
  width: ${px(sizes.large)};
  align-items: center;
  cursor: pointer;
`;
const CollapsedLabel = styled.div`
  ${labelMicro};
  text-align: center;
`;
const CollapsedIconWrapper = styled.div`
  width: ${px(elementSizes.iconSizeMid)};
  height: ${px(elementSizes.iconSizeMid)};
  margin-bottom: ${px(sizes.micro)};
`;

// Expanded Header
const ExpandedHeader = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: ${px(sizes.petite)} ${px(sizes.little)};
`;
const ExpandedHeaderIconAndTitle = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-end;
`;
const ExpandedHeaderIconWrapper = styled.div`
  width: ${px(sizes.junior)};
  height: ${px(sizes.junior)};
  margin-right: ${px(sizes.thin)};
`;
const ExpandedHeaderTitle = styled.div`
  ${labelBaseAccented}
`;
const IconCloseWrapper = styled.div`
  width: ${px(sizes.small)};
  height: ${px(sizes.small)};
  cursor: pointer;
`;

const HighlightsBarContent = styled.div`
  width: 100%;
`;

interface HighlightsBarCompProps {}
interface HighlightsBarCompState {
  isCollapsed: boolean;
}
class HighlightsBarComp extends React.Component<
  HighlightsBarCompProps,
  HighlightsBarCompState
> {
  constructor(props: HighlightsBarCompProps) {
    super(props);

    this.state = {
      isCollapsed: false
    };

    this.toggleCollapsed = this.toggleCollapsed.bind(this);
  }

  public render() {
    const { isCollapsed } = this.state;
    return (
      <HighlightBarWrapper isCollapsed={isCollapsed}>
        <HighlightsBar isCollapsed={isCollapsed}>
          {isCollapsed && (
            <CollapsedButton onClick={this.toggleCollapsed}>
              <CollapsedIconWrapper>
                <Icon src={iconUrls.get(icons.highlightsInv)} />
              </CollapsedIconWrapper>
              <CollapsedLabel>Highlights</CollapsedLabel>
            </CollapsedButton>
          )}
          {!isCollapsed && (
            <HighlightsBarContent>
              <ExpandedHeader>
                <ExpandedHeaderIconAndTitle>
                  <ExpandedHeaderIconWrapper>
                    <Icon src={iconUrls.get(icons.highlights)} />
                  </ExpandedHeaderIconWrapper>
                  <ExpandedHeaderTitle>Highlights</ExpandedHeaderTitle>
                </ExpandedHeaderIconAndTitle>

                <IconCloseWrapper onClick={this.toggleCollapsed}>
                  <Icon src={iconUrls.get(icons.closeTiny)} />
                </IconCloseWrapper>
              </ExpandedHeader>

              {this.props.children}
            </HighlightsBarContent>
          )}
        </HighlightsBar>
      </HighlightBarWrapper>
    );
  }

  private toggleCollapsed = () => {
    this.setState({
      isCollapsed: !this.state.isCollapsed
    });
  };
}

export default HighlightsBarComp;

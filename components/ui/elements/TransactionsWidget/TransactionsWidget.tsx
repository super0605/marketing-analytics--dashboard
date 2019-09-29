import * as React from 'react';
import styled from 'styled-components';
import Measure, { ContentRect } from "react-measure";
import { sizes, px } from "../../../../constants/constants";
import { H1, Divider } from "../../../../components";
import { widgetStyle, labelMediumEmphasized } from '../../../../constants/style-constants';
import TransactionsChannel from './TransactionsChannel';
import TransactionsTimeline from './TransactionsTimeline';
import TransactionsPills from './TransactionsPills';
import TransactionsStackedBar from './TransactionsStackedBar';
import { data } from './data';

const TransactionsWidget = styled.div`
  width: 100%;
  padding-top: ${px(sizes.junior)};
`;

const WidgetBaseLayout = styled.div`
  ${widgetStyle};
  width: 100%;
  padding: ${px(sizes.fine)} ${px(sizes.junior)};
  box-sizing: border-box;
`;

const LabelDescription = styled.div`
  ${labelMediumEmphasized};
  padding-bottom: ${px(sizes.fine)};
`;

const ComponentWrapper = styled.div`
  width: 100%;
`;

interface SpaceDividerProps {
  height: number;
}
const SpaceDivider = styled.div`
  width: 100%;
  height: ${(props: SpaceDividerProps) => props.height}px;
`;

const Row = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-left: ${px(-Math.abs(sizes.little))};
  margin-right: ${px(-Math.abs(sizes.little))};
  &::after {
    content: "";
    clear: both;
    display: table;
  }
`;

function getWidthString(span, specified?) {
  if (!span) return;

  let width = span / (specified || 12) * 100;
  return `flex: 0 0 ${width}%`;
}

interface ColumnProps {
  xs?: number;
  sm?: number;
  md?: number;
  lg?: number;
  specified?: number;
}
const Column = styled.div`
  padding-right: ${px(sizes.little)};
  padding-left: ${px(sizes.little)};
  ${(props: ColumnProps) => (props.xs ? getWidthString(props.xs, props.specified) : "width: 100%")};

  @media only screen and (min-width: 768px) {
    ${(props: ColumnProps) => (props.sm ? getWidthString(props.sm, props.specified) : "width: 100%")};
  }

  @media only screen and (min-width: 992px) {
    ${(props: ColumnProps) => (props.md ? getWidthString(props.md, props.specified) : "width: 100%")};
  }

  @media only screen and (min-width: 1200px) {
    ${(props: ColumnProps) => (props.lg ? getWidthString(props.lg, props.specified) : "width: 100%")};
  }
`;


interface TransactionsWidgetCompoState {
  width: number;
  sunburstWidth: number;
}
class TransactionsWidgetCompo extends React.Component<{}, TransactionsWidgetCompoState> {

  constructor(props: {}) {
    super(props);
    this.handleResize = this.handleResize.bind(this);

    this.state = {
      width: 0,
      sunburstWidth: 500,
    };
  }

  private handleResize = (contentRect: ContentRect) => {
    this.setState({
      width: (contentRect.entry && contentRect.entry.width) || 0,
    }, () => {
      const { width } = this.state;
      
      if (width > 1090) {
        this.setState({
          sunburstWidth: 500
        })
      }

      if (880 < width && width < 1090) {
        this.setState({
          sunburstWidth: 400
        })
      }

      if (width < 880) {
        this.setState({
          sunburstWidth: 300
        })
      }

    });
  };

  public render() {
    const { sunburstWidth } = this.state;
    return (
      <Measure bounds={true} onResize={this.handleResize}>
        {
          ({ measureRef }) => {
            return (
              <div ref={measureRef}>
                <TransactionsWidget>
                  <H1 content="Transactions" />
                  <LabelDescription>
                    60.3% of site revenue comes from just two products
                  </LabelDescription>
                  <WidgetBaseLayout>
                    <ComponentWrapper>
                      <TransactionsPills />
                    </ComponentWrapper>
                    <Divider />
                    <ComponentWrapper>
                      <TransactionsTimeline />
                    </ComponentWrapper>
                    <Divider />
                    <ComponentWrapper>
                      <SpaceDivider height={sizes.petite} />
                      <TransactionsChannel
                        width={sunburstWidth}
                      />
                    </ComponentWrapper>
                    <Divider />
                    <ComponentWrapper>
                      <SpaceDivider height={sizes.petite} />
                      <TransactionsStackedBar />
                    </ComponentWrapper>
                  </WidgetBaseLayout>
                </TransactionsWidget>
              </div>
            )
          }
        }
      </Measure>
    );
  }
}

export default TransactionsWidgetCompo;

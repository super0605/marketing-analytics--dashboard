import * as React from 'react';
import styled from 'styled-components';
import { H3 } from "../../../../components";
import { sizes, colors, px, websiteBehaviourPills, WebsiteBehaviourPillsType } from "../../../../constants/constants";
import { DropDownUp } from "../../../../components";
import { websiteBehaviourPillsLabels } from '../../../../constants/valuesByType';

const BehaviourChannelChartFilter = styled.div`
  width: 100%;
  box-sizing: border-box;
  padding-bottom: ${px(sizes.fine)};
`;

interface RowProps {
  z: number;
}
const Row = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  margin-top: ${px(sizes.small)};
  // justify-content: space-between;
  padding-bottom: ${px(sizes.fine)};
  border-bottom: ${px(sizes.hair)} solid ${colors.grayMedium};
  z-index: ${(props: RowProps) => props.z};

  :last-child {
    border-bottom: none;
  }
`;

const Cell = styled.div`
`;

const DropdownWrapper = styled.div`
  padding: ${px(sizes.micro)} 0 0 ${px(sizes.petite)};
`;

interface BehaviourChannelChartFilterCompoProps {
  handleSelect?: (choice: WebsiteBehaviourPillsType) => void;
  selectedPill?: WebsiteBehaviourPillsType;
}
interface BehaviourChannelChartFilterCompoState {
  newBehaviourPill: WebsiteBehaviourPillsType;
}
class BehaviourChannelChartFilterCompo extends React.Component<BehaviourChannelChartFilterCompoProps, BehaviourChannelChartFilterCompoState> {
  constructor(props: BehaviourChannelChartFilterCompoProps) {
    super(props);
    this.state = {
      newBehaviourPill: websiteBehaviourPills.Sessions,
    }

    this.handleMetricSelect = this.handleMetricSelect.bind(this);
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.selectedPill !== prevState.newBehaviourPill) {
      return { newBehaviourPill: nextProps.selectedPill };
    }
    else return null;
  }

  componentDidUpdate(prevProps) {
    if (prevProps.selectedPill !== this.props.selectedPill) {
      this.setState({ newBehaviourPill: this.props.selectedPill });
    }
  }

  render() {
    const { newBehaviourPill } = this.state;
    return (
      <BehaviourChannelChartFilter>
        <Row z={10}>
          <Cell><H3 content="Show me" /></Cell>
          <Cell>
            <DropdownWrapper>
              <DropDownUp
                choices={Array.from(websiteBehaviourPillsLabels.keys())}
                selectedChoice={newBehaviourPill}
                getLabel={(choice: WebsiteBehaviourPillsType) => websiteBehaviourPillsLabels.get(choice)}
                handleSelect={this.handleMetricSelect}
              />
            </DropdownWrapper>
          </Cell>
        </Row>
      </BehaviourChannelChartFilter>
    );
  }

  handleMetricSelect(choice: WebsiteBehaviourPillsType) {
    this.setState({
      newBehaviourPill: choice,
    });
    this.props.handleSelect(choice);
  }
}

export default BehaviourChannelChartFilterCompo;

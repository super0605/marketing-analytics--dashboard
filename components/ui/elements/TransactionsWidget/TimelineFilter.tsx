import * as React from 'react';
import styled from 'styled-components';
import { H3 } from "../../../../components";
import { sizes, colors, px, websiteTransactionsPills, WebsiteTransactionsPillsType } from "../../../../constants/constants";
import { DropDownUp } from "../../../../components";
import { websiteTransactionsPillsLabels } from '../../../../constants/valuesByType';

const TransactionsTimelineFilter = styled.div`
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

interface TransactionsTimelineFilterCompoProps {
  handleSelect?: (choice: WebsiteTransactionsPillsType) => void;
  selectedPill?: WebsiteTransactionsPillsType;
}
interface TransactionsTimelineFilterCompoState {
  newTransactionsPill: WebsiteTransactionsPillsType;
}
class TransactionsTimelineFilterCompo extends React.Component<TransactionsTimelineFilterCompoProps, TransactionsTimelineFilterCompoState> {
  constructor(props: TransactionsTimelineFilterCompoProps) {
    super(props);
    this.state = {
      newTransactionsPill: websiteTransactionsPills.Revenue,
    }

    this.handleMetricSelect = this.handleMetricSelect.bind(this);
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.selectedPill !== prevState.newTransactionsPill) {
      return { newTransactionsPill: nextProps.selectedPill };
    }
    else return null;
  }

  componentDidUpdate(prevProps) {
    if (prevProps.selectedPill !== this.props.selectedPill) {
      this.setState({ newTransactionsPill: this.props.selectedPill });
    }
  }

  render() {
    const { newTransactionsPill } = this.state;
    return (
      <TransactionsTimelineFilter>
        <Row z={10}>
          <Cell><H3 content="Show me" /></Cell>
          <Cell>
            <DropdownWrapper>
              <DropDownUp
                choices={Array.from(websiteTransactionsPillsLabels.keys())}
                selectedChoice={newTransactionsPill}
                getLabel={(choice: WebsiteTransactionsPillsType) => websiteTransactionsPillsLabels.get(choice)}
                handleSelect={this.handleMetricSelect}
              />
            </DropdownWrapper>
          </Cell>
        </Row>
      </TransactionsTimelineFilter>
    );
  }

  handleMetricSelect(choice: WebsiteTransactionsPillsType) {
    this.setState({
      newTransactionsPill: choice,
    });
    this.props.handleSelect(choice);
  }
}

export default TransactionsTimelineFilterCompo;

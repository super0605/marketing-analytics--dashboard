import * as React from 'react';
import styled from 'styled-components';

import { connect } from 'react-redux';
import { websiteTransactionsChannelState } from '../../../../redux/types/websiteTransactionChannel';

import { TreeTable } from "../../../../components";
import { sizes, px } from "../../../../constants/constants";
import { TreeTableData, TreeTableColumn } from "../../../../constants/interfaces";
import { WebsiteTransactionsChannelModel, Value } from '~/models';

const TransactionsChannelTable = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    box-sizing: border-box;
    padding-bottom: ${px(sizes.fine)};
`;

interface TransactionsChannelTableCompoProps {
  websiteTransactionsChannelState?: websiteTransactionsChannelState;
}
class TransactionsChannelTableCompo extends React.Component<TransactionsChannelTableCompoProps, {}> {
  constructor(props: TransactionsChannelTableCompoProps) {
    super(props);
    this.state = {};
  }


  handleTableData = (websiteTransactionsChannelState: websiteTransactionsChannelState) => {
    let tableData: TreeTableData[] = [];
    let tableColumnData: TreeTableColumn[] = [];
    let tableRowData: TreeTableData = null;
    const selectedTransactionPill = 'Revenue';
    const channelsData: WebsiteTransactionsChannelModel = websiteTransactionsChannelState.websiteTransactionsChannel.websiteTransactionsChannelData;
    if (channelsData) {
      const channelsDataKeys = Object.keys(channelsData) !== undefined ? Object.keys(channelsData) : [];
      channelsDataKeys.map((channelDataKey) => {
        const channelData: Value = channelsData[channelDataKey];
        tableRowData = {
          channel: channelDataKey,
          [selectedTransactionPill]: channelData.current,
          change: channelData.change,
        }
        tableData.push(tableRowData);
        tableRowData = null;
      })
    }
    if (selectedTransactionPill) {
      tableColumnData = [
        { name: 'channel', title: 'Channel', width: 50, unit: '' },
        { name: selectedTransactionPill, title: selectedTransactionPill, width: 25, unit: '$' },
        { name: 'change', title: 'Change', width: 25, unit: '%' },
      ];
    }
    return {tableData: tableData, tableHeader: tableColumnData};
  }

  render() {
    return (
      <TransactionsChannelTable>
        <TreeTable Columns={this.handleTableData(this.props.websiteTransactionsChannelState).tableHeader} TableData={this.handleTableData(this.props.websiteTransactionsChannelState).tableData} />
      </TransactionsChannelTable>
    );
  }
}

const mapStateToProps = (state) => ({
  websiteTransactionsChannelState: state.websiteTransactionsChannelState,
});

export default connect(mapStateToProps, {})(TransactionsChannelTableCompo);

import * as React from 'react';
import styled from 'styled-components';
import _ from 'lodash';

import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { WebsiteTransactionsSummaryAction, WebsiteTransactionsPillsSelectingAction } from '../../../../redux/constants';
import { websiteTransactionsSummaryState } from '../../../../redux/types/websiteTransactionsSummary';
import { globalFiltersState } from '../../../../redux/types/globalFilters';
import { websiteTransactionsPillsSelectingState } from '../../../../redux/types/websiteTransactionsPillsSelecting';

import { Pill, RangeGradientBar } from "../../../../components";
import { labelMediumEmphasized } from '../../../../constants/style-constants';
import { px, sizes, globalFiltersQuery, GlobalFiltersQueryType, WebsiteTransactionsPillsType, fonts } from '../../../../constants/constants';
import { globalFiltersQueryObjType } from '../../../../constants/interfaces';
import { globalFiltersQueryKeys, websitePillProperties, websiteTransactionsPillsKeys, websiteTransactionsPillsLabels } from '../../../../constants/valuesByType';



const TransactionsPills = styled.div`
  width: 100%;
`;

interface TransactionsPillItemProps {
  width: number;
};
const TransactionsPillItem = styled.div`
  width: ${(props: TransactionsPillItemProps) => props.width}${"px"};
`;


interface PillTitleProps {
  highLight: Boolean;
}
const PillTitle = styled.div`
  width: 100%;
  ${labelMediumEmphasized};
  text-align: center;
  padding-top :${px(sizes.thin)};
  padding-bottom: ${px(sizes.junior)};
  font-weight: ${(props: PillTitleProps) => !!props.highLight && fonts.weightBold}
  // font-size: ${px(sizes.compact)};
`;

const Row = styled.div`
  width: 100%;
  &::after {
    content: "";
    clear: both;
    display: table;
  }
`;

function getWidthString(span, specified?) {
  if (!span) return;

  let width = span / (specified || 12) * 100;
  return `width: ${width}%`;
}

interface ColumnProps {
  xs?: string;
  sm?: string;
  md?: string;
  lg?: string;
  specified?: number;
}
const Column = styled.div`
  float: left;
  ${(props: ColumnProps) => (props.xs ? getWidthString(props.xs, props.specified) : "width: 100%")};

  @media only screen and (min-width: 1070px) {
    ${(props: ColumnProps) => (props.sm ? getWidthString(props.sm, props.specified) : "width: 100%")};
  }

  @media only screen and (min-width: 1170px) {
    ${(props: ColumnProps) => (props.md ? getWidthString(props.md, props.specified) : "width: 100%")};
  }

  @media only screen and (min-width: 1550px) {
    ${(props: ColumnProps) => (props.lg ? getWidthString(props.lg, props.specified) : "width: 100%")};
  }
`;

const ItemCenter = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const RiseBar = styled.div`
  padding-top: ${px(sizes.junior)};
  padding-bottom: ${px(sizes.junior)};
`;

interface TransactionsPillsCompoProps {
  websiteTransactionsSummaryState: websiteTransactionsSummaryState;
  getWebsiteTransactionsSummary: (brand: string, query: string) => void;
  globalFiltersState: globalFiltersState;
  websiteTransactionsPillsSelecting: (selectedPill: WebsiteTransactionsPillsType) => void;
  websiteTransactionsPillsSelectingState: websiteTransactionsPillsSelectingState;
}
interface TransactionsPillsCompoState {
  selectedPill: number;
}
class TransactionsPillsCompo extends React.Component<TransactionsPillsCompoProps, TransactionsPillsCompoState> {
  constructor(props: TransactionsPillsCompoProps) {
    super(props);
    this.state = {
      selectedPill: this.props.websiteTransactionsPillsSelectingState.selectedWebsiteTransactionsPillData,
    }
  }

  componentDidMount() {
    const brand = "tb1";
    let query = null;

    if (this.props.globalFiltersState.globalFiltersData !== undefined && !_.isEmpty(this.props.globalFiltersState.globalFiltersData.globalFilterQueriesObj) && this.props.globalFiltersState.globalFiltersData.globalFilterQueriesObj[globalFiltersQuery.Range]) {
      const queryObj = this.props.globalFiltersState.globalFiltersData.globalFilterQueriesObj;
      query = this.handleSummaryQuery(queryObj)
    } else {
      const queryObj = {
        [globalFiltersQuery.Range]: "LastMonth",
        [globalFiltersQuery.Channel]: "",
        [globalFiltersQuery.Device]: "",
        [globalFiltersQuery.Region]: "",
        [globalFiltersQuery.CompareWith]: "PreviousPeriod",
      }
      query = this.handleSummaryQuery(queryObj)
    }

    this.props.getWebsiteTransactionsSummary(brand, query);
  }

  componentWillReceiveProps({ globalFiltersState, websiteTransactionsPillsSelectingState }) {
    const brand = "tb1";
    let query = null;
    const globalFiltersStateOld: globalFiltersState = this.props.globalFiltersState;
    if (!_.isEqual(globalFiltersState, globalFiltersStateOld)) {
      if (globalFiltersState && globalFiltersState.globalFiltersData.globalFiltersData !== undefined) {
        if (globalFiltersState.globalFiltersData.globalFiltersData.globalFilterQueriesObj !== undefined && globalFiltersState.globalFiltersData.globalFiltersData.globalFilterQueriesObj[globalFiltersQuery.Range]) {
          const queryObj = globalFiltersState.globalFiltersData.globalFiltersData.globalFilterQueriesObj;

          const queryObjTemp = Object.assign({}, queryObj);
          queryObjTemp[globalFiltersQuery.Region] = 'NA'; // test mode for the region: always region is NA

          query = this.handleSummaryQuery(queryObjTemp)
          this.props.getWebsiteTransactionsSummary(brand, query)
         
        }
      }
    }

    if (websiteTransactionsPillsSelectingState.selectedWebsiteTransactionsPillData !== this.state.selectedPill) {
      this.setState({ selectedPill: websiteTransactionsPillsSelectingState.selectedWebsiteTransactionsPillData });
    }
  }

  handleSummaryQuery = (queryObj: globalFiltersQueryObjType) => {
    let query: string = "?";
    Array.from(globalFiltersQueryKeys.keys()).map((key: GlobalFiltersQueryType, index: number) => {
      const queryKey = globalFiltersQueryKeys.get(key);
      if (queryObj[key] !== undefined && queryObj[key]) {
        if (index < Array.from(globalFiltersQueryKeys.keys()).length){
          query = `${query}${queryKey}=${queryObj[key]}&`;
        } else {
          query = `${query}${queryKey}=${queryObj[key]}`;
        }
      }
    })

    return query;
  }

  handleSelectPill = (pillKey) => {
    this.setState({
      selectedPill: pillKey,
    });
    this.props.websiteTransactionsPillsSelecting(pillKey);
  }

  public render() {
    const { websiteTransactionsSummaryData } = this.props.websiteTransactionsSummaryState.websiteTransactionsSummary;
    const { selectedPill } = this.state;
    return (
      <div>
        <TransactionsPills>
          <Row>
            {
              Array.from(websiteTransactionsPillsKeys.keys()).map((key: WebsiteTransactionsPillsType) => (
                <Column key={key} specified={15} lg="3" md="5" sm="7" xs="15">
                  <ItemCenter>
                    <TransactionsPillItem key={key} width={210}>
                      <PillTitle highLight={selectedPill == key ? true : false}>
                        {websiteTransactionsPillsLabels.get(key)}
                      </PillTitle>
                      <Pill
                        pillKey={key}
                        pillWidth={210}
                        pillHeight={210}
                        pillCx={100}
                        pillCy={100}
                        pillInnerRadius={85}
                        pillouterRadius={100}
                        pillFill={ websitePillProperties.get(key).pillColor}
                        pillVal={(websiteTransactionsSummaryData && websiteTransactionsSummaryData[websiteTransactionsPillsKeys.get(key)].current !== undefined ) ? websiteTransactionsSummaryData[websiteTransactionsPillsKeys.get(key)].current : 0}
                        pillValColor={websitePillProperties.get(key).pillValColor}
                        pillValUnit={websitePillProperties.get(key).pillValUnit}
                        pillChangeVal={websiteTransactionsSummaryData ? websiteTransactionsSummaryData[websiteTransactionsPillsKeys.get(key)].change : 0}
                        pillChangeValColor={websitePillProperties.get(key).pillChangeValColor}
                        pillChangeValUnit={websitePillProperties.get(key).pillChangeValUnit}
                        handleSelectPill={this.handleSelectPill}
                      />
                    </TransactionsPillItem>
                  </ItemCenter>
                </Column>
              ))
            }
          </Row>
          <Row>
            <RiseBar>
              <RangeGradientBar
                startVal="Low"
                endVal="High"
                name="rise"
                barWidth={150}
                gradient="background-image: linear-gradient(to right, #720606, #973644, #b0647d, #c293b0, #d5c2d8, #ccc1d4, #c5c0cf, #c0bfc9, #9292a3, #64677e, #37405c, #041d3b);"
              />
            </RiseBar>
          </Row>
        </TransactionsPills>
      </div>
    );
  }
};


const mapStateToProps = (state) => ({
  websiteTransactionsSummaryState: state.websiteTransactionsSummaryState,
  globalFiltersState: state.globalFiltersState,
  websiteTransactionsPillsSelectingState: state.websiteTransactionsPillsSelectingState,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  getWebsiteTransactionsSummary: (brand: string, query: string) => dispatch({ type: WebsiteTransactionsSummaryAction.GET_WEBSITE_TRANSACTIONS_SUMMARY_REQUEST, payload: { brand, query } }),
  websiteTransactionsPillsSelecting: (selectedPill: WebsiteTransactionsPillsType) => dispatch({ type: WebsiteTransactionsPillsSelectingAction.SELECT_WEBSITE_TRANSACTIONS_PILLS_START, payload: selectedPill }),
});

export default connect(mapStateToProps, mapDispatchToProps)(TransactionsPillsCompo);
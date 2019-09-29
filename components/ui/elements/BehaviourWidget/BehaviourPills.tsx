import * as React from 'react';
import styled from 'styled-components';
import _ from 'lodash';

import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { WebsiteSummaryAction, WebsiteBehaviourPillsSelectingAction } from '../../../../redux/constants';
import { websiteSummaryState } from '../../../../redux/types/websiteSummary';
import { globalFiltersState } from '../../../../redux/types/globalFilters';
import { websiteBehaviourPillsSelectingState } from '../../../../redux/types/websiteBehaviourPillsSelecting';

import { Pill, RangeGradientBar } from "../../../../components";
import { labelMediumEmphasized } from '../../../../constants/style-constants';
import { px, sizes, fonts, globalFiltersQuery, GlobalFiltersQueryType, WebsiteBehaviourPillsType } from '../../../../constants/constants';
import { globalFiltersQueryObjType } from '../../../../constants/interfaces';
import { globalFiltersQueryKeys, websiteBehaviourPillsKeys, websiteBehaviourPillsLabels, websitePillProperties } from '../../../../constants/valuesByType';



const BehaviourPills = styled.div`
  width: 100%;
`;

interface BehaviourPillItemProps {
  width: number;
};
const BehaviourPillItem = styled.div`
  width: ${(props: BehaviourPillItemProps) => props.width}${"px"};
  cursor: pointer;
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

interface BehaviourPillsCompoProps {
  websiteSummaryState: websiteSummaryState;
  getWebsiteSummary: (brand: string, query: string) => void;
  globalFiltersState: globalFiltersState;
  websiteBahaviourPillsSelecting: (selectedPill: WebsiteBehaviourPillsType) => void;
  websiteBehaviourPillsSelectingState: websiteBehaviourPillsSelectingState;
}
interface BehaviourPillsCompoState {
  selectedPill: number;
}
class BehaviourPillsCompo extends React.Component<BehaviourPillsCompoProps, BehaviourPillsCompoState> {
  constructor(props: BehaviourPillsCompoProps) {
    super(props);
    this.state = {
      selectedPill: this.props.websiteBehaviourPillsSelectingState.selectedWebsiteBehaviourPillData,
    }
  }

  async componentDidMount() {
    const brand = "tb1";
    let query = null;
    if (this.props.globalFiltersState.globalFiltersData !== undefined && !_.isEmpty(this.props.globalFiltersState.globalFiltersData.globalFilterQueriesObj) && this.props.globalFiltersState.globalFiltersData.globalFilterQueriesObj[globalFiltersQuery.Range]) {
      const queryObj = this.props.globalFiltersState.globalFiltersData.globalFilterQueriesObj;
      query = await this.handleSummaryQuery(queryObj)
    } else {
      const queryObj = {
        [globalFiltersQuery.Range]: "LastMonth",
        [globalFiltersQuery.Channel]: "",
        [globalFiltersQuery.Device]: "",
        [globalFiltersQuery.Region]: "",
        [globalFiltersQuery.CompareWith]: "PreviousPeriod",
      }
      query = await this.handleSummaryQuery(queryObj)
    }

    await this.props.getWebsiteSummary(brand, query);
  }

  componentWillReceiveProps({ globalFiltersState, websiteBehaviourPillsSelectingState }) {
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
          this.props.getWebsiteSummary(brand, query)

        }
      }
    }

    if (websiteBehaviourPillsSelectingState.selectedWebsiteBehaviourPillData !== this.state.selectedPill) {
      this.setState({ selectedPill: websiteBehaviourPillsSelectingState.selectedWebsiteBehaviourPillData });
    }
  }

  handleSummaryQuery = (queryObj: globalFiltersQueryObjType) => {
    let query: string = "?";
    Array.from(globalFiltersQueryKeys.keys()).map((key: GlobalFiltersQueryType, index: number) => {
      const queryKey = globalFiltersQueryKeys.get(key);
      if (queryObj[key] !== undefined && queryObj[key]) {
        if (index + 1 == Array.from(globalFiltersQueryKeys.keys()).length) {
          query = `${query}${queryKey}=${queryObj[key]}`;
        } else {
          query = `${query}${queryKey}=${queryObj[key]}&`;
        }
      }
    })

    return query;
  }

  handleSelectPill = (pillKey) => {
    this.setState({
      selectedPill: pillKey,
    });
    this.props.websiteBahaviourPillsSelecting(pillKey);
  }

  public render() {
    const { websiteSummaryData } = this.props.websiteSummaryState.websiteSummary;
    const { selectedPill } = this.state;
    return (
      <div>
        <BehaviourPills>
          <Row>
            {
              Array.from(websiteBehaviourPillsKeys.keys()).map((key: WebsiteBehaviourPillsType) => (
                <Column key={key} specified={15} lg="3" md="5" sm="7" xs="15">
                  <ItemCenter>
                    <BehaviourPillItem key={key} width={210}>
                      <PillTitle highLight={selectedPill == key ? true : false}>
                        {websiteBehaviourPillsLabels.get(key)}
                      </PillTitle>
                      <Pill
                        pillKey={key}
                        pillWidth={210}
                        pillHeight={210}
                        pillCx={100}
                        pillCy={100}
                        pillInnerRadius={85}
                        pillouterRadius={100}
                        pillFill={websitePillProperties.get(key).pillColor}
                        pillVal={(websiteSummaryData && websiteSummaryData[websiteBehaviourPillsKeys.get(key)] !== undefined) ? websiteSummaryData[websiteBehaviourPillsKeys.get(key)].current : 0}
                        pillValColor={websitePillProperties.get(key).pillValColor}
                        pillValUnit={websitePillProperties.get(key).pillValUnit}
                        pillChangeVal={(websiteSummaryData && websiteSummaryData[websiteBehaviourPillsKeys.get(key)] !== undefined) ? websiteSummaryData[websiteBehaviourPillsKeys.get(key)].change : 0}
                        pillChangeValColor={websitePillProperties.get(key).pillChangeValColor}
                        pillChangeValUnit={websitePillProperties.get(key).pillChangeValUnit}
                        handleSelectPill={this.handleSelectPill}
                      />
                    </BehaviourPillItem>
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
        </BehaviourPills>
      </div>
    );
  }
};

const mapStateToProps = (state) => ({
  websiteSummaryState: state.websiteSummaryState,
  globalFiltersState: state.globalFiltersState,
  websiteBehaviourPillsSelectingState: state.websiteBehaviourPillsSelectingState,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  getWebsiteSummary: (brand: string, query: string) => dispatch({ type: WebsiteSummaryAction.GET_WEBSITE_SUMMARY_REQUEST, payload: { brand, query } }),
  websiteBahaviourPillsSelecting: (selectedPill: WebsiteBehaviourPillsType) => dispatch({ type: WebsiteBehaviourPillsSelectingAction.SELECT_WEBSITE_BEHAVIOUR_PILLS_START, payload: selectedPill }),
});

export default connect(mapStateToProps, mapDispatchToProps)(BehaviourPillsCompo);
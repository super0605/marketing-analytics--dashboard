import * as React from 'react';
import styled from 'styled-components';
import { Container, Row, Col } from 'styled-bootstrap-grid';

import { connect } from 'react-redux';
import { countryData } from '~/redux/reducer/mapTableHover';
import { Dispatch } from 'redux';
import { WebsiteGeographicAction } from '../../../../redux/constants';
import { websiteGeographicState } from '../../../../redux/types/webisteGeographic';
import { globalFiltersState } from '../../../../redux/types/globalFilters';
import { globalFiltersQueryKeys, websiteTransactionsPillsKeys } from '../../../../constants/valuesByType';
import { globalFiltersQueryObjType } from '../../../../constants/interfaces';

import { H1, Datamap } from "../../../../components";
import MapFilter from "./MapFilter";
import MapFilterByMoney from "./MapFilterByMoney";
import MapAnalyticsHeader from "./MapAnalyticsHeader";
import MapAnalyticsTable from "./MapAnalyticsTable";
import { sizes, px, WebsiteGeographicMetricsType, globalFiltersQuery, GlobalFiltersQueryType, WebsiteTransactionsPillsType, websiteTransactionsPills } from "../../../../constants/constants";
import { widgetStyle, labelMediumEmphasized } from '../../../../constants/style-constants';

import ausTopoJSON from './ausTopoJSON';



let colors: any;

const GeographicWidget = styled.div`
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

interface countryName {
    name: string;
}
interface MapData {
    id: string;
    properties: countryName;
    type: string;
    geometry?: object;
}

interface StateProps {
    hoverCountryData?: countryData
    websiteGeographicState: websiteGeographicState;
    getWebsiteGeographic: (brand: string, metric: string, query: string) => void;
    globalFiltersState: globalFiltersState;
}

interface GeographicWidgetCompoState {
    mapData: Object;
    selectedMapData: MapData;
    newMetricPill: WebsiteGeographicMetricsType;
    newTransactionsPill: WebsiteTransactionsPillsType;
}
class GeographicWidgetCompo extends React.Component<StateProps, GeographicWidgetCompoState> {
    constructor(props: StateProps) {
        super(props);

        this.state = {
            mapData: {
                USA: { fillKey: 'red' },
                JPN: { fillKey: 'authorHasTraveledTo' },
                ITA: { fillKey: 'authorHasTraveledTo' },
                CRI: { fillKey: 'authorHasTraveledTo' },
                KOR: { fillKey: 'authorHasTraveledTo' },
                DEU: { fillKey: 'authorHasTraveledTo' }
            },
            selectedMapData: {
                id: '',
                properties: {
                    name: '',
                },
                type: ''
            },
            newTransactionsPill: websiteTransactionsPills.Revenue,
        };

    }

    componentDidMount() {
        this.getWebsiteGeographic();
        colors = d3.scale.category10();
    }

    componentWillReceiveProps(nextProps) {

        if (nextProps.hoverCountryData) {
            this.setState({
                mapData: {},
            });
            if (this.props.hoverCountryData !== nextProps.hoverCountryData && nextProps.hoverCountryData.countryCode !== null) {
                this.update(nextProps.hoverCountryData.countryCode);
            }
        }

        if (nextProps.globalFiltersState) {
            const brand = "tb1";
            const metric = websiteTransactionsPillsKeys.get(this.state.newTransactionsPill);
            let query = null;
            query = this.getQuery(nextProps.globalFiltersState, true);
            if (query) {
                this.props.getWebsiteGeographic(brand, metric, query);
            }
        }
    }

    update(countryCode: string) {
        let key: string = countryCode || 'default';
        const mapData = {
            [key]: colors(Math.random() * 100),
        };

        this.setState({
            mapData,
        });
    }

    getWebsiteGeographic = () => {
        const brand = "tb1";
        const metric = websiteTransactionsPillsKeys.get(this.state.newTransactionsPill);
        let query = null;

        if (this.props.globalFiltersState.globalFiltersData !== undefined && !_.isEmpty(this.props.globalFiltersState.globalFiltersData.globalFilterQueriesObj) && this.props.globalFiltersState.globalFiltersData.globalFilterQueriesObj[globalFiltersQuery.Range]) {
            const queryObj = this.props.globalFiltersState.globalFiltersData.globalFilterQueriesObj;
            query = this.handleQuery(queryObj)
        } else {
            const queryObj = {
                [globalFiltersQuery.Range]: "LastMonth",
                [globalFiltersQuery.Channel]: "",
                [globalFiltersQuery.Device]: "",
                [globalFiltersQuery.Region]: "",
                [globalFiltersQuery.CompareWith]: "PreviousPeriod",
            }
            query = this.handleQuery(queryObj);
        }

        this.props.getWebsiteGeographic(brand, metric, query);
    }

    getQuery = (globalFiltersState, global: boolean = true) => {
        let query = null;
        const globalFiltersStateOld: globalFiltersState = this.props.globalFiltersState;
        if (global) {
            if (!_.isEqual(globalFiltersState, globalFiltersStateOld)) {
                if (globalFiltersState && globalFiltersState.globalFiltersData.globalFiltersData !== undefined) {
                    if (globalFiltersState.globalFiltersData.globalFiltersData.globalFilterQueriesObj !== undefined && globalFiltersState.globalFiltersData.globalFiltersData.globalFilterQueriesObj[globalFiltersQuery.Range]) {
                        const queryObj = globalFiltersState.globalFiltersData.globalFiltersData.globalFilterQueriesObj;

                        const queryObjTemp = Object.assign({}, queryObj);
                        queryObjTemp[globalFiltersQuery.Region] = 'NA'; // test mode for the region: always region is NA

                        query = this.handleQuery(queryObjTemp);
                    }
                }
            }
        } else {
            if (globalFiltersState && globalFiltersState.globalFiltersData.globalFiltersData !== undefined) {
                if (globalFiltersState.globalFiltersData.globalFiltersData.globalFilterQueriesObj !== undefined && globalFiltersState.globalFiltersData.globalFiltersData.globalFilterQueriesObj[globalFiltersQuery.Range]) {
                    const queryObj = globalFiltersState.globalFiltersData.globalFiltersData.globalFilterQueriesObj;

                    const queryObjTemp = Object.assign({}, queryObj);
                    queryObjTemp[globalFiltersQuery.Region] = 'NA'; // test mode for the region: always region is NA

                    query = this.handleQuery(queryObjTemp);
                }
            }
        }

        return query;
    }

    handleQuery = (queryObj: globalFiltersQueryObjType) => {
        let query: string = "?";
        Array.from(globalFiltersQueryKeys.keys()).map((key: GlobalFiltersQueryType, index: number) => {
            const queryKey = globalFiltersQueryKeys.get(key);
            if (queryObj[key] !== undefined && queryObj[key]) {
                if (index < Array.from(globalFiltersQueryKeys.keys()).length) {
                    query = `${query}${queryKey}=${queryObj[key]}&`;
                } else {
                    query = `${query}${queryKey}=${queryObj[key]}`;
                }
            }
        })

        return query;
    }

    public render() {
        return (
            <div>
                <GeographicWidget>
                    <H1 content="Geographic" />
                    <LabelDescription>
                        The % transaction offsetting carbon footprint goal has the highest increase since last period
                    </LabelDescription>
                    <WidgetBaseLayout>
                        <Container fluid>
                            <Row>
                                <Col md={7} sm={12}>
                                    <Row>
                                        <Col>
                                            <MapFilter />
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <Datamap
                                                scope="usa"
                                                data={this.state.mapData}
                                                updateChoroplethOptions={{ reset: false }}
                                                responsive={true}
                                                graticule={true}
                                                // labels
                                            />
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <MapFilterByMoney startVal={0} endVal={10} filter={'Revenue'} />
                                        </Col>
                                    </Row>
                                </Col>
                                <Col md={5} sm={12}>
                                    <Row>
                                        <Col>
                                            <MapAnalyticsHeader Text="Top 10 countries for Revenue" />
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <MapAnalyticsTable />
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                        </Container>

                    </WidgetBaseLayout>
                </GeographicWidget>
            </div>
        );
    }
};

const mapStateToProps = (state) => ({
    hoverCountryData: state.mapTableHover.countryData,
    websiteGeographicState: state.websiteGeographicState,
    globalFiltersState: state.globalFiltersState,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
    getWebsiteGeographic: (brand: string, metric: string, query: string) => dispatch({ type: WebsiteGeographicAction.GET_WEBSITE_GEOGRAPHIC_REQUEST, payload: { brand, metric, query } }),
});

export default connect(mapStateToProps, mapDispatchToProps)(GeographicWidgetCompo);
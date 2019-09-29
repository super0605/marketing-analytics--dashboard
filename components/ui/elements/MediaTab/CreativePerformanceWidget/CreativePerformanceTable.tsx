import * as React from 'react';
import styled from 'styled-components';
import { sizes, px } from "../../../../../constants/constants";
import { GeneralTHType } from "../../../../../constants/interfaces";
import { GeneralTable } from "../../../../../components";
import { labelMediumEmphasized } from '../../../../../constants/style-constants';


const CreativePerformanceTable = styled.div`
  width: 100%;
  box-sizing: border-box;
  padding-bottom: ${px(sizes.fine)};
`;

const LabelDescription = styled.div`
  ${labelMediumEmphasized};
  padding-bottom: ${px(sizes.petite)};
  text-align: left;
`;

const TableWrapper = styled.div`
  padding: ${px(sizes.petite)} 0 
`;

interface CreativePerformanceTableCompoState {
  cloudViewWidth: number;
}
class CreativePerformanceTableCompo extends React.Component<{}, CreativePerformanceTableCompoState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      cloudViewWidth: 0
    }
  }

  public render() {
    const performanceTableDummyData = [
      {
        campaign: 'Australia',
        size: 25000,
        impressions: 110.5,
        clicks: 2.5,
        spend: 36,
        ctr: 22.6,
      },
      {
        campaign: 'United State',
        size: 25000,
        impressions: 110.5,
        clicks: 2.5,
        spend: 36,
        ctr: 22.6,
      },
      {
        campaign: 'United State',
        size: 25000,
        impressions: 110.5,
        clicks: 2.5,
        spend: 36,
        ctr: 22.6,
      },
      {
        campaign: 'United State',
        size: 25000,
        impressions: 110.5,
        clicks: 2.5,
        spend: 36,
        ctr: 22.6,
      },
      {
        campaign: 'United State',
        size: 25000,
        impressions: 110.5,
        clicks: 2.5,
        spend: 36,
        ctr: 22.6,
      },
      {
        campaign: 'United State',
        size: 25000,
        impressions: 110.5,
        clicks: 2.5,
        spend: 36,
        ctr: 22.6,
      },

    ];

    const ctrFormatter = (val) => `${val} %`;
    const changeFormatter = (val: number) => `${Math.sign(val) == -1 ? '- ' : '+ '}${Math.abs(val)} % yoy`;

    const THData: GeneralTHType[] = [
      {
        key: "campaign",
        value: "Campaign",
        width: 30,
      },
      {
        key: "size",
        value: "Size",
        width: 30,
      },
      {
        key: "impressions",
        value: "Impressions",
        width: 30,
      },
      {
        key: "clicks",
        value: "Clicks",
        width: 30,
        formatter: changeFormatter,
      },
      {
        key: "spend",
        value: "Spend",
        width: 30,
      },
      {
        key: "ctr",
        value: "CTR",
        width: 30,
        formatter: ctrFormatter,
      },
    ];

    return (
      <CreativePerformanceTable>
        <TableWrapper>
          <LabelDescription>
            Highest performing
          </LabelDescription>
          <GeneralTable
            theaderData={THData}
            tbodyData={performanceTableDummyData}
          />
        </TableWrapper>
        <TableWrapper>
          <LabelDescription>
            Lowest performing
          </LabelDescription>
          <GeneralTable
            theaderData={THData}
            tbodyData={performanceTableDummyData}
          />
        </TableWrapper>
      </CreativePerformanceTable>
    );
  }
}

export default CreativePerformanceTableCompo;

import * as React from 'react';
import styled from 'styled-components';
import { colors, sizes, elementSizes, px } from "../../../constants/constants";
import { labelBase } from "../../../constants/style-constants";
import { TreeTableColumn, TreeTableData } from "../../../constants/interfaces";

const TreeTable = styled.div`
  width: 100%;
  position: relative;
`

const TableHeader = styled.div`
  margin-right: ${px(-Math.abs(sizes.little))};
  display: flex;
`;

const TableBody = styled.div`
  width: 100%;
`;

interface THProps {
  thWidth: number;
}
const TH = styled.div`
  width: ${(props: THProps) => props.thWidth}${"%"};
  height: ${px(elementSizes.inputHeight)};
  padding-right: ${px(sizes.little)};
`;

const TableRow = styled.div`
  width: 100%;
`;

const TR = styled.div`
  display: flex;
  padding-top: ${px(sizes.micro)};
  min-height: ${px(elementSizes.inputHeight)};
  margin-right: ${px(-Math.abs(sizes.little))};

  :hover {
    cursor: pointer;
    background-color: #eee;
  }
`;

interface TDProps {
  tdWidth: number;
}
const TD = styled.div`
  width: ${(props: TDProps) => props.tdWidth}${"%"};
  display: flex;
  position: relative;
  padding-right: ${px(sizes.little)};
`;

const ChildTR = styled.ul`
  display: flex;
  padding-top: ${px(sizes.micro)};
  min-height: ${px(elementSizes.inputHeight)};
  margin-right: ${px(-Math.abs(sizes.little))};
  
  :hover {
    cursor: pointer;
    background-color: #eee;
  }
`;

interface ChildTDProps {
  tdWidth: number;
}
const ChildTD = styled.li`
  width: ${(props: ChildTDProps) => props.tdWidth}${"%"};
  display: flex;
  position: relative;
  padding-right: ${px(sizes.little)};
  :first-child {
    padding-left: ${px(sizes.little)};
  }
`;

const BottomLine = styled.div`
  height: ${px(sizes.dblhair)};
  width: 100%;
  left: 0;
  bottom: ${-px(sizes.dblhair)};
  background-color: ${colors.blueDatavizPrimary};
`

const TableCell = styled.div`
  width: 100%;
  ${labelBase};
`;

interface TreeTableCompProps {
  TableData: TreeTableData[];
  Columns: TreeTableColumn[];
}
interface TreeTableCompState {
  expandedRows: Array<number>;
}
class TreeTableComp extends React.Component<TreeTableCompProps, TreeTableCompState> {
  constructor(props: TreeTableCompProps) {
    super(props);
    this.state = {
      expandedRows: [],
    };
  }

  handleExpand = (player: TreeTableData) => {
    let newExpandedRows = [...this.state.expandedRows];
    let idxFound = newExpandedRows.findIndex((uuid) => {
      return uuid === player.uuid;
    });

    if (idxFound > -1) {
      newExpandedRows.splice(idxFound, 1);
    }
    else {
      newExpandedRows.push(player.uuid);
    }
    this.setState({ expandedRows: [...newExpandedRows] });
  }

  isExpanded = (player: TreeTableData) => {
    const idx = this.state.expandedRows.find(
      (uuid) => {
        return uuid === player.uuid;
      }
    );

    return idx > -1;
  }

  render() {
    const { TableData, Columns } = this.props;

    return (
      <TreeTable>
        <TableHeader>
          {
            Columns.map((Column, k) => (
              <TH key={k} thWidth={Column.width || (100 / Columns.length)}>{Column.title}<BottomLine /></TH>
            ))
          }
        </TableHeader>
        <TableBody>
          {TableData.map((data, k) => (
            <TableRow key={k}>
              <TR onClick={() => this.handleExpand(data)}>
                {
                  Columns.map((Column, index) => (
                    <TD tdWidth={Column.width} key={index}>
                      <TableCell>
                        {Column.unit == '$' && '$'}
                        {data[Column.name]}
                        {Column.unit == '%' && '%'}
                      </TableCell>
                    </TD>
                  ))
                }
              </TR>
              {
                this.isExpanded(data) && (data.children !== undefined && data.children.length > 0) &&
                data.children.map((childData, i) => (
                  <ChildTR key={i}>
                    {
                      Columns.map((Column, index) => (
                        <ChildTD tdWidth={Column.width} key={index}>
                          <TableCell>
                            {Column.unit == '$' && '$'}
                            {childData[Column.name]}
                            {Column.unit == '%' && '%'}
                          </TableCell>
                        </ChildTD>
                      ))
                    }
                  </ChildTR>
                ))
              }

            </TableRow>
          ))}
        </TableBody>
      </TreeTable>
    );
  }
}

export default TreeTableComp;

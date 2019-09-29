import * as React from 'react';
import styled from 'styled-components';
import Measure, { ContentRect } from "react-measure";
import { sizes, px, SunburstData } from "../../../../constants/constants";
import * as d3 from 'd3';
import get from 'lodash/fp/get';

const Sunburst = styled.div`
  width: 100%;
  padding-top: ${px(sizes.junior)};
  padding-bottom: ${px(sizes.junior)};
  display: flex;
  justify-content: center;
`;

export interface DataType {
  name: string;
  value: number;
}
export interface NodePositionType {
  x0: number;
  x1: number;
  y0: number;
  y1: number;
}

export interface NodeType extends d3.HierarchyRectangularNode<{}> {
  current: NodeType;
  data: DataType;
  depth: number;
  height: number;
  parent: NodeType;
  target?: any;
  value: number;
  x0: number;
  x1: number;
  y0: number;
  y1: number;
}

export interface NodeTypeSecond extends d3.HierarchyRectangularNode<{}> {
  current: NodePositionType;
  data: DataType;
  depth: number;
  height: number;
  parent: NodeType;
  target?: NodePositionType;
  value: number;
  x0: number;
  x1: number;
  y0: number;
  y1: number;
}

export interface NodeTypeThird extends d3.HierarchyRectangularNode<{}> {
  current: NodeType;
  data: DataType;
  depth: number;
  height: number;
  parent: NodeTypeThird;
  target: NodePositionType;
  value: number;
  x0: number;
  x1: number;
  y0: number;
  y1: number;
}

interface SunburstCompoProps {
  data: SunburstData;
  width: number;
}
interface SunburstCompoState {
  width: number;
  data: SunburstData;
}
class SunburstCompo extends React.Component<SunburstCompoProps, SunburstCompoState> {
  node: SVGSVGElement;
  this: any;

  constructor(props: SunburstCompoProps) {
    super(props);

    this.state = {
      width: props.width,
      data: props.data
    };
  }

  componentDidMount() {
    this.drawSunburst();
  }

  componentWillReceiveProps(newProps, prevProps) {
    const { width, data } = newProps;
    if (newProps.width !== prevProps.width) {
      this.clear();
      this.setState({
        width,
        data
      });
    }
  }

  componentDidUpdate() {
    this.drawSunburst();
  }

  componentWillUnmount() {
    this.clear();
  }

  clear() {
    let { node } = this;

    for (const child of Array.from(node.childNodes)) {
      node.removeChild(child);
    }

    // delete currentMap;
    node = null;
  }

  drawSunburst = () => {
    const { width, data } = this.state;
    const defaultWidth = 500;
    const radius = width / 6 || defaultWidth / 6;
    const { node } = this;
    if (node && data) {
      const color: d3.ScaleOrdinal<string, string> = d3.scaleOrdinal(d3.quantize(d3.interpolateRainbow, data.children.length + 1));
      this.initChart(node, width || defaultWidth, radius, color, data);
    }
  }

  initChart(node: SVGSVGElement, width: number, radius: number, color: d3.ScaleOrdinal<string, string>, data: SunburstData) {
    const root: d3.HierarchyRectangularNode<{}> = this.partition(data);
    root.each(function (d: NodeType) {
      d.current = d;
    })

    const svg = d3.select(node)
      .style("width", width)
      .style("height", width)
      .style("font", "10px sans-serif");

    const g = svg.append("g")
      .attr("transform", `translate(${width / 2},${width / 2})`);

    const path = g.append("g")
      .selectAll("path")
      .data(root.descendants().slice(1))
      .join("path")
      .attr("fill", (d: NodeType) => {
        while (d.depth > 1) d = d.parent;
        return color(d.data.name);
      })
      .attr("fill-opacity", (d: NodeType) => {
        return arcVisible(d.current) ? (d.children ? 0.6 : 0.4) : 0
      })
      .attr("d", (d: NodeType) => {
        return arc(d.current)
      });

    path.filter((d: any) => d.children)
      .style("cursor", "pointer")
      .on("click", clicked);

    path.append("title")
      .text((d: NodeType) => `${d.ancestors().map((d) => d.data.name).reverse().join("/")}\n${format(d.value)}`);

    const label = g.append("g")
      .attr("pointer-events", "none")
      .attr("text-anchor", "middle")
      .style("user-select", "none")
      .selectAll("text")
      .data(root.descendants().slice(1))
      .join("text")
      .attr("dy", "0.35em")
      .attr("fill-opacity", (d: NodeType) => +labelVisible(d.current))
      .attr("transform", (d: NodeType) => labelTransform(d.current))
      .text((d: NodeType) => d.data.name);

    const parent = g.append("circle")
      .datum(root)
      .attr("r", radius)
      .attr("fill", "none")
      .attr("pointer-events", "all")
      .on("click", clicked);

    function clicked(p: NodeType) {
      parent.datum(p.parent || root);

      root.each((d: NodeType) => d.target = {
        x0: Math.max(0, Math.min(1, (d.x0 - p.x0) / (p.x1 - p.x0))) * 2 * Math.PI,
        x1: Math.max(0, Math.min(1, (d.x1 - p.x0) / (p.x1 - p.x0))) * 2 * Math.PI,
        y0: Math.max(0, d.y0 - p.depth),
        y1: Math.max(0, d.y1 - p.depth)
      });

      const t = g.transition().duration(750);
      path.transition(t)
        .tween("data", (d: NodeTypeSecond) => {
          const i = d3.interpolate(d.current, d.target);
          return (t) => d.current = i(t);
        })
        .filter(function (d) {
          const element: Element | EnterElement | Document | Window | SVGPathElement = this;
          return !!(+element.getAttribute("fill-opacity") || arcVisible(get('target')(d)));
        })
        .attr("fill-opacity", (d: NodeType) => arcVisible(d.target) ? (d.children ? 0.6 : 0.4) : 0)
        .attrTween("d", (d: NodeType) => () => arc(d.current));

      label.filter(function (d: NodeTypeThird) {
        const element: Element | EnterElement | Document | Window | SVGPathElement = this;
        return !!(+element.getAttribute("fill-opacity") || arcVisible(get('target')(d)));
      }).transition(t)
        .attr("fill-opacity", (d: NodeType) => +labelVisible(d.target))
        .attrTween("transform", (d: NodeType) => () => labelTransform(d.current));
    }

    function arcVisible(d: NodeType) {
      return d.y1 <= 3 && d.y0 >= 1 && d.x1 > d.x0;
    }

    function labelVisible(d: NodeType) {
      return d.y1 <= 3 && d.y0 >= 1 && (d.y1 - d.y0) * (d.x1 - d.x0) > 0.03;
    }

    function labelTransform(d: NodeType) {
      const x = (d.x0 + d.x1) / 2 * 180 / Math.PI;
      const y = (d.y0 + d.y1) / 2 * radius;
      return `rotate(${x - 90}) translate(${y},0) rotate(${x < 180 ? 0 : 180})`;
    }

    function format(value: number) {
      return (
        d3.format(",d")(value)
      )
    }

    function arc(data) {
      return (
        d3.arc()
          .startAngle((d) => {
            return get('x0')(d)
          })
          .endAngle((d) => get('x1')(d))
          .padAngle((d) => Math.min((get('x1')(d) - get('x0')(d)) / 2, 0.005))
          .padRadius(radius * 1.5)
          .innerRadius((d) => get('y0')(d) * radius)
          .outerRadius((d) => Math.max(get('y0')(d) * radius, get('y1')(d) * radius - 1))(data)
      )
    }
  }

  partition(data) {
    const root = d3.hierarchy(data)
      .sum(d => d.value)
      .sort((a, b) => b.value - a.value);
    return d3.partition()
      .size([2 * Math.PI, root.height + 1])(root);
  }

  public render() {
    const { width } = this.props;
    return (
      <Measure bounds={true}>
        {
          ({ measureRef }) => {
            return (
              <div ref={measureRef}>
                <Sunburst>
                  <svg style={{ width: `${width}px` || '100%', height: `${width}px` || '100%' }} ref={(node: SVGSVGElement) => this.node = node} />
                </Sunburst>
              </div>
            )
          }
        }
      </Measure>
    );
  }
};

export default SunburstCompo;
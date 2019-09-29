import * as React from 'react';
import styled from 'styled-components';
import { sizes, px } from "../../../../constants/constants";
import * as d3 from 'd3';
// import { data } from './ClusterData';

let focusedNode = null;
let updatedFocusedNodeGroup = null;
let updatedFocusedNode = null;

const ClusterView = styled.div`
  width: 100%;
  padding-top: ${px(sizes.junior)};
  padding-bottom: ${px(sizes.junior)};
  display: flex;
  justify-content: center;
`;

interface dataType {
  id: number
  campaignName: string
  revenue: number
  ctr?: number
  imgUrl: string
  x?: number
  y?: number
  r?: number
  radius?: number
}

interface dragPosition {
  campaignName: string
  ctr: number
  fx: number
  fy: number
  id: number
  imgUrl: string
  index: number
  r: number
  radius: number
  revenue: number
  vx: number
  vy: number
  x: number
  y: number
}

interface ClusterViewCompoProps {
  width: number
  height: number
  data: dataType[]
  backgroundColor: string
  boxColor: string
  compareVal?: number
}
class ClusterViewCompo extends React.Component<ClusterViewCompoProps, {}> {
  node: SVGSVGElement;
  this: any;


  constructor(props: ClusterViewCompoProps) {
    super(props);
  }

  componentDidMount() {
    this.drawCloudView();
  }

  componentWillReceiveProps(newProps, prevProps) {
    const { width } = newProps;
    if (newProps.width !== prevProps.width) {
      this.clear();
      this.setState({
        width
      });
    }
  }

  componentDidUpdate() {
    this.drawCloudView();
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

  drawCloudView = () => {
    const { node } = this;
    const { data, width, height, backgroundColor, boxColor, compareVal } = this.props;
    if (node) {
      this.initClusterView(node, data, width, height, backgroundColor, boxColor, compareVal);
    }
  }

  initClusterView(nodeSvg, data, width, height, backgroundColor, boxColor, compareVal) {

    const svg = d3.select(nodeSvg);
    const centerX = width * 0.5;
    const centerY = height * 0.5;
    const strength = 0.1;

    const format = d3.format(',d');

    // use pack to calculate radius of the circle

    let pack = d3.pack()
      .size([width, height])
      .padding(0);

    let forceCollide = d3.forceCollide((d: dataType) => d.r);

    // use the force
    let simulation = d3.forceSimulation()
      .force('link', d3.forceLink().id((d: dataType) => d.campaignName))
      .force('charge', d3.forceManyBody())
      .force('collide', forceCollide)
      .force('center', d3.forceCenter(centerX, centerY))
      .force('x', d3.forceX(centerX).strength(strength))
      .force('y', d3.forceY(centerY).strength(strength));

    let root = d3.hierarchy({ children: data })
      .sum((d: any) => d.ctr);

    // we use pack() to automatically calculate radius conveniently only
    // and get only the leaves
    let nodes = pack(root).leaves().map(node => {
      const data: dataType = node.data as dataType;
      return {
        x: centerX + (node.x - centerX) * 15, // magnify start position to have transition to center movement
        y: centerY + (node.y - centerY) * 10,
        r: 0, // for tweening
        radius: node.r, //original radius
        id: data.id,
        campaignName: data.campaignName,
        revenue: data.revenue,
        ctr: data.ctr,
        imgUrl: data.imgUrl,
      }
    });
    simulation.nodes(nodes).on('tick', ticked);

    svg.style('background-color', backgroundColor || '#eee');
    let node = svg.selectAll(node)
      .data(nodes)
      .enter().append('g')
      .attr('class', 'node')
      .call(d3.drag()
        .on('start', (d: dragPosition) => {
          if (!d3.event.active) simulation.alphaTarget(0.2).restart();
          d.fx = d.x;
          d.fy = d.y;
        })
        .on('drag', (d: dragPosition) => {
          d.fx = d3.event.x;
          d.fy = d3.event.y;
        })
        .on('end', (d: dragPosition) => {
          if (!d3.event.active) simulation.alphaTarget(0);
          d.fx = null;
          d.fy = null;
        }));

    node.append('rect')
      .attr('id', d => d.id)
      .attr('width', function (d) { return d.width; })
      .attr("x", function (d) { return d.r * -1; })
      .attr("y", function (d) { return d.r * -1; })
      .attr("height", function (d) { return d.height; })
      .style('fill', boxColor || '#c8c8c8')
      .transition().duration(2000).ease(d3.easeElasticOut)
      .tween('circleIn', (d) => {
        let i = d3.interpolateNumber(0, d.radius);
        return (t) => {
          d.r = i(t);
          simulation.force('collide', forceCollide);
        }
      })

    node.append('clipPath')
      .attr('id', d => `clip-${d.id}`)
      .append('use')
      .attr('xlink:href', d => `#${d.id}`);

    node.filter(d => String(d.imgUrl).includes(''))
      .append('image')
      .classed('node-icon', true)
      .attr('clip-path', d => `url(#clip-${d.id})`)
      .attr('xlink:href', d => d.imgUrl)
      .attr('x', d => - d.radius)
      .attr('y', d => - d.radius * 1.5)
      .attr('height', d => d.radius * 1.2)
      .attr('width', d => d.radius * 1.5)

    //------- title info ---------
    let campaignInfo = node.append('foreignObject')
      .classed('circle-overlay', true)
      .attr('x', d => -1 * d.radius)
      .attr('y', d => -1 * d.radius + d.radius / 1.5)
      .attr('width', d => d.radius * 1.5)
      .attr('height', d => d.radius * 3 / 4)
      .append('xhtml:div')
      .classed('circle-overlay__inner', true);

    campaignInfo.append('h5')
      .classed('circle-overlay__title', true)
      .text(d => d.ctr > compareVal ? d.campaignName : "");

    campaignInfo.append('p')
      .classed('circle-overlay__body', true)
      .html(d => d.ctr > compareVal ? `revenue | $${d.revenue}` : "");

    campaignInfo.append('p')
      .classed('circle-overlay__body', true)
      .html(d => `CTR | ${d.ctr} %`);


      node.on('mouseover', function (currentNode) {

        let currentTarget = d3.event.currentTarget; // the <g> el
        let $currentGroup = d3.select(currentTarget);

        var margin = { top: 20, right: 10, bottom: 20, left: 10 };
        var width = 800 - margin.left - margin.right;
        var height = 480 - margin.top - margin.bottom;
        var foWidth = 300;
        var anchor = { 'w': width / 3, 'h': height / 3 };
        var t = 50, k = 15;
        var tip = { 'w': (3 / 4 * t), 'h': k };
        var fo = svg.append('foreignObject')

          .attr('x', currentNode.x)
          .attr('y', currentNode.y)

          .attr('width', foWidth)
          .classed('svg-tooltip', true);
        var div = fo.append('xhtml:div')
          .append('div')
          .classed('tooltip', true);
        div.append('p')
          .attr('class', 'lead')
          .html('Best performing network name');
        div.append('p')
          .html('Dates run');
        div.append('p')
          .html('Regions');
        div.append('p')
          .html('Investment');
        div.append('p')
          .html('Other important details');
        // var foHeight = currentNode.r * 1.2;
        var foHeight = 300;
        fo.attr(
          'height', foHeight
        );
        svg.insert('polygon', '.svg-tooltip')
          // .attr('points', "0,0 0," + foHeight + " " + foWidth + "," + foHeight + " " + foWidth + ",0 " + (t) + ",0 " + tip.w + "," + (-tip.h) + " " + (t / 2) + ",0")
          
          .attr('height', foHeight + tip.h)
          .attr('width', foWidth)
          .attr('fill', '#D8D8D8')
          .attr('opacity', 0.75)
          .attr('transform', 'translate(' + (anchor.w - tip.w) + ',' + (anchor.h + tip.h) + ')')
      })
        .on('mouseout', function () {
          svg.selectAll('.svg-tooltip').remove();
          svg.selectAll('polygon').remove();
        });

    node.on('click', (currentNode) => {
      d3.event.stopPropagation();
      console.log('currentNode', currentNode);
      let currentTarget = d3.event.currentTarget; // the <g> el
      let $currentGroup = d3.select(currentTarget);
      if (currentNode === focusedNode) {
        // no focusedNode or same focused node is clicked
        return;
      }
      let lastNode = focusedNode;
      let lastNodeGroup = updatedFocusedNodeGroup;
      focusedNode = currentNode;
      simulation.alphaTarget(0.2).restart();
      // hide all circle-overlay
      d3.selectAll('.circle-overlay').classed('node-icon--faded', false);
      d3.selectAll('.cloud-overlay').classed('node-icon--faded', false);
      d3.selectAll('.node-icon').classed('node-icon--faded', false);
      // don't fix last node to center anymore

      if (lastNode) {
        lastNode.fx = null;
        lastNode.fy = null;
        node.filter((d, i) => i === lastNode.index)
          .transition().duration(2000).ease(d3.easePolyOut)
          .tween('circleOut', () => {
            let irl = d3.interpolateNumber(lastNode.r, lastNode.radius);
            return (t) => {
              if (lastNodeGroup) {
                lastNodeGroup.select(".node-icon")
                  .attr('x', -lastNode.r)
                  .attr('y', -lastNode.r * 1.5)
                  .attr('height', lastNode.r * 1.2)
                  .attr('width', lastNode.r * 1.5)
                // .classed('overlayPopup', true);
              }
              lastNode.r = irl(t);

            }
          })
          .on('interrupt', () => {
            lastNode.r = lastNode.radius;
          });
      }

      d3.transition().duration(500).ease(d3.easePolyOut)
        .tween('moveIn', () => {
          console.log('tweenMoveIn', currentNode);
          let ix = d3.interpolateNumber(currentNode.x, centerX * 1.1);
          let iy = d3.interpolateNumber(currentNode.y, centerY * 1);
          let ir = d3.interpolateNumber(currentNode.r, centerY * 0.4);
          return function (t) {
            currentNode.fx = ix(t);
            currentNode.fy = iy(t);
            currentNode.r = ir(t);

            $currentGroup.select(".node-icon")
              .attr('x', -currentNode.r)
              .attr('y', -currentNode.r * 1.5)
              .attr('height', currentNode.r * 1.2)
              .attr('width', currentNode.r * 1.5);

            // tooltip($currentGroup, currentNode)

            simulation.force('collide', forceCollide);
          };
        })
        .on('end', () => {
          simulation.alphaTarget(0);
          let $currentGroup = d3.select(currentTarget);

          $currentGroup.select('.circle-overlay')
            .classed('hidden', false);
          $currentGroup.select('.cloud-overlay')
            .classed('hidden', false);

          updatedFocusedNodeGroup = $currentGroup;
          updatedFocusedNode = focusedNode;

        })
        .on('interrupt', () => {
          currentNode.fx = null;
          currentNode.fy = null;
          simulation.alphaTarget(0);
        });

    });

    // blur
    d3.select(document).on('click', () => {
      let target = d3.event.target;
      // check if click on document but not on the circle overlay
      if (!target.closest('#circle-overlay') && focusedNode) {
        focusedNode.fx = null;
        focusedNode.fy = null;
        simulation.alphaTarget(0.2).restart();
        d3.transition().duration(500).ease(d3.easePolyOut)
          .tween('moveOut', function () {
            console.log('tweenMoveOut', focusedNode);
            let ir = d3.interpolateNumber(focusedNode.r, focusedNode.radius);
            return function (t) {
              focusedNode.r = ir(t);

              updatedFocusedNodeGroup.select(".node-icon")
                .attr('x', -focusedNode.r)
                .attr('y', -focusedNode.r * 1.5)
                .attr('height', focusedNode.r * 1.2)
                .attr('width', focusedNode.r * 1.5)
              // .classed('overlayPopup', true);

              simulation.force('collide', forceCollide);
            };
          })
          .on('end', () => {
            focusedNode = null;
            updatedFocusedNodeGroup = null;
            updatedFocusedNode = null;
            simulation.alphaTarget(0);
          })
          .on('interrupt', () => {
            simulation.alphaTarget(0);
          });
        // hide all circle-overlay
        // d3.selectAll('.circle-overlay').classed('hidden', true);
        d3.selectAll('.node-icon').classed('node-icon--faded', false);
        d3.selectAll('.circle-overlay').classed('node-icon--faded', false);
        // d3.selectAll('.overlayPopup').classed('hidden', true);

      }
    });


    function ticked() {
      node
        .attr('transform', d => `translate(${d.x},${d.y * 1.1})`)
        .select('rect')
        .attr("width", function (d) { return d.r * 1.5; })
        .attr("x", function (d) { return d.r * -1; })
        .attr("y", function (d) { return d.r * -1.5; })
        .attr("height", function (d) { return d.r * 2; });
    }

  }

  public render() {
    const height = 600;
    return (

      <ClusterView>
        <svg style={{ width: '100%', height: `${height}px` || '100%' }} ref={(node: SVGSVGElement) => this.node = node} />
      </ClusterView>

    );
  }
};

export default ClusterViewCompo;
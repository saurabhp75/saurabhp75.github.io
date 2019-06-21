import {
  select,
  scaleThreshold,
  json,
  format
} from 'd3';

import { loadAndProcessData } from './loadAndProcessData.js';
import { colorLegend } from './colorLegend';
import { choroplethMap } from './choroplethMap';
import { getSvgDimensions, getSvg } from './miscUtils';

// Select the root svg element
// const svg = select("svg");
const mainCanvas = getSvg();
const mainCanvasDimensions = getSvgDimensions();

// Constituency group
const constituencyG = mainCanvas.append('g');

// Legend group and placed in lower left of svg
// This will appear over constituencyG group
const colorLegendG = mainCanvas.append('g').attr('transform', `translate(10,540)`);

// Get height of root svg element
// const width = +svg.attr("width");
// const height = +svg.attr("height");

// Add border to root svg
var borderPath = mainCanvas.append("rect")
  .attr("x", 0)
  .attr("y", 0)
  .attr("height", mainCanvasDimensions.height)
  .attr("width", mainCanvasDimensions.width)
  .style("stroke", 'black')
  .style("fill", "none")
  .style("stroke-width", 1);

// Add zooming and panning
// svg.call(d3.zoom().on('zoom', () => {
//   g.attr('transform', d3.event.transform);
// }));

// Define colorscale for constituencies
const colorScale = scaleThreshold();


let selectedColorValue;
let features;

const onClick = d => {
  // console.log(d); 
  selectedColorValue = d;
  // console.log('onclick called');
  // console.log({selectedColorValue}); 
  render();
};

// Load external data and boot
loadAndProcessData().then((feature_array) => {
  features = feature_array;
  render();
});

const render = () => {

  // const keyArray = feature_array.map(d => {
  //   return d.properties.ST_PC;
  // });

  // console.log('render called')

  const colorDomain = [10000000, 100000000, 1000000000, 2000000000, 5000000000];
  const colorRange = ['#edf8e9', '#c7e9c0', '#a1d99b', '#74c476', '#31a354', '#006d2c'];
  const legendLabels = ["< 1 Crore", "1 - 10 Crore", "10 - 100 Crore", "100 - 200 Crore", "200 - 500 Crore", "> 500 Crore"];

  // Set set domain and range of colorscale for constiruencies
  colorScale.domain(colorDomain).range(colorRange);

  // Draw the map
  // constituencyG.selectAll("path")
  //   .data(features)
  //   .enter()
  //   .append("path")
  //   .attr('class', 'constituency')
  //   // draw each constituencies
  //   .attr("d", pathGenerator)
  //   // set color of each constituency
  //   .attr("fill", constituencyColor)
  //   .append('title')
  //   .text(hoverText);

  // Draw map
  constituencyG
    .call(choroplethMap, {
      features,
      colorScale
    });

  // Draw legend bar
  colorLegendG
    .call(colorLegend, {
      colorRange,
      legendLabels,
      rectSize: 20,
      spacing: 20,
      textOffset: 30,
      onClick,
      selectedColorValue
    });

} // End of render()



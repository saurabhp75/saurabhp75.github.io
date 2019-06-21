import {
  select,
  scaleThreshold,
  json
} from 'd3';

import { loadAndProcessData } from './loadAndProcessData.js';
import { colorLegend } from './colorLegend';
import { choroplethMap } from './choroplethMap';
import { getSvgDimensions, getSvg } from './miscUtils';

// Select the root svg element
const mainCanvas = getSvg();
const mainCanvasDimensions = getSvgDimensions();

// Constituency group
const constituencyG = mainCanvas.append('g');

// Legend group and placed in lower left of svg. 
// This will appear over constituencyG group
const colorLegendG = mainCanvas.append('g').attr('transform', `translate(10,540)`);

// Add border to the main canvas
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

const colorDomain = [10000000, 
                     100000000, 
                     1000000000, 
                     2000000000, 
                     5000000000];

const colorValues = ['#edf8e9', 
                    '#c7e9c0', 
                    '#a1d99b', 
                    '#74c476', 
                    '#31a354', 
                    '#006d2c'];

const colorLabels = ["< 1 Crore", 
                      "1 - 10 Crore", 
                      "10 - 100 Crore", 
                      "100 - 200 Crore", 
                      "200 - 500 Crore", 
                      "> 500 Crore"];

// Set set domain and range of colorscale for constituencies
colorScale.domain(colorDomain).range(colorValues);

// Invert the legend bar
colorValues.reverse();
colorLabels.reverse();

// Keep track of the selected color in legend bar
let selectedColorValue;

// Globally (in the file) accessible feature array
let features;

// Update the 
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

  // console.log('render called')

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
      colorScale,
      selectedColorValue
    });

  // Draw legend bar
  colorLegendG
    .call(colorLegend, {
      colorValues,
      colorLabels,
      rectSize: 20,
      spacing: 20,
      textOffset: 30,
      onClick,
      selectedColorValue
    });

} // End of render()



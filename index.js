import {
  select,
  scaleThreshold,
  json,
  zoom,
  event
} from 'd3';

import { loadAndProcessData } from './loadAndProcessData.js';
import { colorLegend } from './colorLegend';
import { choroplethMap } from './choroplethMap';
import { getSvgDimensions, getSvg } from './miscUtils';
import { infoPanel } from './infoPanel';
import { getBgRectangleDimensions } from './miscUtils';

// Set domensions of root svg
const mainCanvas = select("svg");

const mainCanvasHeight = mainCanvas.attr('height');
const mainCanvasWidth = mainCanvas.attr('width');

// Constituency group
const constituencyG = mainCanvas.append('g');

// Information panel
const infoPanelG = mainCanvas.append('g').attr('transform', `translate(${mainCanvasWidth - 370 - 15},20)`);

// Add one time text element to Info Panel
const infoPanelGUpdate = infoPanelG.selectAll('text').data([null]);

// Add new text element
const infoPanelGMerge = infoPanelGUpdate.enter()
  .append('text')
  .attr('class', 'infoText')
  .attr('transform', 'translate(10,5)')
  .merge(infoPanelGUpdate);

// Add border to the main canvas
const borderPath = mainCanvas.append("rect")
  .attr("x", 0)
  .attr("y", 0)
  .attr("height", getSvgDimensions().height)
  .attr("width", getSvgDimensions().width)
  .style("stroke", 'black')
  .style("fill", "none")
  .style("stroke-width", 1);

// Add pannning and zooming to map
mainCanvas.call(zoom().on('zoom', () => {
  constituencyG.attr('transform', event.transform);
}));

///////////////////////////////////////////////////////
///// Add background rectangle to the info panel   ////
///////////////////////////////////////////////////////

// Background of info panel, single item, special case
const infoPanelGBackground = infoPanelG.selectAll('rect').data([null]);

// Background of info panel
infoPanelGBackground.enter().append('rect')
  .merge(infoPanelGBackground)
  .attr('width', 370)
  .attr('height', 120)
  .attr('fill', 'red')
  .attr('stroke', 'black')
  .attr('stroke-width', 1)
  .attr('rx', 10)
  .attr('opacity', 0.3);


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
  "1 - 10 Cr.",
  "10 - 100 Cr.",
  "100 - 200 Cr.",
  "200 - 500 Cr.",
  "> 500 Cr."];

// Set set domain and range of colorscale for constituencies
colorScale.domain(colorDomain).range(colorValues);

// Invert the legend bar
colorValues.reverse();
colorLabels.reverse();

///////////////////////
/////  App states /////
///////////////////////
// A) Color not selected, const not selected:
// Clicking on any color filters map.->B
// Clicking on any const also filters map.->C

// B) Color selected, const not selected:
// Clicking on selected color->A
// Clicking on other color->B
// Clicking on const.->C

// C) Color not selected const. selected:
// Clicking on any color ->B
// Clicking on filtered const. ->C
// Clicking on non-filtered const. A

// D)Color selected, const. selected:
// This state should not occur.

let selectedColorValue; // tracks selected color in legend bar
let features; // Globally (in the file) accessible feature array
let selectedConstituency; // tracks selected constituency in map

// Update the 
const onColorClick = d => {
  // console.log(d);
  // If constituency is selected, deselect it
  if (selectedConstituency) {
    selectedConstituency = null;
  }
  selectedColorValue = d;
  render();
};

const onConstituencyClick = d => {
  // console.log(`const clicked: ${d}`);
  // // If color is selected, deselect it
  if (selectedColorValue) {
    selectedColorValue = null;
  }
  selectedConstituency = d;
  render();
}

// Load external data and boot
loadAndProcessData().then((feature_array) => {
  features = feature_array;
  render();
});


// constants for legend bar
const labelRectSize = 30;
const labelSpacing = 30;
const labelTextOffset = 40;

///////////////////////////////////////////////////////
///// Add background rectangle to the color legend ////
///////////////////////////////////////////////////////

const backgroundRectDimensions = getBgRectangleDimensions(colorValues,
  colorLabels,
  labelRectSize,
  labelTextOffset,
  labelSpacing);

// Create Legend group and place in lower left of svg. 
// This will appear over constituencyG group
const colorLegendG = mainCanvas.append('g').attr('transform', `translate(10, ${mainCanvasHeight - backgroundRectDimensions.height})`);

// Background of legend bar, single item, special case
const backgroundRect = colorLegendG.selectAll('rect').data([null]);

// Background of legend
backgroundRect.enter().append('rect')
  .merge(backgroundRect)
  .attr('x', -labelRectSize)
  .attr('y', -labelRectSize)
  .attr('width', backgroundRectDimensions.width)
  .attr('height', backgroundRectDimensions.height)
  .attr('fill', 'red')
  .attr('rx', labelRectSize)
  .attr('stroke', 'black')
  .attr('stroke-width', 1)
  .attr('opacity', 0.3);

const render = () => {
  // console.log('render called')

  // Draw map
  constituencyG
    .call(choroplethMap, {
      features,
      colorScale,
      selectedColorValue,
      onConstituencyClick,
      selectedConstituency
    });

  // Draw legend bar
  colorLegendG
    .call(colorLegend, {
      colorValues,
      colorLabels,
      labelRectSize,
      labelSpacing,
      labelTextOffset,
      onColorClick,
      selectedColorValue,
      selectedConstituency
    });

  // Update info panel text
  infoPanelGMerge
    .call(infoPanel, {
      selectedConstituency,
      selectedColorValue,
      features,
      colorValues,
      colorLabels
    });

} // End of render()



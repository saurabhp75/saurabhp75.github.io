import {
  select,
  scaleThreshold,
  json
} from 'd3';

import { loadAndProcessData } from './loadAndProcessData.js';
import { colorLegend } from './colorLegend';
import { choroplethMap } from './choroplethMap';
import { getSvgDimensions, getSvg } from './miscUtils';
import { infoPanel } from './infoPanel';

// console.log(`Width: ${document.body.clientWidth}`);
// console.log(`Height: ${document.body.clientHeight}`);

// const height = document.body.clientHeight;
// const width = document.body.clientWidth;

// console.log({height, width});
// console.log({rem, em})

// Set domensions of root svg
const mainCanvas = select("svg");
//   .attr('width', width)
//   .attr('height', height);

// Constituency group
const constituencyG = mainCanvas.append('g');

// Legend group and placed in lower left of svg. 
// This will appear over constituencyG group
const colorLegendG = mainCanvas.append('g').attr('transform', `translate(10,500)`);

// Information panel
const infoPanelG = mainCanvas.append('g').attr('transform', `translate(350,20)`);

// Add border to the main canvas
const borderPath = mainCanvas.append("rect")
  .attr("x", 0)
  .attr("y", 0)
  .attr("height", getSvgDimensions().height)
  .attr("width", getSvgDimensions().width)
  .style("stroke", 'black')
  .style("fill", "none")
  .style("stroke-width", 1);


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

///////////////////////
/////  App states /////
///////////////////////
// A) 
// Color not selected, const not selected:
// Clicking on any color filters map.->B
// Clicking on any const also filters map.->C

// B)
// Color selected, const not selected:
// Clicking on selected color->A
// Clicking on other color->B
// Clicking on filtered const.->A
// Clicking on non filtered const.-->B

// C)
// Color not selected const. selected:
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
  // If constituency is selected goto initial state
  if (selectedConstituency) {
    selectedColorValue = null;
    selectedConstituency = null;
  } else {
    selectedColorValue = d;
  }  
  render();
};

const onConstituencyClick = d => {
  // console.log(`const clicked: ${d}`);
  // // If color is selected goto initial state
  if (selectedColorValue) {
    selectedConstituency = null;
    selectedColorValue = null;
  } else{
    selectedConstituency = d;
  }
  render();
}

// Load external data and boot
loadAndProcessData().then((feature_array) => {
  features = feature_array;
  render();
});


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
      rectSize: 30,
      spacing: 30,
      textOffset: 40,
      onColorClick,
      selectedColorValue,
      selectedConstituency
    });

    // Draw info panel
    infoPanelG
      .call(infoPanel, {
        selectedConstituency,
        selectedColorValue,
        features
      });

} // End of render()



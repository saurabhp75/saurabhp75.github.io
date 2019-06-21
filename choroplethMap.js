import {
  select,
  geoPath,
  geoMercator,
  format
} from 'd3';

import { getSvgDimensions } from './miscUtils';

// Select the root svg element
// const svg = select("svg");
// Get height of root svg element
// const width = +svg.attr("width");
// const height = +svg.attr("height");

//Set map and projection
const projection = geoMercator().scale(1200)
                    .center([82.5, 23])
                    .translate([getSvgDimensions().width / 2, getSvgDimensions().height / 2]);

const pathGenerator = geoPath().projection(projection);

// Select the root svg element
// const svg = select("svg");
// Get height of root svg element
// const width = +svg.attr("width");
// const height = +svg.attr("height");

// function returning hover text
const hoverText = (d) => {
  if (d.properties.Assets_num) {
    return ('Constituency: ' + d.properties.PC_NAME_x + '\n' + 'MP: ' + d.properties.Candidate + '\n' + 'Assets(Rs.): ' + format(",.2r")(d.properties.Assets_num))
  }
  else { return ('Constituency: ' + d.properties.PC_NAME_x + '\n' + 'MP: ' + 'No data' + '\n' + 'Assets(Rs.): ' + 'No data') }
}

// function returning constituency color
const constituencyColor = (d, colorScale) => {
  if (!d.properties.Assets_num) { return "black" }
  return colorScale(d.properties.Assets_num);
}


// Draw the map from constituencyG passed as 'selection'
export const choroplethMap = (selection, props) => {
  // console.log('choroplethMap called');

  const { 
    features,
    colorScale,
    selectedColorValue
  } = props;

// update selection
  // const g = selection.selectAll('g').data([null]);
// enter selection
  // const gEnter = g.enter().append('g');


const constituencyPaths = selection.selectAll("path").data(features, d => d.properties.ST_PC);
constituencyPaths
  .enter().append("path")
    .attr('class', 'constituency')
    // draw each constituencies
    .attr("d", pathGenerator)
    // set color of each constituency
    .attr("fill", d => constituencyColor(d, colorScale))
    .append('title')
    .text(hoverText)
  .merge(constituencyPaths);
    // .attr('opacity', (d) => constOpacity(d, selectedColorValue));
    
  // .append('title')
  // .text(hoverText);


// constituencyG.selectAll("path")
// .data(features)
// .enter()
// .append("path")
// .attr('class', 'constituency')
// // draw each constituencies
// .attr("d", pathGenerator)
// // set color of each constituency
// .attr("fill", d = > constituencyColor(d, colorScale))
// .append('title')
// .text(hoverText);

}
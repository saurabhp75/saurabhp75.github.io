import {
  select,
  geoPath,
  geoMercator,
  format
} from 'd3';
import { getSvgDimensions } from './miscUtils';

console.log(`${getSvgDimensions()}`)

//Set map and projection
const projection = geoMercator().scale(1200)
  .center([82.5, 23])
  // .center([78, 20])
  .translate([getSvgDimensions().width / 2, getSvgDimensions().height / 2]);

const pathGenerator = geoPath().projection(projection);

// function returning hover text
const hoverText = (d) => {
  if (d.properties.Assets_num) {
    return ('Constituency: '
      + d.properties.PC_NAME_x
      + '\n'
      + 'MP: '
      + d.properties.Candidate
      + '\n' + 'Assets(Rs.): '
      + format(",.2r")(d.properties.Assets_num)
      + '\n'
      + 'Party: '
      + d.properties.Party);
  }
  else {
    return ('Constituency: '
      + d.properties.PC_NAME_x
      + '\n' 
      + 'MP: No data'
      + '\n'
      + 'Assets(Rs.): No data'
      + '\n'
      + 'Party: No Data');
  }
}

// function returning constituency color
const constituencyColor = (d, colorScale) => {
  // console.log('constituencyColor called')
  if (!d.properties.Assets_num) { return "black" }
  return colorScale(d.properties.Assets_num);
}

const constituencyOpacity = (d, selectedConstituency, selectedColorValue, colorScale) => {
  // If a const. is selected, then make opacity 1
  // else if color of const. is equal to selected color, then make opacity 1
  // else make opacity 0.2
  if (!selectedConstituency && !selectedColorValue) {// Initial state
    return 1;
  } else if (selectedConstituency && (selectedConstituency === d.properties.ST_PC)) {
    return 1;
  } else if (selectedColorValue && (selectedColorValue === colorScale(d.properties.Assets_num))){
    return 1;
  }
  else return 0.2; 
}

// Draw the map from constituencyG passed as 'selection'
export const choroplethMap = (selection, props) => {
  // console.log('choroplethMap called');
  const {
    features,
    colorScale,
    selectedColorValue,
    onConstituencyClick,
    selectedConstituency
  } = props;

  const constituencyPaths = selection.selectAll("path").data(features, d => d.properties.ST_PC);

  const constituencyPathsEnter = constituencyPaths.enter()
    .append("path")
    .attr('class', 'constituency')
    .attr("d", pathGenerator)
    .attr("fill", d => constituencyColor(d, colorScale));

  constituencyPathsEnter.append('title').text(hoverText);

  constituencyPathsEnter.merge(constituencyPaths)
    .attr('opacity', d => constituencyOpacity(d, selectedConstituency, selectedColorValue, colorScale))
    .classed('highlighted', d =>
      (selectedColorValue && selectedColorValue === colorScale(d.properties.Assets_num))
    )
    .on('click', d => 
      onConstituencyClick(
        d.properties.ST_PC === selectedConstituency
          ? null
          : d.properties.ST_PC
      )
    );
}
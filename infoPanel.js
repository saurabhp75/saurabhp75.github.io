import {
  format
} from 'd3';

// Create data rows for infoPanel
const getInfoPanelData = (selectedConstituency, selectedColorValue, features) => {

  // console.log('getInfoPanelData called');

  if (!selectedConstituency && !selectedColorValue) {
    return ['Click on legend bar or constituency'];
  }
  else if (selectedConstituency) {

    const arrItem = features.filter(d => d.properties.ST_PC === selectedConstituency);

    const constituency = arrItem[0].properties.PC_NAME_x;
    const candidate = arrItem[0].properties.Candidate;
    const party = arrItem[0].properties.Party;
    const assets = arrItem[0].properties.Assets_num;

    return ([

      'Constituency: ' + arrItem[0].properties.PC_NAME_x,

      'MP: ' + arrItem[0].properties.Candidate,

      'Assets(Rs.): ' + format(",.2r")(arrItem[0].properties.Assets_num),

      'Party: ' + arrItem[0].properties.Party
    ])
  }
  else if (selectedColorValue) {
    return ['you clicked on the legend bar'];
  }
  else return ['This should not be displayed'];

}

// Create infoPanel
export const infoPanel = (selection, props) => {
  // console.log('infoPanel called');
  const {
    selectedConstituency,
    selectedColorValue,
    features
  } = props;

  // console.log({selectedConstituency, selectedColorValue});
  // const selectionUpdate = selection.selectAll('text').data([{selectedConstituency, selectedColorValue}]);
  const selectionUpdate = selection.selectAll('text').data([null]);

  // remove previuos(old) text
  // selectionUpdate.exit().remove();

  // Add new text element
  const selectionMerge = selectionUpdate.enter().append('text').merge(selectionUpdate);
  
  // Get the data to display on panel
  const textData = getInfoPanelData(selectedConstituency, selectedColorValue, features);

  console.log({textData});

  // Data join: tspan<=>textData
  const textRows = selectionMerge.selectAll('tspan').data(textData);

  // remove old text
  textRows.exit().remove();

  textRows
    .enter()
    // .merge(textRows)
    .append('tspan')
    .attr('x', '0')
    .attr('dy', '1.2rem')
    // .attr('transform', (d, i) => `translate(0, ${i * 20})`)
    .text((d) => d);  

}
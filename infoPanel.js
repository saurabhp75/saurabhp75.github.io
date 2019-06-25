import {
  format
} from 'd3';

// Create data rows for infoPanel
const getInfoPanelData = (selectedConstituency, selectedColorValue, features, colorValues, colorLabels) => {

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
    const assetsTextIndex = colorValues.indexOf(selectedColorValue);
    
    return [`MP(s) with assets:  ${colorLabels[assetsTextIndex]}`];
  }
  else return ['This should not be displayed'];

}

// Create infoPanel
export const infoPanel = (selection, props) => {
  // console.log('infoPanel called');
  const {
    selectedConstituency,
    selectedColorValue,
    features,
    colorValues,
    colorLabels
  } = props;

  // console.log({selectedConstituency, selectedColorValue});
  // const selectionUpdate = selection.selectAll('text').data([{selectedConstituency, selectedColorValue}]);

  // Add one time text element
  const selectionUpdate = selection.selectAll('text').data([null]);

  // Add new text element
  const selectionMerge = selectionUpdate.enter()
    .append('text')
    .attr('class', 'infoText')
    .merge(selectionUpdate);
  
  // Get the data to display on panel
  const textData = getInfoPanelData(selectedConstituency, selectedColorValue, features, colorValues, colorLabels);

  // console.log({textData});
  
  // remove all existing text
  selectionMerge.selectAll('tspan').remove();

  // Data join: tspan<=>textData
  const textRows = selectionMerge.selectAll('tspan').data(textData);

  textRows
    .enter()
    .append('tspan')
    .attr('x', '0')
    .attr('dy', '1.2rem')
    .text((d) => d);  

}
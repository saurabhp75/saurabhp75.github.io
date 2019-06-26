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
    const constCapitalized = constituency.charAt(0).toUpperCase() + constituency.slice(1).toLowerCase();

    const candidate = arrItem[0].properties.Candidate ? arrItem[0].properties.Candidate : "No data";
    const party = arrItem[0].properties.Party ? arrItem[0].properties.Party : "No data";
    const assets = arrItem[0].properties.Assets_num ? arrItem[0].properties.Assets_num : "No data";

    // console.log({constituency, candidate, party, assets});

    return ([

      'Constituency: ' + constCapitalized,

      'MP: ' + candidate,

      'Assets(Rs.): ' + format(",.2r")(assets),

      'Party: ' + party
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
  // Add one time text element
  const selectionUpdate = selection.selectAll('text').data([null]);

  // Add new text element
  const selectionMerge = selectionUpdate.enter()
    .append('text')
    // .attr('stroke', 'red')
    .attr('class', 'infoText')
    .attr('transform', 'translate(10,5)')
    .merge(selectionUpdate);
  
  // Get the data to display on panel
  const textData = getInfoPanelData(selectedConstituency, selectedColorValue, features, colorValues, colorLabels);

   // remove all existing text
  selectionMerge.selectAll('tspan').remove();

  // Data join: tspan<=>textData
  const textRows = selectionMerge.selectAll('tspan').data(textData);

  textRows
    .enter()
    .append('tspan')
    .attr('x', '0')
    .attr('dy', '1.5rem')
    .text((d) => d);  

}
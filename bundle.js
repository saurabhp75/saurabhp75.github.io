(function (d3) {
  'use strict';

  const loadAndProcessData = () =>

    d3.json('https://raw.githubusercontent.com/saurabhp75/saurabhp75.github.io/master/data/merged_pc_map_trim.json')
      .then((topo) => {

        const feature_array = topo.features;
        return feature_array;
      });

  const colorLegend = (selection, props) => {

    // console.log('colorLegend called');

    const { colorValues, // Array of colors
      colorLabels, //Tile labels array
      rectSize, // Size of color tile
      spacing, // spacing between color tiles
      textOffset, // spacing between color tiles
      onColorClick,
      selectedColorValue, //currently selected value of color
      selectedConstituency
    } = props;

    // // Get background rectangale dimensions
    // const getBgRectangleDimensions = (colorRange, legendLabels, rectSize, textOffset) => {
    //   // Find longest label
    //   const longestLabel = legendLabels.reduce(function (a, b) { return a.length > b.length ? a : b; });
    //   const backgroundRectWidth = rectSize + textOffset + longestLabel.length * 5 + textOffset;
    //   const backgroundRectHeight = spacing * (colorRange.length + 2);
    //   return { width: backgroundRectWidth, height: backgroundRectHeight };
    // }

    // const backgroundRectDimensions = getBgRectangleDimensions(colorRange,
    //   legendLabels,
    //   rectSize,
    //   textOffset);

    // // Background of legend bar, single item, special case
    // const backgroundRect = selection.selectAll('rect').data([null]);

    // // Background of legend
    // backgroundRect.enter().append('rect')
    //   .merge(backgroundRect)
    //   .attr('x', -rectSize)
    //   .attr('y', -rectSize)
    //   .attr('width', backgroundRectDimensions.width)
    //   .attr('height', backgroundRectDimensions.height)
    //   .attr('fill', 'green')
    //   .attr('rx', rectSize)
    //   .attr('opacity', 0.2);

    // Append two groups to legend group, one for title (legendTitleG)
    // and other for body of legend bar (legendBodyG). The title 

    const legendTitleG = selection.selectAll('.legendTitle').data([null]);
    legendTitleG.enter()
      .append('g')
      .attr("class", "legendTitle")
      .append('text')
      .text("Assets in Rs.");

    const legendBodyG = selection.selectAll('.legendBody').data([null]);
    const legendBodyGSelection = legendBodyG.enter()
      .append('g')
      .attr('transform', `translate(0, ${spacing / 2})`)
      .attr("class", "legendBody")
      .merge(legendBodyG);

    // Add elements in legend body
    const groups = legendBodyGSelection.selectAll('.tick').data(colorValues);

    // Create one group for each color
    const groupsEnter = groups.enter().append('g').attr('class', 'tick');

    // Append/Update the label/color groups
    groupsEnter
      .merge(groups)
      .attr('transform', (d, i) => `translate(0, ${i * spacing})`)
      .attr('opacity', d => {
        return ((!selectedColorValue || d === selectedColorValue) || selectedConstituency)
          ? 1
          : 0.2
      })
      .on('click', d => onColorClick(
        d === selectedColorValue
          ? null
          : d
      ));

    groups.exit().remove();

    // Add the tiles
    groupsEnter.append('rect')
      .merge(groups.select('rect'))
      .attr('fill', (d, i) => colorValues[i])
      .attr('width', rectSize)
      .attr('height', rectSize);

    // Add the text
    groupsEnter.append('text')
      .merge(groups.select('text'))
      .text((d, i) => colorLabels[i])
      .attr('dy', '1.2em')
      .attr('x', textOffset);
  };

  const getSvg = () => {
    // Select the root svg element
    const svg = d3.select("svg");
    return svg;

  };

  const getSvgDimensions = () => {
    // Get height of root svg element
    const svg = getSvg();

    const width = +svg.attr("width");
    const height = +svg.attr("height");

    return { width: width, height: height };
  };

  console.log(`${getSvgDimensions()}`);

  //Set map and projection
  const projection = d3.geoMercator().scale(1200)
    .center([82.5, 23])
    // .center([78, 20])
    .translate([getSvgDimensions().width / 2, getSvgDimensions().height / 2]);

  const pathGenerator = d3.geoPath().projection(projection);

  // function returning hover text
  const hoverText = (d) => {
    if (d.properties.Assets_num) {
      return ('Constituency: '
        + d.properties.PC_NAME_x
        + '\n'
        + 'MP: '
        + d.properties.Candidate
        + '\n' + 'Assets(Rs.): '
        + d3.format(",.2r")(d.properties.Assets_num)
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
  };

  // function returning constituency color
  const constituencyColor = (d, colorScale) => {
    // console.log('constituencyColor called')
    if (!d.properties.Assets_num) { return "black" }
    return colorScale(d.properties.Assets_num);
  };

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
  };

  // Draw the map from constituencyG passed as 'selection'
  const choroplethMap = (selection, props) => {
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
  };

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

        'Assets(Rs.): ' + d3.format(",.2r")(arrItem[0].properties.Assets_num),

        'Party: ' + arrItem[0].properties.Party
      ])
    }
    else if (selectedColorValue) {
      return ['you clicked on the legend bar'];
    }
    else return ['This should not be displayed'];

  };

  // Create infoPanel
  const infoPanel = (selection, props) => {
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

  };

  // console.log(`Width: ${document.body.clientWidth}`);
  // console.log(`Height: ${document.body.clientHeight}`);

  // const height = document.body.clientHeight;
  // const width = document.body.clientWidth;

  // console.log({height, width});
  // console.log({rem, em})

  // Set domensions of root svg
  const mainCanvas = d3.select("svg");
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
  const colorScale = d3.scaleThreshold();

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
  };

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

  }; // End of render()

}(d3));
//# sourceMappingURL=bundle.js.map

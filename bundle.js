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
      onClick,
      selectedColorValue //currently selected value of color
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

    // console.log('Selected Value: ' + selectedColorValue);

    // Append/Update the label/color groups
    groupsEnter
      .merge(groups)
      .attr('transform', (d, i) => `translate(0, ${i * spacing})`)
      .attr('opacity', d => {
        // console.log(`d: ${d} v: ${selectedColorValue}`);
        return (!selectedColorValue || d === selectedColorValue)
          ? 1
          : 0.2
      })
      .on('click', d => onClick(
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

  //Set map and projection
  const projection = d3.geoMercator().scale(1200)
    .center([82.5, 23])
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
        + d3.format(",.2r")(d.properties.Assets_num));
    }
    else { return ('Constituency: ' + d.properties.PC_NAME_x + '\n' + 'MP: ' + 'No data' + '\n' + 'Assets(Rs.): ' + 'No data') }
  };

  // function returning constituency color
  const constituencyColor = (d, colorScale) => {
    if (!d.properties.Assets_num) { return "black" }
    return colorScale(d.properties.Assets_num);
  };

  // Draw the map from constituencyG passed as 'selection'
  const choroplethMap = (selection, props) => {
    // console.log('choroplethMap called');

    const {
      features,
      colorScale,
      selectedColorValue
    } = props;


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
      .merge(constituencyPaths)
      .attr('opacity', d =>
        (!selectedColorValue || selectedColorValue === colorScale(d.properties.Assets_num))
          ? 1
          : 0.2
      )
      .classed('highlighted', d =>
        (selectedColorValue && selectedColorValue === colorScale(d.properties.Assets_num))
      );

  };

  // Select the root svg element
  const mainCanvas = getSvg();
  const mainCanvasDimensions = getSvgDimensions();

  // Constituency group
  const constituencyG = mainCanvas.append('g');

  // Legend group and placed in lower left of svg. 
  // This will appear over constituencyG group
  const colorLegendG = mainCanvas.append('g').attr('transform', `translate(10,500)`);

  // Add border to the main canvas
  var borderPath = mainCanvas.append("rect")
    .attr("x", 0)
    .attr("y", 0)
    .attr("height", mainCanvasDimensions.height)
    .attr("width", mainCanvasDimensions.width)
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

  // Keep track of the selected color in legend bar
  let selectedColorValue;

  // Globally (in the file) accessible feature array
  let features;

  // Update the 
  const onClick = d => {
    // console.log(d); 
    selectedColorValue = d;
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
        selectedColorValue
      });

    // Draw legend bar
    colorLegendG
      .call(colorLegend, {
        colorValues,
        colorLabels,
        rectSize: 30,
        spacing: 30,
        textOffset: 40,
        onClick,
        selectedColorValue
      });

  }; // End of render()

}(d3));
//# sourceMappingURL=bundle.js.map

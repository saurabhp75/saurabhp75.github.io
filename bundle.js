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

    const { colorRange, // Array of colors
      legendLabels, //Tile labels array
      rectSize, // Size of color tile
      spacing, // spacing between color tiles
      textOffset, // spacing between color tiles
      onClick,
      selectedColorValue
    } = props;


    // Get background rectangale dimensions
    const getBgRectangleDimensions = (colorRange, legendLabels, rectSize, textOffset) => {

      // Find longest label
      var longestLabel = legendLabels.reduce(function (a, b) { return a.length > b.length ? a : b; });

      const backgroundRectWidth = rectSize + textOffset + longestLabel.length * 5 + textOffset;

      const backgroundRectHeight = spacing * (colorRange.length + 2);

      return { width: backgroundRectWidth, height: backgroundRectHeight };
    };

    const backgroundRectDimensions = getBgRectangleDimensions(colorRange,
      legendLabels,
      rectSize,
      textOffset);

    // Background of legend bar, single item, special case
    const backgroundRect = selection.selectAll('rect').data([null]);

    // Background of legend
    backgroundRect.enter().append('rect')
      .merge(backgroundRect)
      .attr('x', -rectSize)
      .attr('y', -rectSize)
      .attr('width', backgroundRectDimensions.width)
      .attr('height', backgroundRectDimensions.height)
      .attr('fill', 'black')
      .attr('rx', rectSize)
      .attr('opacity', 0);

    // Invert legend bar
    const colorRangeReverse = colorRange.reverse();
    const legendLabelsReverse = legendLabels.reverse();
    const n = colorRangeReverse.length;

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


    // const groups = selection.selectAll('.tick')
    // Add elements in legend body
    const groups = legendBodyGSelection.selectAll('.tick')
      .data(colorRangeReverse); //Invert color legend

    // Create one group for each color
    const groupsEnter = groups.enter().append('g').attr('class', 'tick');

    // console.log('Selected Value: ' + selectedColorValue)

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
      .attr('fill', (d, i) => colorRangeReverse[i])
      .attr('width', rectSize)
      .attr('height', rectSize);

    // Add the text
    groupsEnter.append('text')
      .merge(groups.select('text'))
      .text((d, i) => legendLabelsReverse[i])
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

  // Select the root svg element
  // const svg = select("svg");
  // Get height of root svg element
  // const width = +svg.attr("width");
  // const height = +svg.attr("height");

  //Set map and projection
  const projection = d3.geoMercator().scale(1200)
                      .center([82.5, 23])
                      .translate([getSvgDimensions().width / 2, getSvgDimensions().height / 2]);

  const pathGenerator = d3.geoPath().projection(projection);

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
      colorScale
    } = props;

  // update selection
    const g = selection.selectAll('g').data([null]);
  // enter selection
    const gEnter = g.enter().append('g');


  const constituencyPaths = selection.selectAll("path").data(features);
  constituencyPaths
    .enter().append("path")
      .attr('class', 'constituency')
    .merge(constituencyPaths)
      // draw each constituencies
      .attr("d", pathGenerator)
    // set color of each constituency
    .attr("fill", d => constituencyColor(d, colorScale));
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

  };

  // Select the root svg element
  // const svg = select("svg");
  const mainCanvas = getSvg();
  const mainCanvasDimensions = getSvgDimensions();

  // Constituency group
  const constituencyG = mainCanvas.append('g');

  // Legend group and placed in lower left of svg
  // This will appear over constituencyG group
  const colorLegendG = mainCanvas.append('g').attr('transform', `translate(10,540)`);

  // Get height of root svg element
  // const width = +svg.attr("width");
  // const height = +svg.attr("height");

  // Add border to root svg
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
  const colorScale = d3.scaleThreshold();


  let selectedColorValue;
  let features;

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

    // const keyArray = feature_array.map(d => {
    //   return d.properties.ST_PC;
    // });

    // console.log('render called')

    const colorDomain = [10000000, 100000000, 1000000000, 2000000000, 5000000000];
    const colorRange = ['#edf8e9', '#c7e9c0', '#a1d99b', '#74c476', '#31a354', '#006d2c'];
    const legendLabels = ["< 1 Crore", "1 - 10 Crore", "10 - 100 Crore", "100 - 200 Crore", "200 - 500 Crore", "> 500 Crore"];

    // Set set domain and range of colorscale for constiruencies
    colorScale.domain(colorDomain).range(colorRange);

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
        colorScale
      });

    // Draw legend bar
    colorLegendG
      .call(colorLegend, {
        colorRange,
        legendLabels,
        rectSize: 20,
        spacing: 20,
        textOffset: 30,
        onClick,
        selectedColorValue
      });

  }; // End of render()

}(d3));
//# sourceMappingURL=bundle.js.map

(function (d3$1) {
  'use strict';

  const loadAndProcessData = () =>
    d3$1.json('https://raw.githubusercontent.com/saurabhp75/saurabhp75.github.io/master/data/merged_pc_map_pok.json')
      .then((topo) => {
        const feature_array = topo.features;
        return feature_array;
      });

  // import { getBgRectangleDimensions } from './miscUtils';

  const colorLegend = (selection, props) => {
    // console.log('colorLegend called');
    const { colorValues, // Array of colors
      colorLabels, //Tile labels array
      labelRectSize, //size of color tiles
      labelSpacing, //spacing between color tiles
      labelTextOffset, //spacing between tile and label text
      onColorClick,
      selectedColorValue, // selected color value
      selectedConstituency // selected constituency
    } = props;
    
    // Add elements in legend body
    const groups = selection.selectAll('.tick').data(colorValues);

    // Create one group for each color
    const groupsEnter = groups.enter().append('g').attr('class', 'tick');

    // Append/Update the label/color groups
    groupsEnter
      .merge(groups)
      .attr('transform', (d, i) => `translate(0, ${i * labelSpacing})`)
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
      .attr('width', labelRectSize)
      .attr('height', labelRectSize);

    // Add the text
    groupsEnter.append('text')
      .merge(groups.select('text'))
      .text((d, i) => colorLabels[i])
      .attr('dy', '1.2em')
      .attr('x', labelTextOffset);
  };

  const getSvg = () => {
    // Select the root svg element
    const svg = d3$1.select("svg");
    return svg;

  };

  const getSvgDimensions = () => {
    // Get height of root svg element
    const svg = getSvg();

    const width = +svg.attr("width");
    const height = +svg.attr("height");

    return { width: width, height: height };
  };

  // Get background rectangale dimensions
  const getBgRectangleDimensions = (colorValues, colorLabels, labelRectSize, labelTextOffset, labelSpacing) => {
    // Find longest label
    const longestLabel = colorLabels.reduce(function (a, b) { return a.length > b.length ? a : b; });
    const backgroundRectWidth = labelRectSize + labelTextOffset + longestLabel.length * 5 + labelTextOffset;
    const backgroundRectHeight = labelSpacing * (colorValues.length + 2);
    return { width: backgroundRectWidth, height: backgroundRectHeight };
  };

  // console.log(`${getSvgDimensions()}`)

  //Set map and projection
  const projection = d3$1.geoMercator().scale(1200)
    .center([82.5, 23])
    .translate([getSvgDimensions().width / 2, getSvgDimensions().height / 2]);

  const pathGenerator = d3$1.geoPath().projection(projection);

  // function returning constituency color
  // const constituencyColor = (d, colorScale) => {
  //   if (!d.properties.Assets_num) { return "black" }
  //   return colorScale(d.properties.Assets_num);
  // }

  const constituencyColor = (d, colorScale, selectedConstituency) => {
    let constColor;

    if (!d.properties.Assets_num) { constColor =  "black";}
    else if (selectedConstituency === d.properties.ST_PC) { constColor = 'yellow';}
    else {constColor = colorScale(d.properties.Assets_num);}

    return constColor;
  };

  // const constituencyOpacity = (d, selectedConstituency, selectedColorValue, colorScale) => {
  //   // If a const. is selected, then make opacity 1
  //   // else if color of const. is equal to selected color, then make opacity 1
  //   // else make opacity 0.2
  //   if (!selectedConstituency && !selectedColorValue) {// Initial state
  //     return 1;
  //   } else if (selectedConstituency && (selectedConstituency === d.properties.ST_PC)) {
  //     return 1;
  //   } else if (selectedColorValue && (selectedColorValue === colorScale(d.properties.Assets_num))) {
  //     return 1;
  //   }
  //   else return 0.2;
  // }

  const constituencyOpacity = (d, selectedConstituency, selectedColorValue, colorScale) => {
    // If a color is selected and constituency color is not equal to selected color,
    // then reduce the opacity
    if (selectedColorValue && (selectedColorValue != colorScale(d.properties.Assets_num))) {
      return 0.2;
    }
    else return 1;
  };

  // Draw the map from constituencyG passed as 'selection'
  const choroplethMap = (selection, props) => {
    // console.log('choroplethMap called');
    const {
      features,
      colorScale,
      selectedColorValue,
      onConstituencyClick,
      selectedConstituency,
      div
    } = props;

    const constituencyPaths = selection.selectAll("path").data(features, d => d.properties.ST_PC);

    const constituencyPathsEnter = constituencyPaths.enter()
      .append("path")
      .attr('class', 'constituency')
      .attr("d", pathGenerator);
      // .attr("fill", d => constituencyColor(d, colorScale, selectedConstituency));

    // constituencyPathsEnter.append('title').text(hoverText);
    constituencyPathsEnter.merge(constituencyPaths)
      .attr("fill", d => constituencyColor(d, colorScale, selectedConstituency))
      .attr('opacity', d => constituencyOpacity(d, selectedConstituency, selectedColorValue, colorScale))
      .classed('highlighted', d =>
        (selectedColorValue && selectedColorValue === colorScale(d.properties.Assets_num))
      )
      // .classed('selected', d => {
      //   const stpc = d.properties.ST_PC;
      //   console.log({selectedConstituency, stpc});
      //   (selectedConstituency && selectedConstituency === d.properties.ST_PC)

      // })
      .on('click', d => onConstituencyClick(
          d.properties.ST_PC === selectedConstituency
            ? null
            : d.properties.ST_PC
        )
      )
      //Adding mouseevents
      .on("mouseover", (d) => {
        // select(this).transition().duration(300).style("opacity", 1);
        div.transition().duration(300)
          .style("opacity", 0.7);
        div.html(
          "<p><strong>" + d.properties.PC_NAME_x + "</strong></p>" +
          "<table><tbody><tr><td class='wide'>MP in 2014:</td><td>" + d.properties.Candidate + "</td></tr>" +
          "<tr><td>Assets:</td><td>₹" + d3$1.format(",.2r")(d.properties.Assets_num) + "</td></tr>" +
          "<tr><td>Party:</td><td>" + d.properties.Party + "</td></tr>" +        
          "</td></tr></tbody></table>"
        )
          .style("left", (event.pageX) + "px")
          .style("top", (event.pageY - 30) + "px");
      })
      .on("mouseout", function () {
        // d3.select(this)
        //   .transition().duration(300)
        //   .style("opacity", 0.8);
        div.transition().duration(300)
          .style("opacity", 0);
      });
  };

  // Create data rows for infoPanel
  const getInfoPanelData = (selectedConstituency, selectedColorValue, features, colorValues, colorLabels) => {
    // console.log('getInfoPanelData called');
    if (!selectedConstituency && !selectedColorValue) {
      return ['Click on legend bar or constituency'];
    }
    else if (selectedConstituency) {

      const arrItem = features.filter(d => d.properties.ST_PC === selectedConstituency);

      const constituency = arrItem[0].properties.PC_NAME_x;
      // const constCapitalized = constituency.charAt(0).toUpperCase() + constituency.slice(1).toLowerCase();

      const candidate = arrItem[0].properties.Candidate ? arrItem[0].properties.Candidate : "No data";
      const party = arrItem[0].properties.Party ? arrItem[0].properties.Party : "No data";
      const assets = arrItem[0].properties.Assets_num ? arrItem[0].properties.Assets_num : "No data";

      // console.log({constituency, candidate, party, assets});

      return ([

        'Constituency: ' + constituency,

        'MP: ' + candidate,

        'Assets(Rs.): ' + d3$1.format(",.2r")(assets),

        'Party: ' + party
      ])
    }
    else if (selectedColorValue) {
      const assetsTextIndex = colorValues.indexOf(selectedColorValue);
      
      return [`MP(s) with assets:  ${colorLabels[assetsTextIndex]}`];
    }
    else return ['This should not be displayed'];

  };

  // Create infoPanel
  const infoPanel = (selection, props) => {
    // console.log('infoPanel called');
    const {
      selectedConstituency,
      selectedColorValue,
      features,
      colorValues,
      colorLabels
    } = props;

    // Get the data to display on panel
    const textData = getInfoPanelData(selectedConstituency, selectedColorValue, features, colorValues, colorLabels);

     // remove all existing text
    selection.selectAll('tspan').remove();

    // Data join: tspan<=>textData
    const textRows = selection.selectAll('tspan').data(textData);

    textRows
      .enter()
      .append('tspan')
      .attr('x', '0')
      .attr('dy', '1.5rem')
      .text((d) => d);  

  };

  const div = d3.select("body").append("div")
    .attr("class", "tooltip")
    .style("opacity", 0);

  // Set domensions of root svg
  const mainCanvas = d3$1.select("svg");

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
  mainCanvas.call(d3$1.zoom().on('zoom', () => {
    constituencyG.attr('transform', d3$1.event.transform);
    div.attr('transform', d3$1.event.transform);
    
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
  const colorScale = d3$1.scaleThreshold();

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

  // On click, legend bar
  const onColorClick = d => {
    // console.log(d);
    // If constituency is selected, deselect it
    if (selectedConstituency) {
      selectedConstituency = null;
    }
    selectedColorValue = d;
    render();
  };

  // On click, constituency
  const onConstituencyClick = d => {
    // console.log(`const clicked: ${d}`);
    // // If color is selected, deselect it
    if (selectedColorValue) {
      selectedColorValue = null;
    }
    selectedConstituency = d;
    render();
  };

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

  // Append two groups to legend group, one for title (legendTitleG)
  // and other for body of legend bar (legendBodyG).
  const legendTitleG = colorLegendG.selectAll('.legendTitle').data([null]);
  legendTitleG.enter()
    .append('g')
    .attr("class", "legendTitle")
    .append('text')
    .text("Assets(Rs.)");

  const legendBodyG = colorLegendG.selectAll('.legendBody').data([null]);
  const legendBodyGSelection = legendBodyG.enter()
    .append('g')
    .attr('transform', `translate(0, ${labelSpacing / 2})`)
    .attr("class", "legendBody")
    .merge(legendBodyG);


  const render = () => {
    // console.log('render called')

    // Draw map
    constituencyG
      .call(choroplethMap, {
        features,
        colorScale,
        selectedColorValue,
        onConstituencyClick,
        selectedConstituency,
        div
      });

    // Draw legend bar
    legendBodyGSelection
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

  }; // End of render()

}(d3));
//# sourceMappingURL=bundle.js.map

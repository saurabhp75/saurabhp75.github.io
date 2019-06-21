export const colorLegend = (selection, props) => {


  // console.log('colorLegend called');

  const { colorValues, // Array of colors
    colorLabels, //Tile labels array
    rectSize, // Size of color tile
    spacing, // spacing between color tiles
    textOffset, // spacing between color tiles
    onClick,
    selectedColorValue
  } = props;

  // console.log(`colorValues: ${colorValues}`);
  // console.log(`colorLabels: ${colorLabels}`)


  // // Get background rectangale dimensions
  // const getBgRectangleDimensions = (colorRange, legendLabels, rectSize, textOffset) => {

  //   // Find longest label
  //   var longestLabel = legendLabels.reduce(function (a, b) { return a.length > b.length ? a : b; });

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

  // Invert legend bar
  // const colorRangeReverse = colorRange.reverse();
  // const legendLabelsReverse = legendLabels.reverse();
  // const n = colorRange.length;

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
  const groups = legendBodyGSelection.selectAll('.tick').data(colorValues); 

  // Create one group for each color
  const groupsEnter = groups.enter().append('g').attr('class', 'tick');

  console.log('Selected Value: ' + selectedColorValue);

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
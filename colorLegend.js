export const colorLegend = (selection, props) => {

  // console.log('colorLegend called');

  const { colorValues, // Array of colors
    colorLabels, //Tile labels array
    rectSize, // Size of color tile
    spacing, // spacing between color tiles
    textOffset, // spacing between color tiles
    onColorClick,
    selectedColorValue, // selected color value
    selectedConstituency // selected constituency
  } = props;

  
  ///////////////////////////////////////////////////////
  ///// Add background rectangle to the color legend ////
  ///////////////////////////////////////////////////////
  
  // Get background rectangale dimensions
  const getBgRectangleDimensions = (colorValues, colorLabels, rectSize, textOffset) => {
    // Find longest label
    const longestLabel = colorLabels.reduce(function (a, b) { return a.length > b.length ? a : b; });
    const backgroundRectWidth = rectSize + textOffset + longestLabel.length * 5 + textOffset;
    const backgroundRectHeight = spacing * (colorValues.length + 2);
    return { width: backgroundRectWidth, height: backgroundRectHeight };
  }

  const backgroundRectDimensions = getBgRectangleDimensions(colorValues,
    colorLabels,
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
    .attr('fill', 'red')
    .attr('rx', rectSize)
    .attr('stroke', 'black')
    .attr('stroke-width', 1)
    .attr('opacity', 0.3);

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
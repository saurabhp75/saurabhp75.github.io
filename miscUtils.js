import {
  select
} from 'd3';


export const getSvg = () => {
  // Select the root svg element
  const svg = select("svg");
  return svg;

}

export const getSvgDimensions = () => {
  // Get height of root svg element
  const svg = getSvg();

  const width = +svg.attr("width");
  const height = +svg.attr("height");

  return { width: width, height: height };
}

// Get background rectangale dimensions
export const getBgRectangleDimensions = (colorValues, colorLabels, labelRectSize, labelTextOffset, labelSpacing) => {
  // Find longest label
  const longestLabel = colorLabels.reduce(function (a, b) { return a.length > b.length ? a : b; });
  const backgroundRectWidth = labelRectSize + labelTextOffset + longestLabel.length * 5 + labelTextOffset;
  const backgroundRectHeight = labelSpacing * (colorValues.length + 2);
  return { width: backgroundRectWidth, height: backgroundRectHeight };
};

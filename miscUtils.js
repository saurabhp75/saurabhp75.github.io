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

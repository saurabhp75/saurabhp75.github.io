import { json } from 'd3';

export const loadAndProcessData = () =>
  json('https://raw.githubusercontent.com/saurabhp75/saurabhp75.github.io/master/data/merged_pc_map_trim.json')
    .then((topo) => {
      const feature_array = topo.features;
      return feature_array;
    });
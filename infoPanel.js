const infoPanelText = (selectedConstituency, selectedColorValue, features) => {
  if (!selectedConstituency && !selectedColorValue) {
    return 'Make a selection by clicking legend bar or constituency';
  }
  else if (selectedConstituency) {
    return selectedConstituency.split(':')[1];
  }
  else if(selectedColorValue) {
    return 'you clicked on the legend bar';
  }
  else return 'This should not be displayed';
}

export const infoPanel = (selection, props) => {
    console.log('infoPanel called');

    const { 
      selectedConstituency,
      selectedColorValue,
      features
    } = props;

    const selectionUpdate = selection.selectAll('g').data([null]);

    // remove existing group
    // selectionUpdate.remove();

    // remove existing text
    // selecti/onUpdate.remove();

    selectionUpdate.enter().append('g')
    .merge(selectionUpdate)
    .text(d => infoPanelText(selectedConstituency, selectedColorValue, features));

  }
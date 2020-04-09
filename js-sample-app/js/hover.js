/*
  Handle hover events on the map
*/

function initHover(featureWidget, layer, promiseUtils){
  const view = featureWidget.view;
  const layerView = view.layerViews.find(lV => 
    lV.layer === layer
  );

  let objectId = null;
  let highlight = null;

  const updateUiForGraphic = (graphic, event) => {
    const container = featureWidget.container;
    if(highlight){
      highlight.remove();
    }
    if (graphic && event) {
      const { x, y } = event;
      container.classList.remove('removed');
      container.style.top = `${y - 85}px`;
      container.style.left = `${x - 175/2}px`;
      highlight = layerView.highlight(graphic);
      featureWidget.graphic = graphic;
    } else {
      container.classList.add('removed');
    }
  }

  const debouncedUpdate = promiseUtils.debounce(async event => {
    const hit = await view.hitTest(event);
    const lyrResults = hit.results.filter(r => 
      r.graphic.layer === layer
    );
    if(!lyrResults.length){
      updateUiForGraphic(null, event);
      objectId = null;
      return;
    }
    const fOid = layer.objectIdField;
    const newGraphic = lyrResults[0].graphic;
    const newObjectId = newGraphic.attributes[fOid];
    if(objectId !== newObjectId){
      objectId = newObjectId;
      updateUiForGraphic(newGraphic, event);
    }
    return newGraphic;
  });

  // TODO change event based on if mobile / desktop?
  const moveListener = view.on("pointer-move", event =>
    debouncedUpdate(event).catch(err => {
      if(!promiseUtils.isAbortError(err)) {
        throw err;
      }
    })
  );
  
  const leaveListener = view.on("pointer-leave", event => 
    updateUiForGraphic(null, event)
  );

  // update functions
  return {
    destroyHover: _ => {
      moveListener.remove();
      leaveListener.remove();
    },
    updateHover: (graphic, event) => updateUiForGraphic(graphic, event)
  }

}

export {
  initHover
}
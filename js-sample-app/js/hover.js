/*
  Copyright 2020 Esri

  Licensed under the Apache License, Version 2.0 (the "License"); You
  may not use this file except in compliance with the License. You may
  obtain a copy of the License at
  http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software
  distributed under the License is distributed on an "AS IS" BASIS,
  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or
  implied. See the License for the specific language governing
  permissions and limitations under the License.

  A copy of the license is available in the repository's
  LICENSE file.
*/

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
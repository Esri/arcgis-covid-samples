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

// since this is imported as a module in the HTML, we can use modern import syntax
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules
import { layerUrl, defaultSliderValues, defaultQueryAttribute, defaultFeatureLayerOutfields, vectorTileLayerID } from './config.js';
import { initHover } from './hover.js';
import { initChart } from './chart.js';
import { initSlider } from './slider.js';
import { renderer, labelingInfo } from './renderer.js';
import { filterEffect } from './filterEffect.js';
import { updateChart } from './chartQuery.js';

// get started by loading relevant Esri files
require([
  // mapping
  "esri/Map",
  "esri/views/MapView",
  "esri/Basemap",
  "esri/layers/FeatureLayer",
  "esri/layers/VectorTileLayer",
  // widgets
  "esri/widgets/Search",
  "esri/widgets/Feature",
  "esri/widgets/Slider", 
  "esri/widgets/Expand",
  "esri/widgets/Legend",
  // utils
  "esri/core/promiseUtils",
  "esri/core/watchUtils"], (
    // mapping
    Map,
    MapView,
    Basemap,
    FeatureLayer,
    VectorTileLayer,
    // widgets
    Search,
    Feature,
    Slider,
    Expand,
    Legend,
    // utils
    promiseUtils,
    watchUtils
  ) => {

    let analysisSlider, checkbox;

    /****************************************************
      * Initialize the map
    ****************************************************/
    const featureLayer = new FeatureLayer({
      url: layerUrl,
      outFields: defaultFeatureLayerOutfields,
      popupTemplate: {
        title: "{county_name}",
        content: "Unacast's grade is {grade_total}"
      },
      definitionExpression: `"grade_total" IS NOT NULL`,
      popupEnabled: false,
      renderer: renderer,
      labelingInfo: labelingInfo,
      title: "Unacast social distancing"
    });

    const basemap = new Basemap({
      baseLayers: [
        new VectorTileLayer({
          portalItem: {
            id: vectorTileLayerID // OSM gray vector basemap
          }
        })
      ]
    });

    let map = new Map({
      basemap,
      layers: [featureLayer]
    });    

    const view = new MapView({
      container: "viewDiv",
      map: map,
      zoom: 4,
      center: [-95, 40] // US    
    });

    /****************************************************
      * Define the UI
    ****************************************************/
    const panelEl = document.querySelector("#sidePanel");
    panelEl.classList.remove("removed");
    view.ui.add(panelEl, "top-left");   

    const search = new Search({
      view
    });
    const expandSearch = new Expand({
      view,
      content: search,
      expandIconClass: 'esri-icon-search'
    });
    view.ui.add(expandSearch, 'top-right');
    view.ui.move('zoom', 'top-right');

    const legend = new Legend({
      view
    });
    const expandLegend = new Expand({
      view,
      content: legend,
      expandIconClass: 'esri-icon-layer-list',
      expanded: true
    })
    view.ui.add(expandLegend, 'bottom-right');

    const hoverEl = document.querySelector("#hoverPanel");
    const featureWidget = new Feature({ view, container: hoverEl })

    // relevant dom elements
    const distributeChart = document.getElementById("distribution-chart");    
    let chart = initChart(distributeChart, [
      "A",
      "B",
      "C",
      "D",
      "F"
    ], []); 

    const sliderEl = document.getElementById("filterSlider");
    analysisSlider = initSlider(sliderEl, Slider);
    checkbox = document.getElementById("filterCheckbox");

    /****************************************************
      * Initialize DOM elements
    ****************************************************/

    view.whenLayerView(featureLayer).then(layerView => { 
      
      // Create chart using initial values once the layerView has finished loading
      watchUtils.whenNotOnce(layerView, "updating")
        .then(async _ => {      
          updateChart(analysisSlider.values, view, chart, featureLayer, defaultQueryAttribute, promiseUtils);             
          const { updateHover } = initHover(featureWidget, featureLayer, promiseUtils);
          initEventListeners(layerView, updateHover);                            
        });        
    });       

    /****************************************************
      * Initialize the listeners
    ****************************************************/

    const initEventListeners = (layerView, updateHover) => {

      // Listen for slider changes and then update filter/effect + chart
      analysisSlider.on(["thumb-drag"], (e) => {
        if (e.state === "drag" || e.state === "stop") {
          filterEffect(analysisSlider.values, view, featureLayer, defaultQueryAttribute, promiseUtils);
          updateChart(analysisSlider.values, view, chart, featureLayer, defaultQueryAttribute, promiseUtils);
        }
      });    

      // Don't let popup show when hovering over the main panel element
      panelEl.onmouseover = () => {
        updateHover(null, null);
      }       

      // Extent change handler
      watchUtils.whenTrue(view, 'stationary', async _ => {
        await watchUtils.whenFalseOnce(layerView, 'updating');
        updateChart([-100, 20], view, chart, featureLayer, defaultQueryAttribute, promiseUtils);
      });     
      
      // Future functionality when you click on a chart element
      distributeChart.onclick = (e) => {
        const element = chart.getElementAtEvent(e);
      }         
      
      // Update filter/effect and chart based on whether or not checkbox is selected
      checkbox.addEventListener("change", () => {
        if (!checkbox.checked) {
          analysisSlider.disabled = true;
          layerView.effect = {}; // remove filter and effect from map     
        }
        else {
          analysisSlider.disabled = false;
          filterEffect(analysisSlider.values, view, featureLayer, defaultQueryAttribute, promiseUtils);
        }
        updateChart(analysisSlider.values, view, chart, featureLayer, defaultQueryAttribute, promiseUtils);
      });      
    }
  });
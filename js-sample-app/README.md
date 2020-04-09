# JS Sample App
> This app showcases a couple useful (and cool) client-side capabilities in the context of exploring [Unacast's Social Distancing Score](https://www.arcgis.com/home/item.html?id=ab72fb3e9bf24d9594f0b942718bffeb)

## Get started

1. Clone the repository, ex `$ git clone <URL>`
2. Navigate to the directory, ex `$ cd /path`
3. Run your favorite static server, ex `$ serve`

## Structure

* `index.html`: lays out the app
* `covid.css`: defines the styles
* `app.js`: houses the main logic and imports other `.js` as [modules](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules)
* other: functions to add interactivity, orchestrated through `app.js`

## Capabilities

* Data-driven styling ([Guide](https://developers.arcgis.com/javascript/latest/guide/visualization-overview/)): represent the spatial data based on its attributes to create visually useful (and stunning) maps.
* Client-side queries ([API](https://developers.arcgis.com/javascript/latest/api-reference/esri-views-layers-FeatureLayerView.html#queryFeatures)): spatial, SQL, and statistical queries against a cache of rendered features in the browser. This allows for really fast interactions, such as creating the charts as the user interacts with the map or applies filters.
* Feature effects ([API](https://developers.arcgis.com/javascript/latest/api-reference/esri-views-layers-support-FeatureEffect.html)): CSS filters applied to selected data defined by a SQL or spatial filter. This creates a nice, fast effect to emphasize certain data on the map.

## Dependencies

* [chart.js](https://www.chartjs.org/) -- an amazing charting library, [MIT license](https://www.chartjs.org/docs/latest/notes/license.html)
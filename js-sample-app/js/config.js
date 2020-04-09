const layerUrl = "https://services.arcgis.com/DO4gTjwJVIJ7O9Ca/ArcGIS/rest/services/Unacast_Latest_Available__Visitation_and_Distance_/FeatureServer/0";
const vectorTileLayerID = "1932e7d4432d45dabc0d4d13109c1f09"; // ArcGIS Online Portal ID
const defaultSliderValues = [-100,40]; // min, max
const defaultQueryAttribute = "daily_distance_diff"; // attribute from feature service
const defaultFeatureLayerOutfields = ["state_name", "county_name", "county_population", "daily_distance_diff", "daily_visitation_diff", "n_grade_total", "grade_total"];
const defaultChartBarColors = ["#004da8", "#73b2ff", "#ffebaf", "#ffaa00", "#ff3b00"]; // one color for each bar in the chart.

export {
  layerUrl, defaultSliderValues, defaultQueryAttribute, defaultFeatureLayerOutfields, vectorTileLayerID, defaultChartBarColors
}
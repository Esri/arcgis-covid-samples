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

const layerUrl = "https://services.arcgis.com/DO4gTjwJVIJ7O9Ca/ArcGIS/rest/services/Unacast_Latest_Available__Visitation_and_Distance_/FeatureServer/0";
const locatorUrl = "https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer";
const vectorTileLayerID = "1932e7d4432d45dabc0d4d13109c1f09"; // ArcGIS Online Portal ID
const defaultSliderValues = [-100,70]; // min, max
const defaultQueryAttribute = "daily_distance_diff"; // attribute from feature service
const defaultFeatureLayerOutfields = ["state_name", "county_name", "county_population", "daily_distance_diff", "daily_visitation_diff", "grade_total","grade_distance"];
const defaultChartBarColors = ["#004da8", "#73b2ff", "#ffebaf", "#ffaa00", "#ff3b00"]; // one color for each bar in the chart.

export {
  layerUrl, locatorUrl, defaultSliderValues, defaultQueryAttribute, defaultFeatureLayerOutfields, vectorTileLayerID, defaultChartBarColors
}
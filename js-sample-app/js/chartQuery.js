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

// simple query that returns all features in the visible extent based on a where clause
const chartQuery = (layerView, whereClause) => {
  const query = {
    where: whereClause
  }
  return layerView.queryFeatures(query);
}

// Update the chart using slider values as inputs into a query
const updateChart = (sliderThumbValue, view, chart, featureLayer, attribute, promiseUtils) => {
  console.log(sliderThumbValue);
  const debounce = promiseUtils.debounce(async (sliderThumbValue) => {
    const layerView = await view.whenLayerView(featureLayer);
    const whereClause = attribute + "<'" + (sliderThumbValue[1] / 100) + "' AND " + attribute + ">'" + (sliderThumbValue[0] / 100) + "'";
    const query = {
      where: whereClause,
    }
    const results = await layerView.queryFeatures(query);
    const stats = calculateStats(results);
    chart.data.datasets[0].data = stats;
    await chart.update();
    return results        
  });

  return debounce(sliderThumbValue); 
}

// Calculate the number of times each grade appears in the feature result array
// Represents trend Rank: [1, 2, 3, 4, 5]
const calculateStats = (results /* Array */) => { // features array

  const count_a = results.features.reduce((n, val) => {
    return n + (val.attributes.grade_distance === "A");
  }, 0);
  const count_a_minus = results.features.reduce((n, val) => {
    return n + (val.attributes.grade_distance === "A-");
  }, 0);
  const count_b = results.features.reduce((n, val) => {
    return n + (val.attributes.grade_distance === "B");
  }, 0);
  const count_b_plus = results.features.reduce((n, val) => {
    return n + (val.attributes.grade_distance === "B+");
  }, 0);
  const count_b_minus = results.features.reduce((n, val) => {
    return n + (val.attributes.grade_distance === "B-");
  }, 0);
  const count_c = results.features.reduce((n, val) => {
    return n + (val.attributes.grade_distance === "C");
  }, 0);
  const count_c_plus = results.features.reduce((n, val) => {
    return n + (val.attributes.grade_distance === "C+");
  }, 0);
  const count_c_minus = results.features.reduce((n, val) => {
    return n + (val.attributes.grade_distance === "C-");
  }, 0);
  const count_d = results.features.reduce((n, val) => {
    return n + (val.attributes.grade_distance === "D");
  }, 0);
  const count_d_plus = results.features.reduce((n, val) => {
    return n + (val.attributes.grade_distance === "D+");
  }, 0);
  const count_d_minus = results.features.reduce((n, val) => {
    return n + (val.attributes.grade_distance === "D-");
  }, 0);
  const count_f = results.features.reduce((n, val) => {
    return n + (val.attributes.grade_distance === "F");
  }, 0);

  return [
    count_a + count_a_minus,
    count_b + count_b_minus + count_b_plus,
    count_c + count_c_minus + count_c_plus,
    count_d + count_d_minus + count_d_plus,
    count_f
  ]
}

const calculateGradeColor = (grade) => {
  let color;
  switch (grade) {
    case "A": // A
      color = "#004da8";
      break;
    case "A-": // A-
      color = "#004da8";
      break;
    case "B": // B
      color = "#73b2ff";
      break;
    case "B-": // B-
      color = "#73b2ff";
      break;
    case "C": // C
      color = "#ffebaf";
      break;
    case "C-": // C-
      color = "#ffebaf";
      break;
    case "D": // D
      color = "#ffaa00";
      break;
    case "D-": // D-
      color = "#ffaa00";
      break;
    case "F": // F
      color = "#ff3b00";
      break;
  }
  return color;
}

export {
  chartQuery, calculateStats, updateChart
}
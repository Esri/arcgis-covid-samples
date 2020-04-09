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
  Create a chart using https://www.chartjs.org/docs/latest/. 
  Chart.js MIT license: https://www.chartjs.org/docs/latest/notes/license.html. 
*/

import { defaultChartBarColors} from './config.js';

const initChart = (chartCanvas, labels, data) => {
  Chart.defaults.global.defaultFontFamily = '"Avenir Next W00", "Helvetica Neue", Helvetica, Arial, sans- serif',
  Chart.defaults.global.defaultFontSize = 14;
  Chart.defaults.global.defaultFontColor = "#5b5d5e";     
  Chart.defaults.global.tooltips.enabled = false;

  return new Chart(chartCanvas.getContext("2d"), {
    type: "horizontalBar",
    data: {
      labels: labels, // array
      datasets: [
        {
          label: "Daily Distance",
          backgroundColor: defaultChartBarColors,
          stack: "Stack 0",
          data: data
        }
      ]
    },
    options: {
      responsive: false,
      legend: {
        display: false
      },
      scales: {
        xAxes: [
          {
            stacked: true,
            ticks: {
              beginAtZero: true,
              precision: 0
            }
          }
        ],
        yAxes: [
          {
            stacked: true
          }
        ]
      }
    }
  });  
}

export { initChart }  
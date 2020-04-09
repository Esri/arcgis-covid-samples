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
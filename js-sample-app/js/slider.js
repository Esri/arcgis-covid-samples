import { defaultSliderValues } from './config.js';

const initSlider = (sliderEl, Slider) => {
  return new Slider({
    container: sliderEl,
    min: defaultSliderValues[0],
    max: defaultSliderValues[1],
    steps: 10,
    values: defaultSliderValues,
    visibleElements: {
      rangeLabels: true,
      // labels: true
    },
    labelFormatFunction: (value, type) => { 
      let n;
      value == defaultSliderValues[0] ? n = "A" : n = "F";
      return n;
    }
  }); 
}

export {
  initSlider
}
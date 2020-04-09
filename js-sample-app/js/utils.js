
const calculateAverage = (results, attributeName) => {
  return results.features.reduce((accumulator, currentValue) => accumulator + (currentValue.attributes[attributeName] * 100), 0) / results.features.length;
}

export {
  calculateAverage
}
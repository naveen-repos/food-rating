const { sum, divide } = require('ramda');
const computeAverageRating = (arr) => {
  let totalCount = arr.length;
  if (totalCount === 0) {
    return 0;
  }
  let totalRating = sum(arr);
  if (totalRating <= 0) {
    return 0;
  }
  return divide(totalRating, totalCount);
};

module.exports = { computeAverageRating };

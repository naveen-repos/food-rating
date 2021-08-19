const { create } = require('./FIRModelService');
const { rating } = require('./model-paths');

const storeRecipeReview = ({ organizationId, review }) =>
  create(rating({ organizationId }), review);
module.exports = { storeRecipeReview };

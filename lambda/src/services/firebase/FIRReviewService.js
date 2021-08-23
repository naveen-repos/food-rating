const { create } = require('./FIRModelService');
const { review: reviewPath } = require('./model-paths');

const storeRecipeReview = ({ organizationId, review }) =>
  create(reviewPath({ organizationId }), review);

const storeMenuReview = ({ organizationId, review }) =>
  create(reviewPath({ organizationId }), review);

module.exports = { storeRecipeReview, storeMenuReview };

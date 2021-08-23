const { inputValidator } = require('./input');
const { sanitizer } = require('./sanitizer');
const {
  storeRecipeReview,
} = require('../../../services/firebase/FIRReviewService');

module.exports = {
  inputValidator,
  sanitizer,
  authorizationRequired: false,
  fn: async ({
    inputs: { reviews = [] },
    responses: { success },
    organization: { id: organizationId },
  }) => {
    await Promise.all(
      reviews.map((review) =>
        storeRecipeReview({
          organizationId,
          review: { ...review, type: 'item' },
        })
      )
    );
    return success({});
  },
};

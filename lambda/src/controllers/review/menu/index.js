const { inputValidator } = require('./input');
const { sanitizer } = require('./sanitizer');
const {
  storeMenuReview,
} = require('../../../services/firebase/FIRReviewService');

module.exports = {
  inputValidator,
  sanitizer,
  authorizationRequired: true,
  fn: async ({
    inputs: { rating, menuId, sessionId },
    responses: { success },
    organization: { id: organizationId },
  }) => {
    const { data: review } = await storeMenuReview({
      organizationId,
      review: {
        rating,
        menuId,
        sessionId,
        type: 'menu',
        searchId: menuId,
      },
    });
    return success({ data: review });
  },
};

const { inputValidator } = require('./input');
const { sanitizer } = require('./sanitizer');
const {
  storeMenuReview,
} = require('../../../services/firebase/FIRReviewService');

module.exports = {
  inputValidator,
  sanitizer,
  authorizationRequired: false,
  fn: async ({
    inputs: { rating, comment, menuId, sessionId },
    responses: { success },
    organization: { id: organizationId },
  }) => {
    const { data: review } = await storeMenuReview({
      organizationId,
      review: { rating, comment, menuId, sessionId, type: 'menu' },
    });
    return success({ data: review });
  },
};

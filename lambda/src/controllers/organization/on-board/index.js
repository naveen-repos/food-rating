const { inputValidator } = require('./input');
const { sanitizer } = require('./sanitizer');
const {
  organizationOnboarding,
} = require('../../../services/firebase/FIRSessionService');

module.exports = {
  inputValidator,
  sanitizer,
  authorizationRequired: false,
  fn: async ({
    inputs: { sessions },
    responses: { success },
    organization: { id: organizationId },
  }) => {
    await organizationOnboarding({
      sessions,
      organizationId,
    });
    return success({ data: { message: 'sessions added successfully' } });
  },
};

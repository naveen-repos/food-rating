const { inputValidator } = require('./input');
const { sanitizer } = require('./sanitizer');
const { createMenu } = require('../../../services/firebase/FIRMenuService');

module.exports = {
  inputValidator,
  sanitizer,
  authorizationRequired: true,
  fn: async ({
    inputs: { items, day, sessionId },
    responses: { success },
    organization: { id: organizationId },
  }) => {
    const session = await createMenu({
      items,
      day,
      sessionId,
      organizationId,
    });

    return success({ session });
  },
};

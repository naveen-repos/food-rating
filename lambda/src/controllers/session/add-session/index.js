const { inputValidator } = require('./input');
const { sanitizer } = require('./sanitizer');
const {
  createOrganizationSession,
} = require('../../../services/firebase/FIRSessionService');

module.exports = {
  inputValidator,
  sanitizer,
  authorizationRequired: false,
  fn: async ({
    inputs: { name, startTime, image },
    responses: { success },
    organization: { id: organizationId },
  }) => {
    const session = await createOrganizationSession({
      name,
      startTime,
      image,
      organizationId,
    });

    return success({ session });
  },
};

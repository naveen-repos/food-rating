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
    inputs: { name, startTime },
    responses: { success },
    organization: { id: organizationId },
  }) => {
    const { data: session } = await createOrganizationSession({
      name,
      startTime,
      organizationId,
    });

    return success({ data: session });
  },
};

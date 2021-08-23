const { inputValidator } = require('./input');
const { sanitizer } = require('./sanitizer');
const {
  deleteOrganizationSessions,
} = require('../../../services/firebase/FIRSessionService');

module.exports = {
  inputValidator,
  sanitizer,
  authorizationRequired: false,
  fn: async ({
    inputs: { sessionId },
    responses: { success, clientError },
    organization: { id: organizationId },
  }) => {
    const { data: session, message: deleteSessionError } =
      await deleteOrganizationSessions({
        organizationId,
        sessionId,
      });

    if (deleteSessionError) {
      clientError({ message: deleteSessionError });
    }
    return success({ data: session });
  },
};

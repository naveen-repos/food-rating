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
    responses: { success, clientError },
    organization: { id: organizationId },
  }) => {
    const { data: session, message: deleteSessionError } =
      await deleteOrganizationSessions({
        organizationId,
      });

    if (deleteSessionError) {
      clientError({ message: deleteSessionError });
    }
    return success({ data: session });
  },
};

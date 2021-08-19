const { inputValidator } = require('./input');
const { sanitizer } = require('./sanitizer');
const {
  updateOrganizationSession,
} = require('../../../services/firebase/FIRSessionService');

module.exports = {
  inputValidator,
  sanitizer,
  authorizationRequired: false,
  fn: async ({
    inputs: { sessionId, name, startTime, image },
    responses: { success, clientError },
    organization: { id: organizationId },
  }) => {
    const { data: updatedSession, message: updateSessionError } =
      await updateOrganizationSession({
        name,
        startTime,
        image,
        sessionId,
        organizationId,
      });
    if (updateSessionError) {
      clientError({ message: updateSessionError });
    }
    return success({ session: updatedSession });
  },
};

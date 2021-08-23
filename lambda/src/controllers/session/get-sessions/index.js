const { sanitizer } = require('./sanitizer');
const {
  getOrganizationSessions,
} = require('../../../services/firebase/FIRSessionService');

module.exports = {
  sanitizer,
  authorizationRequired: false,
  fn: async ({
    responses: { success },
    organization: { id: organizationId },
  }) => {
    const { data: sessions } = await getOrganizationSessions({
      organizationId,
    });

    return success({ data: sessions });
  },
};

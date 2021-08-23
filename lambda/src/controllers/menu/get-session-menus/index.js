const { sanitizer } = require('./sanitizer');
const {
  getMenusForSession,
} = require('../../../services/firebase/FIRMenuService');

module.exports = {
  sanitizer,
  authorizationRequired: true,
  fn: async ({
    inputs: { sessionId },
    responses: { success },
    organization: { id: organizationId },
  }) => {
    const { data: menus } = await getMenusForSession({
      organizationId,
      sessionId,
    });

    return success({ menus });
  },
};

const { inputValidator } = require('./input');
const { sanitizer } = require('./sanitizer');
const {
  getMenusForSession,
} = require('../../../services/firebase/FIRMenuService');

module.exports = {
  inputValidator,
  sanitizer,
  authorizationRequired: false,
  fn: async ({
    inputs: { sessionId },
    responses: { success },
    organization: { id: organizationId },
  }) => {
    const { data: menus } = await getMenusForSession({
      organizationId,
      sessionId,
    });

    return success({ data: menus });
  },
};

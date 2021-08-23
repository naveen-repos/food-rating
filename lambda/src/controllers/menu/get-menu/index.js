const { inputValidator } = require('./input');
const { sanitizer } = require('./sanitizer');
const { getMenuById } = require('../../../services/firebase/FIRMenuService');

module.exports = {
  inputValidator,
  sanitizer,
  authorizationRequired: false,
  fn: async ({
    inputs: { sessionId, menuId },
    responses: { success, clientError },
    organization: { id: organizationId },
  }) => {
    const { data: menu, message: getMenuError } = await getMenuById({
      sessionId,
      menuId,
      organizationId,
    });

    if (getMenuError) {
      clientError({ message: getMenuError });
    }
    return success({ data: menu });
  },
};

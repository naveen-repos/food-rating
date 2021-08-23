const { inputValidator } = require('./input');
const { sanitizer } = require('./sanitizer');
const { editMenu } = require('../../../services/firebase/FIRMenuService');

module.exports = {
  inputValidator,
  sanitizer,
  authorizationRequired: false,
  fn: async ({
    inputs: { items, day, sessionId, menuId },
    responses: { success, clientError },
    organization: { id: organizationId },
  }) => {
    const { data: updatedMenu, message: updateMenuError } = editMenu({
      sessionId,
      menuId,
      organizationId,
      items,
      day,
    });

    if (updateMenuError) {
      clientError({ message: updateMenuError });
    }
    return success({ data: updatedMenu });
  },
};

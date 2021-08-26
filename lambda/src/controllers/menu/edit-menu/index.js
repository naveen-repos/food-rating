const { inputValidator } = require('./input');
const { sanitizer } = require('./sanitizer');
const {
  editMenu,
  getMenuById,
} = require('../../../services/firebase/FIRMenuService');
const { uniq } = require('ramda');

module.exports = {
  inputValidator,
  sanitizer,
  authorizationRequired: true,
  fn: async ({
    inputs: { items, day, sessionId, menuId },
    responses: { success, clientError },
    organization: { id: organizationId },
  }) => {
    const { message: getMenuError } = await getMenuById({
      sessionId,
      menuId,
      organizationId,
    });
    if (getMenuError) {
      return clientError({ message: getMenuError });
    }
    const { data: updatedMenu, message: updateMenuError } = await editMenu({
      sessionId,
      menuId,
      organizationId,
      items: uniq(items),
      day,
    });

    if (updateMenuError) {
      return clientError({ message: updateMenuError });
    }
    return success({ data: updatedMenu });
  },
};

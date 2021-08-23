const { inputValidator } = require('./input');
const { sanitizer } = require('./sanitizer');
const {
  deleteMenu,
  getMenuById,
} = require('../../../services/firebase/FIRMenuService');

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
      organizationId,
      sessionId,
      menuId,
    });
    if (getMenuError) {
      clientError({ message: getMenuError });
    }
    if (menu.data < Date.now()) {
      clientError({ message: "Sorry You can't delete the past menu." });
    }

    const { data: deletedMenu, message: deleteMenuError } = await deleteMenu({
      sessionId,
      organizationId,
      menuId,
    });
    if (deleteMenuError) {
      clientError({ message: deleteMenuError });
    }

    return success({ menu: deletedMenu });
  },
};

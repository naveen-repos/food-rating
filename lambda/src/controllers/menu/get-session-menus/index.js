const { inputValidator } = require('./input');
const { sanitizer } = require('./sanitizer');
const {
  getMenusForSession,
} = require('../../../services/firebase/FIRMenuService');
const { getItems } = require('../../../services/firebase/FIRItemService');
const { propEq, find, pick } = require('ramda');

module.exports = {
  inputValidator,
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
    const { data: items } = await getItems({ organizationId });
    const menuWithItemNames = menus.map((menu) => {
      const itemData = menu.items.map((itemId) => {
        const item = find(propEq('id', itemId))(items);
        return pick(['id', 'name'], item);
      });
      menu['items'] = itemData;
      return menu;
    });

    return success({ data: menuWithItemNames });
  },
};

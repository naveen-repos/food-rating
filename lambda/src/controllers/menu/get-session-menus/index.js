const { inputValidator } = require('./input');
const { sanitizer } = require('./sanitizer');
const {
  getMenusForSession,
} = require('../../../services/firebase/FIRMenuService');
const { getItems } = require('../../../services/firebase/FIRItemService');
const { propEq, find } = require('ramda');

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
    const { data: items } = await getItems({ organizationId });
    const menusWithItemData = menus.map((menu) => {
      const itemData = menu.items.map((itemId) => {
        const item = find(propEq('id', itemId))(items);
        return {
          itemName: item.name,
        };
      });
      menu['items'] = itemData;
      return menu;
    });

    return success({ data: menusWithItemData });
  },
};

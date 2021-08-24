const { inputValidator } = require('./input');
const { sanitizer } = require('./sanitizer');
const {
  getMenuById,
  getMenuItemRating,
} = require('../../../services/firebase/FIRMenuService');
const { find, propEq } = require('ramda');
const { getItems } = require('../../../services/firebase/FIRItemService');
const {
  getCategories,
} = require('../../../services/firebase/FIRCategoryService');

module.exports = {
  inputValidator,
  sanitizer,
  authorizationRequired: false,
  fn: async ({
    inputs: { sessionId, menuId },
    responses: { success },
    organization: { id: organizationId },
  }) => {
    const { data: menu } = await getMenuById({
      organizationId,
      sessionId,
      menuId,
    });
    const { data: items } = await getItems({ organizationId });
    const { data: categories } = await getCategories({ organizationId });
    const itemRatings = await Promise.all(
      menu.items.map(async (itemId) => {
        const itemOverallRating = await getMenuItemRating({
          sessionId,
          organizationId,
          menuId,
          itemId,
        });
        const item = find(propEq('id', itemId))(items);
        const cat = find(propEq('id', item.categoryId))(categories);
        return {
          overallRating: itemOverallRating,
          itemName: item.name,
          categoryName: cat.name,
        };
      })
    );
    menu['itemRatings'] = itemRatings;
    return success({ data: menu });
  },
};

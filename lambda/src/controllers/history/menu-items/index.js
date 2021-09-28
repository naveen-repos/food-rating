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
const { round } = require('lodash');

module.exports = {
  inputValidator,
  sanitizer,
  authorizationRequired: true,
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
        const { itemOverallRating, count: itemReviewCount } =
          await getMenuItemRating({
            sessionId,
            organizationId,
            menuId,
            itemId,
          });
        const item = find(propEq('id', itemId))(items);
        const cat = find(propEq('id', item.categoryId))(categories);
        return {
          overallRating: round(itemOverallRating),
          itemName: item.name,
          itemId: item.id,
          categoryName: cat.name,
          itemReviewCount,
        };
      })
    );
    menu['itemRatings'] = itemRatings;
    return success({ data: menu });
  },
};

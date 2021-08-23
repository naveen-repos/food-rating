const { sanitizer } = require('./sanitizer');
const {
  getCategories,
} = require('../../../services/firebase/FIRCategoryService');

module.exports = {
  sanitizer,
  authorizationRequired: false,
  fn: async ({
    responses: { success },
    organization: { id: organizationId },
  }) => {
    const { data: categories } = await getCategories({
      organizationId,
    });

    return success({ categories });
  },
};

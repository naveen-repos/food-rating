const { inputValidator } = require('./input');
const { sanitizer } = require('./sanitizer');
const {
  createCategory,
} = require('../../../services/firebase/FIRCategoryService');

module.exports = {
  inputValidator,
  sanitizer,
  authorizationRequired: false,
  fn: async ({
    inputs: { name },
    responses: { success },
    organization: { id: organizationId },
  }) => {
    const category = await createCategory({
      name,
      organizationId,
    });

    return success({ category });
  },
};

const { inputValidator } = require('./input');
const { sanitizer } = require('./sanitizer');
const {
  createCategory,
} = require('../../../services/firebase/FIRCategoryService');

module.exports = {
  inputValidator,
  sanitizer,
  authorizationRequired: true,
  fn: async ({
    inputs: { name },
    responses: { success },
    organization: { id: organizationId },
  }) => {
    const { data: category } = await createCategory({
      name,
      organizationId,
    });
    console.log({ category });
    return success({ data: category });
  },
};

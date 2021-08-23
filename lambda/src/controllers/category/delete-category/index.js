const { inputValidator } = require('./input');
const { sanitizer } = require('./sanitizer');
const {
  deleteCategory,
} = require('../../../services/firebase/FIRCategoryService');

module.exports = {
  inputValidator,
  sanitizer,
  authorizationRequired: false,
  fn: async ({
    inputs: { categoryId },
    responses: { success, clientError },
    organization: { id: organizationId },
  }) => {
    const { message: deleteCategoryError } = await deleteCategory({
      organizationId,
      categoryId,
    });

    if (deleteCategoryError) {
      clientError({ message: deleteCategoryError });
    }
    return success({ data: { message: 'deleted successful' } });
  },
};

const { inputValidator } = require('./input');
const { sanitizer } = require('./sanitizer');
const {
  editCategory,
} = require('../../../services/firebase/FIRCategoryService');

module.exports = {
  inputValidator,
  sanitizer,
  authorizationRequired: true,
  fn: async ({
    inputs: { name, categoryId },
    responses: { success, clientError },
    organization: { id: organizationId },
  }) => {
    const { data: updatedCategory, message: updatedCategoryError } =
      await editCategory({
        name,
        categoryId,
        organizationId,
      });

    if (updatedCategoryError) {
      clientError({ message: updatedCategoryError });
    }

    return success({ category: updatedCategory });
  },
};

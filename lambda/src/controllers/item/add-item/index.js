const { inputValidator } = require('./input');
const { sanitizer } = require('./sanitizer');
const { createItem } = require('../../../services/firebase/FIRItemService');

module.exports = {
  inputValidator,
  sanitizer,
  authorizationRequired: false,
  fn: async ({
    inputs: { name, image, categoryId },
    responses: { success },
    organization: { id: organizationId },
  }) => {
    const item = await createItem({
      name,
      categoryId,
      image,
      organizationId,
    });

    return success({ item });
  },
};

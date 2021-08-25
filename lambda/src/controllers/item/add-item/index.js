const { inputValidator } = require('./input');
const { sanitizer } = require('./sanitizer');
const { createItem } = require('../../../services/firebase/FIRItemService');

module.exports = {
  inputValidator,
  sanitizer,
  authorizationRequired: true,
  fn: async ({
    inputs: { name, categoryId },
    responses: { success },
    organization: { id: organizationId },
  }) => {
    //todo : need to store the image and recurring patters
    const { data: item } = await createItem({
      name,
      categoryId,
      organizationId,
    });

    return success({ data: item });
  },
};

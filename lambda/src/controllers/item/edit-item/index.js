const { inputValidator } = require('./input');
const { sanitizer } = require('./sanitizer');
const { updateItem } = require('../../../services/firebase/FIRItemService');

module.exports = {
  inputValidator,
  sanitizer,
  authorizationRequired: false,
  fn: async ({
    inputs: { itemId, name, categoryId, image },
    responses: { success, clientError },
    organization: { id: organizationId },
  }) => {
    const { data: updatedItem, message: updateItemError } = await updateItem({
      name,
      categoryId,
      image,
      itemId,
      organizationId,
    });

    if (updateItemError) {
      clientError({ message: updateItemError });
    }

    return success({ data: updatedItem });
  },
};

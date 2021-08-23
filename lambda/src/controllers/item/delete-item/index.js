const { inputValidator } = require('./input');
const { sanitizer } = require('./sanitizer');
const { deleteItem } = require('../../../services/firebase/FIRItemService');

module.exports = {
  inputValidator,
  sanitizer,
  authorizationRequired: false,
  fn: async ({
    inputs: { itemId },
    responses: { success, clientError },
    organization: { id: organizationId },
  }) => {
    const { data: item, message: deleteItemError } = await deleteItem({
      organizationId,
      itemId,
    });

    if (deleteItemError) {
      clientError({ message: deleteItemError });
    }
    return success({ data: item });
  },
};

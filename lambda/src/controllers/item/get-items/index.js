const { sanitizer } = require('./sanitizer');
const { getItems } = require('../../../services/firebase/FIRItemService');

module.exports = {
  sanitizer,
  authorizationRequired: false,
  fn: async ({
    responses: { success },
    organization: { id: organizationId },
  }) => {
    const { data: items } = await getItems({
      organizationId,
    });

    return success({ data: items });
  },
};

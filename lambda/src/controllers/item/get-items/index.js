const { sanitizer } = require('./sanitizer');
const { getItems } = require('../../../services/firebase/FIRItemService');

module.exports = {
  sanitizer,
  authorizationRequired: true,
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

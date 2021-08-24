const { sanitizer } = require('./sanitizer');
const {
  getOrganizationById,
} = require('../../../services/firebase/FIROrganizationService');

module.exports = {
  sanitizer,
  authorizationRequired: false,
  fn: async ({
    responses: { success },
    organization: { id: organizationId },
  }) => {
    const { data: organization } = await getOrganizationById(organizationId);

    return success({ data: organization });
  },
};

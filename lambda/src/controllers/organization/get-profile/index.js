const { sanitizer } = require('./sanitizer');
const {
  getOrganizationById,
} = require('../../../services/firebase/FIROrganizationService');

module.exports = {
  sanitizer,
  authorizationRequired: true,
  fn: async ({
    responses: { success },
    organization: { id: organizationId },
  }) => {
    const { data: organization } = await getOrganizationById(organizationId);

    return success({ data: organization });
  },
};

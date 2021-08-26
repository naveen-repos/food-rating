const { inputValidator } = require('./input');
const { sanitizer } = require('./sanitizer');
const {
  addOrganization,
} = require('../../../services/firebase/FIROrganizationService');

module.exports = {
  inputValidator,
  sanitizer,
  authorizationRequired: true,
  fn: async ({
    inputs: { name, adminName, email, type },
    responses: { success },
    organization: { id: organizationId },
  }) => {
    const { data: organization } = await addOrganization({
      organizationId,
      name,
      adminName,
      email,
      type,
    });

    return success({ data: organization });
  },
};

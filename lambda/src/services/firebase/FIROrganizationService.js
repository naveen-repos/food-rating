const { findById, create } = require('./FIRModelService');
const { ORGANIZATION } = require('./model-paths');

const addOrganization = ({ name, adminName, email, type, organizationId }) =>
  create(ORGANIZATION, {
    id: organizationId,
    name,
    adminName,
    email,
    type,
  });

const getOrganizationById = (orgId) => findById(ORGANIZATION, orgId);

module.exports = {
  getOrganizationById,
  addOrganization,
};

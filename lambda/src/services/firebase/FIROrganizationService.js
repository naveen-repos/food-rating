const { findById } = require('./FIRModelService');

const getOrganizationById = (orgId) => findById('organization', orgId);

module.exports = {
  getOrganizationById,
};

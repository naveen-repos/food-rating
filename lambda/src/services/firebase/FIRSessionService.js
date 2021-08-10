const { create } = require('./FIRModelService');
const { session } = require('./model-paths');

const createOrganizationSession = ({
  name,
  startTime,
  image,
  organizationId,
}) => create(session({ organizationId }), { name, startTime, image });

module.exports = {
  createOrganizationSession,
};

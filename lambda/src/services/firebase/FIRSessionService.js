const { values, filter, propEq, pipe } = require('ramda');
const { create, update, fetch } = require('./FIRModelService');
const { session } = require('./model-paths');

const createOrganizationSession = ({ name, startTime, organizationId }) =>
  create(session({ organizationId }), {
    name,
    startTime,
    status: 'ACTIVE',
  });

const updateOrganizationSession = ({
  name,
  startTime,
  image,
  organizationId,
  sessionId,
}) =>
  update(session({ organizationId }), {
    id: sessionId,
    name,
    startTime,
    image,
  });

const parseActiveSessions = pipe(values, filter(propEq('status', 'ACTIVE')));

const getOrganizationSessions = async ({ organizationId }) => {
  const { data: sessions = {} } = await fetch(session({ organizationId }));
  return { data: parseActiveSessions(sessions) };
};

const deleteOrganizationSessions = ({ organizationId, sessionId }) =>
  update(session({ organizationId }), { id: sessionId, status: 'DELETED' });

module.exports = {
  createOrganizationSession,
  updateOrganizationSession,
  getOrganizationSessions,
  deleteOrganizationSessions,
};

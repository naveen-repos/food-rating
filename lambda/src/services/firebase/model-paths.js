module.exports = {
  session: ({ organizationId }) => `sessions/${organizationId}`,
  item: ({ organizationId }) => `items/${organizationId}`,
  ORGANIZATION: 'organization',
  review: ({ organizationId }) => `reviews/${organizationId}`,
  menu: ({ organizationId, sessionId }) =>
    `menus/${organizationId}/${sessionId}`,
  category: ({ organizationId }) => `categories/${organizationId}`,
};

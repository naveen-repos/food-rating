module.exports = {
  session: ({ organizationId }) => `sessions/${organizationId}`,
  item: ({ organizationId }) => `items/${organizationId}`,
  ORGANIZATION: 'organization',
  rating: ({ organizationId }) => `ratings/${organizationId}`,
};

const { sanitizer } = require('./sanitizer');
const {
  getOrganizationSessions,
} = require('../../../services/firebase/FIRSessionService');
// const {
//   getCurrentMenuForSession,
// } = require('../../../services/firebase/FIRMenuService');

module.exports = {
  sanitizer,
  authorizationRequired: false,
  fn: async ({
    responses: { success },
    organization: { id: organizationId },
  }) => {
    const { data: sessions } = await getOrganizationSessions({
      organizationId,
    });
    // const menusWithSessionIds = await Promise.all(
    //   sessions.map(async ({ id: sessionId }) => {
    //     const { data: menu } = await getCurrentMenuForSession({
    //       organizationId,
    //       sessionId,
    //     });
    //     return [sessionId, menu];
    //   })
    // );

    return success({ data: sessions });
  },
};

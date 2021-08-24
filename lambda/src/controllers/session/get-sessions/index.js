const { sanitizer } = require('./sanitizer');
const {
  getOrganizationSessions,
} = require('../../../services/firebase/FIRSessionService');
const {
  getCurrentMenuForSession,
  getMenuOverallRating,
} = require('../../../services/firebase/FIRMenuService');
const { isEmpty } = require('ramda');

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
    const sessionsWithMenus = await Promise.all(
      sessions.map(async (session) => {
        const { data: menu } = await getCurrentMenuForSession({
          organizationId,
          sessionId: session.id,
        });
        let overAllRating = 0;
        if (!isEmpty(menu)) {
          overAllRating = await getMenuOverallRating({
            organizationId,
            menuId: menu.id,
          });
        }
        return { session, menu, overAllRating };
      })
    );

    return success({ data: sessionsWithMenus });
  },
};

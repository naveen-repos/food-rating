const { sanitizer } = require('./sanitizer');
const {
  getOrganizationSessions,
  computeSessionMenuTime,
} = require('../../../services/firebase/FIRSessionService');
const {
  getCurrentMenuForSession,
  getMenuOverallRating,
} = require('../../../services/firebase/FIRMenuService');
const { isEmpty } = require('ramda');

module.exports = {
  sanitizer,
  authorizationRequired: true,
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
        let sessionTime = 0;
        let reviewsCount = 0;
        if (!isEmpty(menu)) {
          const { count: menuRatingsCount, overAllRating: menuOverAllRating } =
            await getMenuOverallRating({
              organizationId,
              menuId: menu.id,
            });
          reviewsCount = menuRatingsCount;
          overAllRating = menuOverAllRating;
          sessionTime = computeSessionMenuTime({ session, menu });
        }
        return { session, menu, overAllRating, sessionTime, reviewsCount };
      })
    );

    return success({ data: sessionsWithMenus });
  },
};

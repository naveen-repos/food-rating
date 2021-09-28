const { sanitizer } = require('./sanitizer');
const {
  getOrganizationSessions,
} = require('../../../services/firebase/FIRSessionService');
const {
  getMenuOverallRating,
  getMenusForSession,
} = require('../../../services/firebase/FIRMenuService');
const { isEmpty, flatten } = require('ramda');
const { round, orderBy } = require('lodash');

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

    const history = await Promise.all(
      sessions.map(async (session) => {
        const { data: menus } = await getMenusForSession({
          organizationId,
          sessionId: session.id,
        });
        return await Promise.all(
          menus.map(async (menu) => {
            let overAllRating = 0;
            let reviewsCount = 0;
            if (!isEmpty(menu)) {
              const {
                count: menuRatingsCount,
                overAllRating: menuOverAllRating,
              } = await getMenuOverallRating({
                organizationId,
                menuId: menu.id,
              });
              reviewsCount = menuRatingsCount;
              overAllRating = round(menuOverAllRating);
            }
            return {
              sessionId: session.id,
              sessionName: session.name,
              menuId: menu.id,
              day: menu.day,
              reviewsCount,
              overAllRating,
            };
          })
        );
      })
    );

    return success({ data: orderBy(flatten(history), 'day', ['desc']) });
  },
};

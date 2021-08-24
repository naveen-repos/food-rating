const { sanitizer } = require('./sanitizer');
const {
  getOrganizationSessions,
} = require('../../../services/firebase/FIRSessionService');
const {
  getMenuOverallRating,
  getMenusForSession,
} = require('../../../services/firebase/FIRMenuService');
const { isEmpty, flatten } = require('ramda');

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

    const history = await Promise.all(
      sessions.map(async (session) => {
        const { data: menus } = await getMenusForSession({
          organizationId,
          sessionId: session.id,
        });
        return await Promise.all(
          menus.map(async (menu) => {
            let overAllRating = 0;
            if (!isEmpty(menu)) {
              overAllRating = await getMenuOverallRating({
                organizationId,
                menuId: menu.id,
              });
            }
            return {
              sessionId: session.id,
              sessionName: session.name,
              menuId: menu.id,
              day: menu.day,
              overAllRating,
            };
          })
        );
      })
    );

    return success({ data: flatten(history) });
  },
};

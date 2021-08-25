const { values, pluck, pipe, reject, isNil } = require('ramda');
const moment = require('moment-timezone');
const {
  create,
  update,
  remove,
  fetch,
  findById,
  findByKeyValues,
} = require('./FIRModelService');
const { menu, review } = require('./model-paths');
const { computeAverageRating } = require('../../utils/helper-utils');

const createMenu = ({ sessionId, organizationId, items, day }) =>
  create(menu({ organizationId, sessionId }), {
    items,
    day,
  });

const editMenu = ({ sessionId, organizationId, menuId, items, day }) =>
  update(menu({ sessionId, organizationId }), { id: menuId, items, day });

const deleteMenu = ({ sessionId, organizationId, menuId }) =>
  remove(menu({ sessionId, organizationId }), menuId);

const getMenusForSession = async ({ sessionId, organizationId }) => {
  const { data: menus } = await fetch(menu({ sessionId, organizationId }));
  return { data: values(menus), message: null };
};

const getMenuById = ({ organizationId, sessionId, menuId }) =>
  findById(menu({ sessionId, organizationId }), menuId);

const getCurrentMenuForSession = async ({ sessionId, organizationId }) => {
  const { data: sessionMenus } = await getMenusForSession({
    sessionId,
    organizationId,
  });
  const todaysMenu = sessionMenus.filter((menu) =>
    moment(menu.day).isSame(moment(), 'day')
  );
  return { data: todaysMenu[0] || {}, message: null };
};

const getMenuOverallRating = async ({ organizationId, menuId }) => {
  const { data: menuReviews } = await findByKeyValues(
    review({ organizationId }),
    {
      key: 'searchId',
      value: menuId,
    }
  );
  const menuRatings = pluck('rating', menuReviews);
  const overAllRating = computeAverageRating(menuRatings);
  return overAllRating;
};

const getMenuItemRating = async ({
  sessionId,
  organizationId,
  menuId,
  itemId,
}) => {
  const { data: itemReviews } = await findByKeyValues(
    review({ organizationId }),
    {
      key: 'searchId',
      value: itemId,
    }
  );

  const menuItemReviews = itemReviews.filter(
    (review) => review.sessionId === sessionId && review.menuId === menuId
  );
  const menuRatings = pipe(pluck('rating'), reject(isNil))(menuItemReviews);
  const overAllRating = computeAverageRating(menuRatings);
  return overAllRating;
};
module.exports = {
  createMenu,
  editMenu,
  deleteMenu,
  getMenusForSession,
  getMenuById,
  getCurrentMenuForSession,
  getMenuOverallRating,
  getMenuItemRating,
};

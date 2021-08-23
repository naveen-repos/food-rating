const { values } = require('ramda');
const {
  create,
  update,
  remove,
  fetch,
  findById,
} = require('./FIRModelService');
const { menu } = require('./model-paths');

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

module.exports = {
  createMenu,
  editMenu,
  deleteMenu,
  getMenusForSession,
  getMenuById,
};

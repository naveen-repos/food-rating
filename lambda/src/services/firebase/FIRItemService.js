const { values } = require('ramda');
const { create, update, fetch } = require('./FIRModelService');
const { item } = require('./model-paths');

const createItem = ({ name, categoryId, organizationId }) =>
  create(item({ organizationId }), {
    name,
    categoryId,
  });

const updateItem = ({ name, image, categoryId, itemId, organizationId }) =>
  update(item({ organizationId }), {
    id: itemId,
    name,
    image,
    categoryId,
  });

const getItems = async ({ organizationId }) => {
  const { data: items = {} } = await fetch(item({ organizationId }));
  //need to deleted items?
  return { data: values(items) };
};

const deleteItem = ({ organizationId, itemId }) =>
  update(item({ organizationId }), { id: itemId, status: 'DELETED' });

module.exports = {
  createItem,
  updateItem,
  getItems,
  deleteItem,
};

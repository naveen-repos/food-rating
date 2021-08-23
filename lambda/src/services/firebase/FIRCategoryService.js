const { values } = require('ramda');
const { create, update, remove, fetch } = require('./FIRModelService');
const { category } = require('./model-paths');

const createCategory = ({ organizationId, items, day }) =>
  create(category({ organizationId }), {
    items,
    day,
  });

const editCategory = ({ organizationId, categoryId, name }) =>
  update(category({ organizationId }), {
    id: categoryId,
    name,
  });

const deleteCategory = ({ organizationId, categoryId }) =>
  remove(category({ organizationId }), categoryId);

const getCategories = async ({ organizationId }) => {
  const { data: categories } = await fetch(category({ organizationId }));
  return { data: values(categories) };
};

module.exports = {
  createCategory,
  editCategory,
  deleteCategory,
  getCategories,
};

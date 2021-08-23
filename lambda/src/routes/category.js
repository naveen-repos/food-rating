const { executeController } = require('../utils/execute-controller');
const addCategory = require('../controllers/category/add-category/index');
const editCategory = require('../controllers/category/edit-category/index');
const getCategories = require('../controllers/category/get-categories/index');
const deleteCategory = require('../controllers/category/delete-category/index');

const router = require('express').Router();

router
  .route('/')
  .post(executeController(addCategory))
  .get(executeController(getCategories));

router
  .route('/:categoryId')
  .put(executeController(editCategory))
  .delete(executeController(deleteCategory));

module.exports = router;

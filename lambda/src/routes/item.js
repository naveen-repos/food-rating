const { executeController } = require('../utils/execute-controller');
const addItem = require('../controllers/item/add-item/index');
const editItem = require('../controllers/item/edit-item/index');
const getItems = require('../controllers/item/get-items/index');
const deleteItem = require('../controllers/item/delete-item/index');

const router = require('express').Router();

router
  .route('/')
  .post(executeController(addItem))
  .get(executeController(getItems));

router
  .route('/:itemId')
  .put(executeController(editItem))
  .delete(executeController(deleteItem));

module.exports = router;

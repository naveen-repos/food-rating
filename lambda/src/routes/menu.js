const { executeController } = require('../utils/execute-controller');
const addMenu = require('../controllers/menu/add-menu/index');
const editMenu = require('../controllers/menu/edit-menu/index');
const getMenu = require('../controllers/menu/get-menu/index');
const deleteMenu = require('../controllers/menu/delete-menu/index');
const getSessionMenus = require('../controllers/menu/get-session-menus/index');

const router = require('express').Router();

router
  .route('/:sessionId')
  .post(executeController(addMenu))
  .get(executeController(getSessionMenus));

router
  .route('/:sessionId/:menuId')
  .put(executeController(editMenu))
  .delete(executeController(deleteMenu))
  .get(executeController(getMenu));

module.exports = router;

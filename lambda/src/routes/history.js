const { executeController } = require('../utils/execute-controller');
const menuHistory = require('../controllers/history/menus');
const menuItemHistory = require('../controllers/history/menu-items/index');

const router = require('express').Router();

router.route('/menu').get(executeController(menuHistory));
router
  .route('/session/:sessionId/menu/:menuId')
  .get(executeController(menuItemHistory));

module.exports = router;

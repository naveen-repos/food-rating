const { executeController } = require('../utils/execute-controller');
const orgSignUp = require('../controllers/organization/sign-up/index');
const getProfile = require('../controllers/organization/get-profile/index');
const onBoard = require('../controllers/organization/on-board/index');

const router = require('express').Router();

router.route('/sign-up').post(executeController(orgSignUp));
router.route('/').get(executeController(getProfile));
router.route('/on-board').post(executeController(onBoard));

module.exports = router;

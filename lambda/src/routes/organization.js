const { executeController } = require('../utils/execute-controller');
const orgSignUp = require('../controllers/organization/sign-up/index');

const router = require('express').Router();

router.route('/sign-up').post(executeController(orgSignUp));

module.exports = router;

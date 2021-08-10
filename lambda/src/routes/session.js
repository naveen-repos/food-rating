const { createSession } = require('../controllers/session');
const { executeController } = require('../utils/execute-controller');

const router = require('express').Router();

router
  .route('/')
  .post(executeController(createSession))
  .get(() => {})
  .delete(() => {});

router
  .route('/:id')
  .put(() => {})
  .get(() => {});

module.exports = router;

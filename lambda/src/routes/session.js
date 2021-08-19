const { executeController } = require('../utils/execute-controller');
const addSession = require('../controllers/session/add-session/index');
const editSession = require('../controllers/session/edit-session/index');
const getSessions = require('../controllers/session/get-sessions/index');
const deleteSession = require('../controllers/session/delete-session/index');

const router = require('express').Router();

router
  .route('/')
  .post(executeController(addSession))
  .get(executeController(getSessions));

router
  .route('/:sessionId')
  .put(executeController(editSession))
  .delete(executeController(deleteSession));

module.exports = router;

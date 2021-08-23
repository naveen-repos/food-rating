const { executeController } = require('../utils/execute-controller');
const addRecipeReviews = require('../controllers/review/recipes/index');
const addMenuReview = require('../controllers/review/menu/index');

const router = require('express').Router();

router.route('/recipes').post(executeController(addRecipeReviews));
router.route('/menu').post(executeController(addMenuReview));

module.exports = router;

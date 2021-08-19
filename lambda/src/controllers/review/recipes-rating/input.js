const Joi = require('Joi');

const review = Joi.object({
  itemId: Joi.string().required(),
  menuId: Joi.string().required(),
  sessionId: Joi.string().required(),
  rating: Joi.number(),
  comment: Joi.string(),
  actionTags: Joi.Array(),
  reviewTags: Joi.Array(),
});

const inputValidator = Joi.array(review);

module.exports = { inputValidator };

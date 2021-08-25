const Joi = require('Joi');

const review = Joi.object({
  itemId: Joi.string().required(),
  menuId: Joi.string().required(),
  sessionId: Joi.string().required(),
  rating: Joi.number(),
  comment: Joi.string(),
  actionTags: Joi.array(),
  reviewTags: Joi.array(),
});

const inputValidator = Joi.object({
  reviews: Joi.array().items(review).required(),
});

module.exports = { inputValidator };

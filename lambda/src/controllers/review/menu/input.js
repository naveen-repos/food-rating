const Joi = require('Joi');

const inputValidator = Joi.object({
  menuId: Joi.string().required(),
  sessionId: Joi.string().required(),
  rating: Joi.number(),
  comment: Joi.string(),
});

module.exports = { inputValidator };

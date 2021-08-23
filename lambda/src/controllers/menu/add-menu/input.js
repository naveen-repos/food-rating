const Joi = require('Joi');

const inputValidator = Joi.object({
  items: Joi.array().items(Joi.string().required()).required(),
  day: Joi.number().required(),
  sessionId: Joi.string().required(),
});
module.exports = { inputValidator };

const Joi = require('Joi');
const inputValidator = Joi.object({
  day: Joi.number(),
  items: Joi.array().items(Joi.string().required()),
  sessionId: Joi.string().required(),
  menuId: Joi.string().required(),
});
module.exports = { inputValidator };

const Joi = require('Joi');
const inputValidator = Joi.object({
  name: Joi.string(),
  day: Joi.number(),
  sessionId: Joi.string().required(),
  menuId: Joi.string().required(),
});
module.exports = { inputValidator };

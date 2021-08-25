const Joi = require('joi');
const inputValidator = Joi.object({
  sessionId: Joi.string().required(),
  menuId: Joi.string().required(),
});
module.exports = { inputValidator };

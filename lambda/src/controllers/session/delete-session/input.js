const Joi = require('Joi');
const inputValidator = Joi.object({
  sessionId: Joi.string().required(),
});
module.exports = { inputValidator };

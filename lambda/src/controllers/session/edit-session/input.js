const Joi = require('Joi');
const inputValidator = Joi.object({
  name: Joi.string(),
  startTime: Joi.number(),
  sessionId: Joi.string().required(),
});
module.exports = { inputValidator };

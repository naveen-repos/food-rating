const Joi = require('joi');
const inputValidator = Joi.object({
  name: Joi.string().required(),
  startTime: Joi.number().required(),
});
module.exports = { inputValidator };

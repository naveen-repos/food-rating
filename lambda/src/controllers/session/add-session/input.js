const Joi = require('Joi');
const inputValidator = Joi.object({
  name: Joi.string().required(),
  startTime: Joi.number().required(),
  image: Joi.string(),
});
module.exports = { inputValidator };

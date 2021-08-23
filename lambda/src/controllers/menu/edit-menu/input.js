const Joi = require('Joi');
const inputValidator = Joi.object({
  name: Joi.string(),
  startTime: Joi.number(),
  image: Joi.string(),
});
module.exports = { inputValidator };

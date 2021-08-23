const Joi = require('Joi');
const inputValidator = Joi.object({
  name: Joi.string().required(),
});
module.exports = { inputValidator };

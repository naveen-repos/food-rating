const Joi = require('Joi');
const inputValidator = Joi.object({
  name: Joi.string().required(),
  categoryId: Joi.string().required(),
});
module.exports = { inputValidator };

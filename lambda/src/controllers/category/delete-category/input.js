const Joi = require('Joi');
const inputValidator = Joi.object({
  categoryId: Joi.string().required(),
});
module.exports = { inputValidator };

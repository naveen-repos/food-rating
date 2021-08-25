const Joi = require('joi');
const inputValidator = Joi.object({
  categoryId: Joi.string().required(),
});
module.exports = { inputValidator };

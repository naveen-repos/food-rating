const Joi = require('joi');
const inputValidator = Joi.object({
  name: Joi.string(),
  itemId: Joi.string().required(),
  categoryId: Joi.string(),
  image: Joi.string(),
});

module.exports = { inputValidator };

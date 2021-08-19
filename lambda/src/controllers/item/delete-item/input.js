const Joi = require('Joi');
const inputValidator = Joi.object({
  itemId: Joi.string().required(),
});
module.exports = { inputValidator };

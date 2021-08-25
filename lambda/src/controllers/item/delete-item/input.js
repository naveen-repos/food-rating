const Joi = require('joi');
const inputValidator = Joi.object({
  itemId: Joi.string().required(),
});
module.exports = { inputValidator };

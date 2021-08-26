const Joi = require('joi');
const inputValidator = Joi.object({
  name: Joi.string().required(),
  adminName: Joi.string().required(),
  type: Joi.string().required().valid('organization', 'hotel'),
  email: Joi.string().email().required(),
});
module.exports = { inputValidator };

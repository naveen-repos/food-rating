const Joi = require('joi');

const session = Joi.object({
  name: Joi.string().required(),
  startTime: Joi.number().required(),
});

const inputValidator = Joi.object({
  sessions: Joi.array().items(session).required(),
});

module.exports = { inputValidator };

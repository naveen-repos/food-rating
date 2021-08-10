const Joi = require('Joi');
const { identity } = require('ramda');
const {
  createOrganizationSession,
} = require('../services/firebase/FIRSessionService');

const createSession = {
  inputValidator: Joi.object({
    name: Joi.string().required(),
    startTime: Joi.number().required(),
    image: Joi.string(),
  }),
  sanitize: identity,
  authorizationRequired: false,
  fn: async ({
    inputs: { name, startTime, image },
    responses: { success },
    organization: { id: organizationId },
  }) => {
    const session = await createOrganizationSession({
      name,
      startTime,
      image,
      organizationId,
    });

    return success({ session });
  },
};

const editSession = {};
const deleteSession = {};

module.exports = { createSession, editSession, deleteSession };

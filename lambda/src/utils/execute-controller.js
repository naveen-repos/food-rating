// const {
//   getOrganizationById,
// } = require('../services/firebase/FIROrganizationService');

const parseInputFromRequest = (req) => {
  return { ...req.params, ...req.query, ...req.body };
};

const validator = ({ inputs = {}, inputValidator }) => {
  let validationResponse = inputValidator.validate(inputs);
  if (validationResponse.error) {
    const {
      error: {
        details: [{ message }],
      },
    } = validationResponse;

    return { data: null, message };
  }
  return { data: validationResponse.value, message: null };
};

const fetchUserFromToken = async (token) => {
  try {
    const { auth } = require('../services/firebase/firebase').Firebase();
    const decodedTokenData = await auth().verifyIdToken(token);
    const { uid: orgId } = decodedTokenData;
    //facing error at the user sign-in
    return { data: { id: orgId } }; //await getOrganizationById(orgId);
  } catch (err) {
    return { data: null, message: err.message };
  }
};

const executeController = ({
  inputValidator,
  authorizationRequired = true,
  sanitizer,
  fn,
}) => {
  return async (req, res) => {
    const { clientError, success, serverError } = require('./response')(
      res,
      sanitizer
    );
    try {
      const inputs = parseInputFromRequest(req);
      let validatedInput = {};
      if (inputValidator) {
        const { data: validatedResponse, message: validationError } = validator(
          {
            inputs,
            inputValidator,
          }
        );
        if (validationError) {
          return clientError({ message: validationError });
        }
        validatedInput = validatedResponse;
      }

      let organization = { id: 'dummyOrganizationId' };
      if (authorizationRequired) {
        if (!req.headers.authorization) {
          return clientError({ message: 'Missing authorization' });
        }
        const { data: organizationData, message: authorizationError } =
          await fetchUserFromToken(req.headers.authorization);

        if (authorizationError) {
          return clientError({ message: authorizationError });
        }

        organization = organizationData;
      }
      await fn({
        inputs: validatedInput,
        responses: {
          clientError,
          success,
        },
        organization,
      });
      return;
    } catch (err) {
      console.log({ err });
      return serverError();
    }
  };
};
module.exports = { executeController };

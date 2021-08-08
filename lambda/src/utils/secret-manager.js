const AWS = require('aws-sdk'),
  secretName = process.env.secretName || 'stg-food-rating';

const client = new AWS.SecretsManager({
  region: 'ap-south-1',
});

const fetchSecret = () => {
  return new Promise((resolve, reject) => {
    try {
      client.getSecretValue({ SecretId: secretName }, function (err, data) {
        if (err) {
          if (err.code === 'DecryptionFailureException')
            // Secrets Manager can't decrypt the protected secret text using the provided KMS key.
            // Deal with the exception here, and/or rethrow at your discretion.
            throw err;
          else if (err.code === 'InternalServiceErrorException')
            // An error occurred on the server side.
            // Deal with the exception here, and/or rethrow at your discretion.
            throw err;
          else if (err.code === 'InvalidParameterException')
            // You provided an invalid value for a parameter.
            // Deal with the exception here, and/or rethrow at your discretion.
            throw err;
          else if (err.code === 'InvalidRequestException')
            // You provided a parameter value that is not valid for the current state of the resource.
            // Deal with the exception here, and/or rethrow at your discretion.
            throw err;
          else if (err.code === 'ResourceNotFoundException')
            // We can't find the resource that you asked for.
            // Deal with the exception here, and/or rethrow at your discretion.
            throw err;
        } else {
          if ('SecretString' in data) {
            const secret = data.SecretString;
            resolve(JSON.parse(secret));
          }
        }
      });
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });
};

const setUpEnvironment = async () => {
  try {
    const secrets = await fetchSecret();
    if (typeof secrets === 'object') {
      for (let key in secrets) {
        //we can't store the object in the env variable
        if (typeof secrets[key] === 'object') {
          process.env[key] = JSON.stringify(secrets[key]);
        } else if (typeof secrets[key] === 'string') {
          process.env[key] = secrets[key];
        }
      }
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  setUpEnvironment,
  fetchSecret,
};

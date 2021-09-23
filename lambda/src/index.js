const isTestingEnvironment = process.env.NODE_ENV === 'test';
const awsServerlessExpress = !isTestingEnvironment
  ? require('aws-serverless-express')
  : require('./server');
const app = require('./server');
const { pickAll } = require('./ramda');

const binaryMimeTypes = [];
const server = awsServerlessExpress.createServer(app, null, binaryMimeTypes);

const logEvent = (event) => {
  try {
    const parsedEvent = pickAll(
      [
        'path',
        'httpMethod',
        'pathParameters',
        'pathParameters',
        'body',
        'isBase64Encoded',
      ],
      event
    );
    console.log({ parsedEvent, authToken: event.headers.Authorization });
  } catch (ex) {
    console.error(ex);
    console.log({ event });
  }
};
exports.handler = (event, context) => {
  logEvent(event);
  return awsServerlessExpress.proxy(server, event, context);
};

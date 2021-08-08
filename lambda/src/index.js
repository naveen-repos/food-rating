const isTestingEnvironment = process.env.NODE_ENV === 'test';
const awsServerlessExpress = !isTestingEnvironment
  ? require('aws-serverless-express')
  : require('./server');
const app = require('./server');

const binaryMimeTypes = [];
const server = awsServerlessExpress.createServer(app, null, binaryMimeTypes);

exports.handler = (event, context) => {
  console.log(event);
  return awsServerlessExpress.proxy(server, event, context);
};

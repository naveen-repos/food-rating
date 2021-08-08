const express = require('express');
const { setUpEnvironment } = require('./utils/secret-manager');
const app = express();
require('dotenv').config();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(async function (req, res, next) {
  if (process.env.environment !== 'local') {
    await setUpEnvironment();
  }
  next();
});

app.get('/time', async (req, res) => {
  console.log('time reached');

  res.status(200).send({ isSuccessful: true, data: 'from the api' });
});

app.get('/hc', (req, res) => {
  res.status(200).send('success');
});

module.exports = app;

app.listen('3000', () => {
  console.log(`Server is listening on port 3000`);
});

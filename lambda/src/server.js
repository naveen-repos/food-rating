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

app.use('/session', require('./routes/session'));
app.use('/menu', require('./routes/menu'));
app.use('/item', require('./routes/item'));
app.use('/category', require('./routes/category'));
app.use('/review', require('./routes/review'));
app.use('/organization', require('./routes/organization'));

app.get('/hc', (req, res) => {
  res.status(200).send('success');
});

module.exports = app;

app.listen('3000', () => {
  console.log(`Server is listening on port 3000`);
});

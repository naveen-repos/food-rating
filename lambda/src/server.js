const express = require('express');
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

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

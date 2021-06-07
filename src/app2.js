require('dotenv').config();

const express = require('express');
const morgan = require('morgan');
const path = require('path');

const app = express();

app.use(express.static('public'));
app.use(morgan('tiny'));

app.get('/hello', (req, res) => {
  res.send('World');
});

app.use((req, res) => {
  res.send('404 Not Found ');
});

console.log(path.join(__dirname, 'public', 'index.html'));
app.listen(3000, () => {
  console.log('Listening to port 3000');
});

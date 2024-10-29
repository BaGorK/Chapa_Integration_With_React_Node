require('dotenv').config();
const path = require('path');
const express = require('express');
const cors = require('cors');
const chapaRouter = require('./chapa.route');

const app = express();

app.use(express.json());
app.use(cors());

app.use(express.static(path.resolve(__dirname, '../client/dist')));

app.use('/', chapaRouter);

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/dist', 'index.html'));
});

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});

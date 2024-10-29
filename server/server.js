require('dotenv').config();
const express = require('express');
const cors = require('cors');
const chapaRouter = require('./chapa.route');

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: 'include',
  })
);
app.use('/', chapaRouter);

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});

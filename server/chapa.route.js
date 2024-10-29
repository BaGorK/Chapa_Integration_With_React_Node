const express = require('express');

const chapaRouter = express.Router();

chapaRouter.post('/accept-payment', async (req, res) => {
  console.log(req.body);
  try {
    const response = await axios.post(
      'https://api.chapa.co/v1/transaction/initialize',
      req.body,
      {
        headers: {
          Authorization: `Bearer ${CHAPA_SECRET_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    console.log(response.data);

    res.status(200).json(response.data);
  } catch (e) {
    res.status(400).json({
      error_code: e.code,
      message: e.message,
    });
  }
});

module.exports = chapaRouter;

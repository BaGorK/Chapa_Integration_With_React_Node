const express = require('express');
const axios = require('axios');

const chapaRouter = express.Router();

chapaRouter.post('/accept-payment', async (req, res) => {
  const { amount, email, first_name, last_name, phone_number, currency } =
    req.body;

  const tx_ref = 'tx_EdmealemKassahun' + Date.now();
  const body = {
    amount,
    currency,
    email,
    first_name,
    last_name,
    phone_number,
    tx_ref,
    return_url: `/payment-verify?tx_ref=${tx_ref}`,
  };

  try {
    const response = await axios.post(
      'https://api.chapa.co/v1/transaction/initialize',
      body,
      {
        headers: {
          Authorization: `Bearer ${process.env.CHAPA_SECRET_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    res.status(200).json(response.data);
  } catch (e) {
    console.log(e);
    res.status(400).json({
      error_code: e.code,
      message: e.message,
    });
  }
});

chapaRouter.post('/verify-payment', async (req, res) => {
  const { tx_ref } = req.body;
  try {
    const response = await axios.get(
      `https://api.chapa.co/v1/transaction/verify/${tx_ref}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.CHAPA_SECRET_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    res.status(200).json(response.data);
  } catch (e) {
    console.log(e);
    res.status(400).json({
      error_code: e.code,
      message: e.message,
    });
  }
});

module.exports = chapaRouter;

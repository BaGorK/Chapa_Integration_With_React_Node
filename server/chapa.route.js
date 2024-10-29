const express = require('express');
const axios = require('axios');

const chapaRouter = express.Router();

chapaRouter.post('/accept-payment', async (req, res) => {
  const tx_ref = 'tx_EdmealemKassahun' + Date.now();
  const body = {
    amount: 120,
    currency: 'ETB',
    email: 'abebech_bekele@gmail.com',
    first_name: 'Edmealem',
    last_name: 'Kassahun',
    phone_number: '0912345678',
    tx_ref,
    return_url: `http://localhost:5173/payment-verify?tx_ref=${tx_ref}`,
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

const express = require('express');
const axios = require('axios');

const chapaRouter = express.Router();

chapaRouter.post('/accept-payment', async (req, res) => {
  const body = {
    amount: 120,
    currency: 'ETB',
    email: 'abebech_bekele@gmail.com',
    first_name: 'Edmealem',
    last_name: 'Kassahun',
    phone_number: '0912345678',
    tx_ref: 'chewatatest-6669',
    return_url: 'http://localhost:5173/',
    callback_url: 'https://webhook.site/077164d6-29cb-40df-ba29-8a00e59a7e60',
  };
  try {
    const response = await axios.post(
      'https://api.chapa.co/v1/transaction/initialize',
      JSON.stringify(body),
      {
        headers: {
          Authorization: `Bearer ${process.env.CHAPA_SECRET_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );h

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

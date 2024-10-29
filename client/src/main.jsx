import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import PaymentVerify from './PaymentVerify.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App />} />
        <Route path='/payment-verify' element={<PaymentVerify />} />
        <Route path='payment_success' element={<div>payment success full</div>} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

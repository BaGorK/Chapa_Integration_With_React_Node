import { useEffect, useState } from 'react';
import axios from 'axios';
import { useSearchParams } from 'react-router-dom';
import { BASE_URL } from './constant';

function PaymentVerify() {
  const [isLoading, setIsLoading] = useState(false);
  const [paymentData, setPaymentData] = useState({});

  const [searchParams, setSearchParams] = useSearchParams();
  const tx_ref = searchParams.get('tx_ref');

  useEffect(() => {
    async function verifyPayment() {
      setIsLoading(true);
      if (!tx_ref) return setIsLoading(false);

      const res = await axios.post(`${BASE_URL}/verify-payment`, {
        tx_ref,
      });
      setIsLoading(false);
      const { data } = res.data;
      setPaymentData(data);
    }
    verifyPayment();
  }, []);

  const { amount, currency, email, first_name, last_name, phone_number } =
    paymentData;

  return (
    <div>
      {isLoading ? (
        <div className='h-screen flex items-center justify-center '>
          <span className='font-mono font-extrabold text-lg'>
            Verifying Payment...
          </span>
        </div>
      ) : (
        <div className='h-screen flex flex-col items-center justify-center '>
          <h3 className='font-mono font-extrabold text-lg'>
            Payment success full
          </h3>
          <div className='p-3  w-[300px] my-5 from-slate-300 bg-gradient-to-b to-transparent' />
          <div>
            <p>amount: {amount}</p>
            <p>currency: {currency}</p>
            <p>email: {email}</p>
            <p>first-name: {first_name}</p>
            <p>last-name: {last_name}</p>
            <p>phone_number: {phone_number}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default PaymentVerify;

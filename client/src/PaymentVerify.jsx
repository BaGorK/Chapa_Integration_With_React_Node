import { useEffect, useState } from 'react';
import axios from 'axios';
import { Navigate, useSearchParams } from 'react-router-dom';

function PaymentVerify() {
  const [isLoading, setIsLoading] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();
  const tx_ref = searchParams.get('tx_ref');

  useEffect(() => {
    async function verifyPayment() {
      setIsLoading(true);
      const res = await axios.post('http://localhost:5000/verify-payment', {
        tx_ref,
      });
      setIsLoading(false);
      console.log(res.data);
    }
    verifyPayment();
  }, []);

  if (!isLoading) return <Navigate to='/payment_success' replace={true} />;

  return (
    <div>
      {isLoading ? (
        <div>Verifying Payment...</div>
      ) : (
        <div>Payment success full</div>
      )}
    </div>
  );
}

export default PaymentVerify;

import { useRef, useState } from 'react';
import axios from 'axios';

function App() {
  const [isLoading, setIsLoading] = useState(false);

  const amountRef = useRef(null);
  const emailRef = useRef(null);
  const firstNameRef = useRef(null);
  const lastNameRef = useRef(null);
  const phoneNumberRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !amountRef.current.value ||
      !emailRef.current.value ||
      !firstNameRef.current.value ||
      !lastNameRef.current.value ||
      !phoneNumberRef.current.value
    ) {
      return;
    }

    try {
      setIsLoading(true);
      const tx_ref = `${firstNameRef.current.value}-${Date.now()}`;

      const res = await axios.post('http://localhost:5000/accept-payment', {
        amount: amountRef.current.value,
        currency: 'ETB',
        email: emailRef.current.value,
        first_name: firstNameRef.current.value,
        last_name: lastNameRef.current.value,
        phone_number: phoneNumberRef.current.value,
        tx_ref,
        return_url: 'http://localhost:5173/',
        callback_url:
          'https://webhook.site/077164d6-29cb-40df-ba29-8a00e59a7e60',
      });
      window.location.href = res.data.data.checkout_url;
      console.log(res.data.data.checkout_url);
    } catch (error) {
      console.log('Error', error);
    }
    setIsLoading(false);
  };

  return (
    <div className='flex items-end justify-center'>
      <div>
        <h1 className='mx-[130px] mt-3 font-mono font-extrabold text-lg'>
          Welcome
        </h1>
        <form
          className=' p-5 m-10 shadow-2xl rounded-xl'
          onSubmit={handleSubmit}
        >
          <input
            className='m-3 border border-black px-5 py-2 rounded-lg'
            defaultValue='100'
            ref={amountRef}
            type='number'
            name='amount'
            placeholder='amount'
          />{' '}
          <br />
          <input
            className='m-3 border border-black px-5 py-2 rounded-lg'
            ref={emailRef}
            type='email'
            name='email'
            placeholder='email'
            defaultValue='test@test.com'
          />
          <br />
          <input
            className='m-3 border border-black px-5 py-2 rounded-lg'
            ref={firstNameRef}
            type='text'
            name='first_name'
            placeholder='first_name'
            defaultValue='Edmealem'
          />
          <br />
          <input
            className='m-3 border border-black px-5 py-2 rounded-lg'
            ref={lastNameRef}
            type='text'
            name='last_name'
            placeholder='last_name'
            defaultValue='Kassahun'
          />
          <br />
          <input
            className='m-3 border border-black px-5 py-2 rounded-lg'
            ref={phoneNumberRef}
            type='text'
            name='phone_number'
            placeholder='phone_number'
            defaultValue='0900123456'
          />
          <br />
          <button
            disabled={isLoading}
            className='px-[100px] py-3 ml-3 rounded-md bg-green-600'
            type='submit'
          >
            {isLoading ? 'Paying with chapa' : 'Pay with chapa'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default App;

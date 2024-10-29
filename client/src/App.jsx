import { useState } from 'react';
import axios from 'axios';

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState({
    first_name: 'Edmealem',
    last_name: 'Kassahun',
    email: 'asdf@asdf.com',
    amount: '1200',
    currency: 'ETB',
    phone_number: '+251908005801',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setIsLoading(true);

      const res = await axios.post('http://localhost:5000/accept-payment', {
        amount: form.amount,
        currency: form.currency,
        email: form.email,
        first_name: form.first_name,
        last_name: form.last_name,
        phone_number: form.phone_number,
      });

      const { data } = res.data;

      const url = data.checkout_url;
      window.location.href = url;

      setForm({
        amount: '',
        email: '',
        first_name: '',
        currency: '',
        last_name: '',
        phone_number: '',
        tx_ref,
      });
    } catch (error) {
      console.log('Error', error);
    }
    setIsLoading(false);
  };

  return (
    <div className='flex flex-col max-w-lg mx-auto'>
      <h1 className='mx-[130px] mt-3 font-mono font-extrabold text-lg'>
        😎 Welcome I am a MERN Implementation of CHAPA
      </h1>
      <div className='flex flex-col justify-center items-center'>
        <form
          className=' p-5 m-10 shadow-2xl rounded-xl'
          onSubmit={handleSubmit}
        >
          <input
            className='m-3 mx-auto border border-black px-5 py-2 rounded-lg'
            onChange={handleChange}
            type='email'
            name='email'
            value={form.email}
            placeholder='email'
          />
          <br />
          <input
            className='m-3 mx-auto border border-black px-5 py-2 rounded-lg'
            onChange={handleChange}
            type='text'
            name='first_name'
            value={form.first_name}
            placeholder='first_name'
          />
          <br />
          <input
            className='m-3 mx-auto border border-black px-5 py-2 rounded-lg'
            onChange={handleChange}
            type='text'
            name='last_name'
            placeholder='last_name'
            value={form.last_name}
          />
          <br />
          <input
            className='m-3 mx-auto border border-black px-5 py-2 rounded-lg'
            onChange={handleChange}
            type='text'
            name='amount'
            value={form.amount}
            placeholder='amount'
          />{' '}
          <br />
          <input
            className='m-3 mx-auto border border-black px-5 py-2 rounded-lg'
            onChange={handleChange}
            type='text'
            name='currency'
            value={form.currency}
            placeholder='currency'
          />{' '}
          <br />
          <input
            className='m-3 mx-auto border border-black px-5 py-2 rounded-lg'
            onChange={handleChange}
            type='text'
            name='phone_number'
            placeholder='phone_number'
            value={form.phone_number}
          />
          <br />
          <button
            disabled={isLoading}
            className='px-5 w-full py-3 rounded-md bg-green-600 disabled:bg-green-400 disabled:cursor-not-allowed'
            type='submit'
          >
            {isLoading ? 'Processing' : 'Pay'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default App;

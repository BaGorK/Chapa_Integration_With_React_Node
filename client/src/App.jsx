import { useState } from 'react';
import axios from 'axios';

function App() {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setIsLoading(true);
      const res = await axios.post('http://localhost:5000/accept-payment', {});

      const { data } = res.data;

      const url = data.checkout_url;
      window.location.href = url;
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

import React, { useEffect, useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { toast } from 'react-toastify';

const PaymentForm = ({ price, setPaymentSuccess }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [clientSecret, setClientSecret] = useState(null)
  const [newIntent, setNewIntent] = useState(true)
  useEffect(() => {
    fetch(`https://akademi-university-project.vercel.app/create-payment-intent`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({ price })
    })
      .then(res => res.json())
      .then(data => {
        setClientSecret(data.clientSecret)
      })
      .catch(err => {
        toast.error('Error fetching client secret for payment.')
      })
  }, [newIntent])


  const handleSubmit = async (e) => {
    e.preventDefault();

    const card = elements.getElement(CardElement);

    if (!stripe || !card) {
      return;
    }

    const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: card,
        billing_details: {
          name: 'User Name',
        },
      },
    });

    if (error) {
      toast.error(error.message)
      setNewIntent(!newIntent)
      setPaymentSuccess(false)
    } else if (paymentIntent.status === 'succeeded') {
      setNewIntent(!newIntent)
      document.getElementById("my_modal_6").checked = false
      document.getElementById("my_modal_7").checked = true
      setPaymentSuccess(true)
      toast.success('Payment successful!')
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement options={{
        style: {
          base: {
            fontSize: '16px',
            color: '#424770',
            '::placeholder': {
              color: '#aab7c4',
            },
          },
          invalid: {
            color: '#9e2146',
          },
        },
      }} />
      <div className='flex mt-5 justify-center items-center gap-5'>
        <button className='btn transition duration-300 hover:bg-[#7CFF77] hover:text-[#14452F] bg-[#185137] text-white px-7' type="submit" disabled={!stripe}>Pay Now</button>
        <label className='btn transition duration-300 hover:bg-[#b12c2c] hover:text-[#ffffff] bg-[#ff2525] text-white px-7' htmlFor="my_modal_6">close</label>
      </div>
    </form>
  );
};

export default PaymentForm;

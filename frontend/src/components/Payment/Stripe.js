import React from 'react';
import {loadStripe} from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import PaymentForm from './PaymentForm';

// const key = ();
// console.log(key);
const stripePromise = loadStripe(process.env.REACT_APP_STRIPEKEY);

function Stripe() {
  return (
    <Elements stripe={stripePromise}>
        <PaymentForm/>
    </Elements>
   )
}

export default Stripe;
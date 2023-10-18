import React, {useEffect, useState} from 'react'
import { CardNumberElement, CardCvcElement, CardExpiryElement, useStripe, useElements} from '@stripe/react-stripe-js';
import axios from 'axios';
import { useNavigate, Navigate } from 'react-router-dom';


const CARD_OPTIONS = {
	style: {
		base: {
			iconColor: "#c4f0ff",
			color: "black",
			fontWeight: 500,
			fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
			fontSize: "16px",
			fontSmoothing: "antialiased",
			":-webkit-autofill": { color: "black" },
			"::placeholder": { color: "black" }
		},
		invalid: {
			iconColor: "#ffc7ee",
			color: "black"
		}
	}
}

export default function PaymentForm() {

    const navigate = useNavigate();
    const [success, setSuccess] = useState(false);//useState hook to create the success state,
    const stripe = useStripe();//tripe variable with the useStripe hook imported from stripe-react-js
    const elements = useElements();//elements variable that you will use in your application to collect and process user’s payment details
    
    useEffect(() => {
      const getPayment = async () => {
      const paidResponse = await axios.get(`http://localhost:4000/paymentdetail/${decodedToken}`);
      console.log("paidresponse:", paidResponse.data.hasPaid);
      setHasPaid(paidResponse.data.hasPaid);
      }
      getPayment();
    }, [hasPaid])
    const [hasPaid, setHasPaid] = useState(null);




    const handleSubmit = async (e) =>{
        e.preventDefault()
        const {error, paymentMethod} = await stripe.createPaymentMethod({
            type: "card",
            card: elements.getElement(CardCvcElement, CardExpiryElement, CardNumberElement)
        })

        if(!error){
            try {
              const planSelected = localStorage.getItem("planSelected");
                const {id} = paymentMethod
                const response = await axios.post("http://localhost:4000/makepayment", {
                    amount:parseInt(planSelected*10000),
                    id
                },{
                  headers: {
                    "x-access-token": localStorage.getItem("token")
                  }
                });

                if(response.data.success){
                    console.log("Successful Payment")
                    setSuccess(true)
                }

            } catch (error) {
                console.log("Error", error)
            }
        }else {
            console.log(error.message)
        }
    }

    
   return (
    <>
    {hasPaid? 
    (
     <div>
       {!success ? (
         <form className='myForm' onSubmit={handleSubmit}>


           <fieldset className="FormGroup">
             <div className="FormRow">
               <input className='nameInput' type='text' id='name' placeholder='Name' style={{border: 'none', height:'40px', outline:'none'}}/>
             </div>
           </fieldset>


           <fieldset className="FormGroup">
             <div className="FormRow">
               <CardNumberElement options={CARD_OPTIONS} />
             </div>
           </fieldset>
           <fieldset className="FormGroup">
             <div className="FormRow">
               <CardExpiryElement options={CARD_OPTIONS} />
             </div>
           </fieldset>
           <fieldset className="FormGroup">
             <div className="FormRow">
               <CardCvcElement options={CARD_OPTIONS} />
             </div>
           </fieldset>
           <button>Pay</button>
         </form>
       ) : (
         <div className="payment-success">
           <h2>Payment successful</h2>
           <h3 className="Thank-you">Thank you for you payment</h3>
           <button onClick={() => navigate('/dashboard')}></button>
         </div>
       )}
     </div>
    )
    :
    (
      <>
       <Navigate to="/dashboard" replace />;
      </>
    )}
       </>
   );



  }
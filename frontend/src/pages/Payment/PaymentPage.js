import React, {useState} from 'react';
import Stripe from '../../components/Payment/Stripe';

function PaymentPage() {
    const [showForm, setShowForm] = useState(false)
        
    const handleOneClick = () => {
        localStorage.setItem('planSelected', 1)
        setShowForm(true);
    }

    const handleTwoClick = () => {
        localStorage.setItem('planSelected', 2);
        setShowForm(true);
    }

    return (
    <div className="App">
    {showForm ? (
        <Stripe />
    ) : (
        <div>
        <div className='one_day'>
            <button className='onedaybtn' onClick={handleOneClick}>One Day</button>
        </div>
        <div className='two_day'>
            <button className='twodaybtn' onClick={handleTwoClick}>Two Day</button>
        </div>
        </div>
    )}
    </div>
    );
}


export default PaymentPage;

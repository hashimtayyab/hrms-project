// const {loginUser, getUserById} = require('../../services/loginService/loginUser');
const jwt = require('jsonwebtoken');
const {getPaymentDetails} = require('../../services/paymentService/paymentService')

class PaymentController {
    async getPaymentDetails(req, res) {
        try {
            const payment = await getPaymentDetails(req);
            if(payment) {
                console.log('User Passed');
                return res.status(200).json(payment);
            }
            else{
                console.log('User Failed');
                return res.status(401).json({message: 'Invalid username or password'});
            }
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = new PaymentController();
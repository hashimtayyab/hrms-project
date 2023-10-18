const Payment = require('../../models/paymentPlanModel/paymentModel');
const jwt = require('jsonwebtoken');

class PaymentService {
    async getPaymentDetails(req, res) {
        try {
            const payment = await Payment.findOne({
                userId: req.params.userId
            });
                return payment;
        } catch (error) {
            console.log(error);
        }
    } 
}

module.exports = new PaymentService();
const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
    userId:{
        type: String,
        required: true,
        unique: true,
    },
    hasPaid:{
        type:Boolean,
        default:false
    },
    planSelected:{
        type:String,
        required:true
    }

});

module.exports = mongoose.model("PaymentPlan", paymentSchema);
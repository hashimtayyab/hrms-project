const mongoose = require('mongoose');


const leaveSchema = new mongoose.Schema({
    employee: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Employee',
        required: true,
    },
    admin:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Admin',
        required: true,
    },
    reqStatus: {
        type: String,
    },
    dateApplied: {
        type: Date,
    },
    appliedFrom:{
        type:Date,
    },
    appliedTill:{
        type:Date,
    }
})

module.exports = mongoose.model('Leave', leaveSchema);
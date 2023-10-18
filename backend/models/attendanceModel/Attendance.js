const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema({
    employee: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Employee',
        required: true
    },
    attendance: 
    [
       {
        date: { 
            type: Date,
        },
        check_in_time: {
            type: Date, 
        },
        check_out_time: {
            type: Date 
        },
        }
    ]

});


module.exports = mongoose.model("Attendance", attendanceSchema);
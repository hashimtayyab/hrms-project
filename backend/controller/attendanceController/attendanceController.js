const {
    addCheckInTime, 
    addCheckOutTime, 
    getCheckInTime, 
    getCheckOutTime,
    getAttendance,
    getTotalCheckIns } = require('../../services/attendanceService/attendanceService');

class AttendanceController {
    async addCheckInTime(req, res) {
        try {
            const attendance = await addCheckInTime(req);
            return res.status(200);
        } catch (error) {
            console.error("Error while adding Check In Time: ",error);
        }

    }
    async addCheckOutTime(req, res) {
        try {
            const attendance = await addCheckOutTime(req);
            return res.status(200);
       } catch (error) {
        console.log("Error while adding Check Out Time: ",error);
       }
    }

    async getTotalCheckIns(req, res){
        try {
            const checkins = await getTotalCheckIns(req);
            return res.status(200).json(checkins);
        } catch (error) {
            console.log(error)
        }
    }

    async getCheckInTime(req, res) {
        try {
            const checkin = await getCheckInTime(req);
            // console.log("checkin", checkin);
            return res.status(200).json(checkin);   
        } catch (error) {
            console.error(error);
        }
    }

    async getCheckOutTime(req, res) {
        try {
            const checkout = await getCheckOutTime(req);
            return res.status(200).json(checkout);   
        } catch (error) {
            console.error(error);
        }
    }

    async getAttendance(req, res) {
        try {
            const atten = await getAttendance(req);
            res.status(200).json(atten);
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = new AttendanceController();
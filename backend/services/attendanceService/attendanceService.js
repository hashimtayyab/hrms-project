const Attendance =  require("../../models/attendanceModel/Attendance");

class AttendanceService {

    async addCheckInTime(req, res){
        const findUser = await Attendance.findOne({
            employee: req.params.userId,
        });
        if(!findUser) {
            console.log("!finduser", req.body.checkInTime)
            const userCheckIn = new Attendance({
                employee: req.params.userId,
                attendance: { 
                    date: req.body.date, 
                    check_in_time: req.body.checkInTime, 
                    check_out_time: null,
                },
            })
            userCheckIn.save().then((response) => {console.log(response)});
            return userCheckIn;
        }
        else if(findUser){
            const filter = {employee: req.params.userId}
            const updatedAttendance = Attendance.findOneAndUpdate(filter,
                { $push: { attendance: {
                    date: req.body.date, 
                    check_in_time: req.body.checkInTime,
                    check_out_time: null
                    } } }
                )
            return updatedAttendance;
        }
    }

    async addCheckOutTime(req, res) {
        try {
            const attCount = await Attendance.findOne(
                { employee: req.params.userId },
                {
                  count: {
                    $size: '$attendance'
                  },
                }
              ).lean();                
                var position = parseInt(attCount.count) - 1;
              const findUser = await Attendance.findOne({
                employee: req.params.userId,
            });
            if(findUser){
                const filter = {employee: req.params.userId, }
                const updatedAttendance = Attendance.findOneAndUpdate(filter, 
                    {$set: {
                        [`attendance.${position}.check_out_time`]: req.body.checkOutTime
                      },})
                return updatedAttendance;
            }
        } catch(error) {
            console.log(error);
        } 
    }   

    async getCheckInTime(req, res) {
        try {        
            const attCount = await Attendance.findOne(
            { employee: req.params.userId },
            { 
                count: { $size: '$attendance' },
            },            
            ).lean(); 
            // console.log(`unseen count is ${attCount.count}`);
            var position = parseInt(attCount.count) - 1;
            const attendance = await Attendance.findOne(
                {employee: req.params.userId},
                {
                    checkInDate: { $arrayElemAt: ['$attendance.date', position]},
                    userCheckedInTime: { $arrayElemAt: ['$attendance.check_in_time', position] },
                },
                ).lean();
                return attendance;
        } catch (error) {
            console.log(error);
        }
    }


    async getTotalCheckIns(req, res) {
        try {
            const attList = await Promise.all(
            req.body.em.map(async (emp) => {
            const attCount = await Attendance.findOne(
            { employee: emp._id },
            { 
                count: { $size: '$attendance' },
            },            
            ).lean(); 
            var position = parseInt(attCount.count) - 1;
            const attendance = await Attendance.findOne(
                {employee: emp._id},
                {
                    checkInDate: { $arrayElemAt: ['$attendance.date', position]},
                    userCheckedInTime: { $arrayElemAt: ['$attendance.check_in_time', position] },
                },
                ).lean();
                return attendance;
            })
            )
            return attList;
        } catch (error) {
            console.log(error);
        }
    }


    async getCheckOutTime(req, res) {
        try {        
            const attCount = await Attendance.findOne(
            { employee: req.params.userId },
            { 
                count: { $size: '$attendance' },
            },            
            ).lean(); 
            // console.log(`unseen count is ${attCount.count}`);
            var position = parseInt(attCount.count) - 1;
            const attendance = await Attendance.findOne(
                {employee: req.params.userId},
                {
                    checkOutDate: { $arrayElemAt: ['$attendance.date', position]},
                    userCheckedOutTime: { $arrayElemAt: ['$attendance.check_out_time', position] },
                },
                ).lean();
                return attendance;
        } catch (error) {
            console.log(error);
        }
    }


    async getAttendance(req, res) {
        try {
            const previousAttendance = await Attendance.findOne(
                {employee: req.params.userId},
                {
                    prevAttendance: { $slice: ['$attendance', -5]} 
                }                
            )
            return previousAttendance;
        } catch (error) {
            console.log(error);
        }
    }


}
module.exports = new AttendanceService();
const Leave = require('../../models/leaveModel/Leave');
const Admin = require('../../models/adminModel/Admin');
const Employee = require('../../models/employeeModel/Employee');

class LeaveService {
    async applyForLeave(req, res){
        try {
            const leave = new Leave({
                employee: req.params.userId,
                admin: req.body.admin,
                reqStatus: 'pending...',
                dateApplied: new Date(),
                // dateApplied: req.body.dateApplied,
                appliedFrom: req.body.appliedFrom,
                appliedTill :req.body.appliedTill,
            })
            leave.save().then((response) => {console.log(response)});
            return leave;
        } catch (error) {
            console.error("Cannot apply for leave:", error);
        }
    }

    async viewLeaveReq(req, res) {
        try {
            if(req.params.userId){
            const leave = await Leave.find(
                {admin: req.params.userId},
            ).populate('employee');
            console.log(leave);
            return leave;
        }

        } catch (error) {
            console.log("Cannot view leave:", error);
        }
    }


    async viewLeaveApplied(req, res){
        try {
            const leaves = await Leave.find(
                { employee: req.params.userId,
                // employee: req.params.userId,
            }).lean();
            // console.log("leaves", leaves);
            return leaves;
        } catch (error) {
            console.log("Cannot view your leave Requests:", error);
        }
    }


    async updateLeaveStatus(req, res) {
        try {
            if(req.params.userId){
            const leave = Leave.findOneAndUpdate(
                {employee: req.params.userId},
                { $set: { reqStatus: req.body.status } },
            )
            return leave;
        }
        } catch (error) {
            console.log("Cannot update leave status:", error);
        }
    }

    async getAdmins(){
        try {
            const admins = Admin.find();
            return admins;
        } catch (error) {
            console.log("Cannot find admins", error);
        }
    }

}

module.exports = new LeaveService();
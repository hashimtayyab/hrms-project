const { 
    applyForLeave, 
    viewLeaveReq, 
    updateLeaveStatus, 
    viewLeaveApplied,
    getAdmins } = require("../../services/leaveService/leaveService");

class LeaveController {

    async applyForLeave(req, res) {
        try {
            const apply = applyForLeave(req, res);
            res.status(200).json(apply);
        } catch (error) {
            console.log(error);
        }
    }


    async viewLeaveReq(req, res) {
        try {
            const viewLeave = await viewLeaveReq(req, res);
            res.status(200).json(viewLeave);
        } catch (error) {
            console.log(error);
        }
    }

    async viewLeaveApplied(req, res) {
        try {
            const viewLeaves = await viewLeaveApplied(req,res);
            // console.log("viewLeaves: ", viewLeaves);
            res.status(200).json(viewLeaves);
        } catch (error) {
            console.log(error);
        }
    }  


    async updateLeaveStatus(req, res) {
        try {
            const update = updateLeaveStatus(req, res);
            res.status(200).json(update);
        } catch (error) {
            console.log(error);
        }
    }

    async getAdmins(req, res){
        try {
            const adminList = await getAdmins(req, res);
            res.status(200).json(adminList);
        } catch (error) {
            console.log(error);   
        }
    }
}


module.exports = new LeaveController();
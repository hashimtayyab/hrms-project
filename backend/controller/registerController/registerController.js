const {
    getAllUsers, 
    registerUser, 
    verifyMail, 
    checkIsVerified } = require('../../services/registerService/registerUser');
// const User = require('../../models/adminModel/Admin');

class UserController {
    async getAllUsers(req, res) {
        const users = await getAllUsers();
        return res.status(200).json(users);
    }

    async registerUser(req, res) {
        const user = await registerUser(req);
        return res.status(201).json(user);
    }

    async verifyMail(req, res){
        const user = await verifyMail(req);
        return res.render('thank-you');
        // return res.status(201).json(user).render('thank-you');
    }

    async checkIsVerified(req ,res) {
        const isVerified = await checkIsVerified(req);
        return res.status(200).json(isVerified);
    }
}

module.exports = new UserController();
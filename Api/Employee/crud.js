const User = require('../../Model/User');
const mongoose = require('mongoose')
module.exports = {
    findAll: async (req, res) => {
        let condition = {}
        // console.log(req.decoded)
        if(req.decoded.company){
            condition['company'] = mongoose.Types.ObjectId(req.decoded.company)
        }
        try {
            let user = await User.find(condition);
            return res.status(200).json({ message: "user List", user: user });
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    },
    findById: async (req, res) => {
        try {
            let user = await User.findById(req.params._id);
            return res.status(200).json({ message: "user", user: user });
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    },
    create: async (req, res) => { 
        try {
            let { name, password, email, company } = req.body;
            let user = await User.findOne({ email });
            if (user) {
                return res.status(400).json({ message: "User is already exists" });
            } else {
                if(!name || !password || !email || !company){
                    return res.status(400).json({ message: "name , password , email and company(company_Id) is required" });
                }
                let userType = "EMPLOYEE";
                user = await User.create({name, password, email, company ,userType });
                return res.status(200).json({ message: "Company Successfully Created", user: user });
            }
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    },
    updateOne: async (req, res) => {
        const url = req.file?.path;
        try {
            let { name, password, email, company } = req.body;
            let user = await User.updateOne(req.params, {name, password, email, company,url });
            // console.log(req.params)
            return res.status(200).json({ message: "Company Successfully Updated", user: user });
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }
}
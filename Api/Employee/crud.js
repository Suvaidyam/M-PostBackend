const User = require('../../Model/User');
const mongoose = require('mongoose')
const fs = require('fs');
const path = require('path');
const { url } = require('inspector');
module.exports = {
    findAll: async (req, res) => {
        let condition = {}
        // console.log(req.decoded)
        if (req.decoded.company) {
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
                if (!name || !password || !email || !company) {
                    return res.status(400).json({ message: "name , password , email and company(company_Id) is required" });
                }
                let userType = "EMPLOYEE";
                user = await User.create({ name, password, email, company, userType });
                return res.status(200).json({ message: "Company Successfully Created", user: user });
            }
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    },
    updateImage: async (req, res) => {
        const url = req.file?.path;
        try {
            let _id = req.decoded._id;
            let user = await User.findById(_id);
            if (user.url.length == '0') {
                let user = await User.updateOne(req.params, { url });
                return res.status(200).json({ message: "Image Successfully Updated", user: user });
            } else if (user.url.length !== '0') {
                let user = await User.findById(_id);
                let imgUrl = user.url;
                if (user) {
                    let url = ""
                    let user = await User.updateOne(req.params, { url });
                    const imagePath = path.join(__dirname, '../../' + imgUrl);
                    if (imgUrl) {
                        fs.unlink(imagePath, (err) => {
                            if (err) {
                                return res.status(400).json({ message: "Path not found", err });
                            }
                        });
                        const url = req.file?.path;
                        let user = await User.updateOne(req.params, { url });
                        return res.status(200).json({ message: "Image Successfully Updated", user: user });
                    }
                }
            } else {
                return res.status(200).json({ message: "imgUrl is require" });
            }
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    },
    deletePhoto: async (req, res) => {
        try {
            let _id = req.decoded._id;
            let user = await User.findById(_id);
            let imgUrl = user.url;
            console.log(imgUrl)
            if (user) {
                const filter = { _id: _id };
                let url = ""
                let user = await User.updateOne(filter, { url });
                const imagePath = path.join(__dirname, '../../' + imgUrl);
                if (imgUrl) {
                    fs.unlink(imagePath, (err) => {
                        if (err) {
                            return res.status(400).json({ message: "Path not found", err });
                        }
                        return res.status(200).json({ message: `File ${imgUrl} has been deleted`, user });
                    });
                } else {
                    return res.status(200).json({ message: "imgUrl is require" });
                }
            }

        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }
}
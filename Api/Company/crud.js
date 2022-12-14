const Company = require('../../Model/Company');
module.exports = {
    findAll: async (req, res) => {
        try {
            let company = await Company.find();
            return res.status(200).json({ message: "Company List", company: company });
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    },
    findById: async (req, res) => {
        try {
            let company = await Company.findById(req.params._id);
            return res.status(200).json({ message: "Company List", company: company });
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    },
    create: async (req, res) => {
        try {
            let { name, code } = req.body;
            let company = await Company.find({ name , code });
            if (company) {
                return res.status(400).json({ message: "Company Code & name is already exists" });
            } else {
                company = await Company.create({ name, code });
                return res.status(200).json({ message: "Company Successfully Created", company: company });
            }
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    },
    updateOne: async (req, res) => {
        try {
            let { name, code } = req.body;
            let company = await Company.updateOne(req.params ,{ name, code });
            return res.status(200).json({ message: "Company Successfully Updated", company: company });
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }
}
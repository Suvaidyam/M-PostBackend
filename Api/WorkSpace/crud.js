const WorkSpace = require('../../Model/WorkSpace');
const Environment = require('../../Model/Environment');
module.exports = {
    findAllWorkSpace: async (req, res) => {
        try {
            let workSpace = await WorkSpace.find();
            return res.status(200).json({ message: "All WorkSpace List", workSpace: workSpace });
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    },
    findWorkSpace: async (req, res) => {
        let _id = req.decoded._id;
        let condition = {
            $or: [
                { created_by: _id },
                { share: { shareId: _id } }
            ],
            deleted: false
        }
        try {
            let workSpace = await WorkSpace.find(condition);
            return res.status(200).json({ message: "WorkSpace List", workSpace: workSpace });
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    },
    postWorkSpace: async (req, res) => {
        try {
            let { name, visibility } = req.body;
            let created_by = req.decoded._id;
            let workSpace = await WorkSpace.findOne({ name, created_by });
            if (workSpace) {
                return res.status(400).json({ message: name + " WorkSpace name is already exists" });
            } else {
                workSpace = await WorkSpace.create({ name, created_by, visibility });
                let workspace_id = workSpace._id
                let environment = await Environment.create({ name: "Globals", created_by, workspace_id });
                return res.status(200).json({ message: "WorkSpace Successfully Created", workSpace: workSpace });
            }
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    },
    putWorkSpace: async (req, res) => {
        try {
            let { name, visibility } = req.body;
            let workSpace = await WorkSpace.updateOne(req.params, { name, visibility });
            return res.status(200).json({ message: "WorkSpace Successfully Updated", workSpace: workSpace });
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    },
    // ============== softPutWorkSpace ==============
    softPutWorkSpace: async (req, res) => {
        try {
            // let { name, visibility } = req.body;
            let workSpace = await WorkSpace.findByIdAndUpdate(req.params, { $set: { deleted: true } }, { new: true });
            return res.status(200).json({ message: "Delete Successfully", workSpace: workSpace });
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    },
    // ============== Restore WorkSpace ==============
    restoreWorkSpace: async (req, res) => {
        try {
            let workSpace = await WorkSpace.findByIdAndUpdate(req.params, { $set: { deleted: false } }, { new: false });
            return res.status(200).json({ message: "Restore Successfully", workSpace: workSpace });
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    },
    deleteWorkSpace: async (req, res) => {
        const { _id } = req.params
        try {
            let workSpace = await WorkSpace.deleteOne({ _id });
            return res.status(200).json({ message: "Delete Successfully", workSpace: workSpace });
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    },
}
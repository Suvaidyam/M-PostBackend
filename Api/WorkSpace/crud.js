const WorkSpace = require('../../Model/WorkSpace');
module.exports = {
    findWorkSpace: async (req, res) => {
        let _id = req.decoded._id;
        try {
            let workSpace = await WorkSpace.find({created_by:_id});
            return res.status(200).json({ message: "workSpace List", workSpace: workSpace });
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    },
    postWorkSpace: async (req, res) => {
        try {
            let { name } = req.body;
            let created_by = req.decoded._id;
            let workSpace = await WorkSpace.findOne({name ,created_by});
            if (workSpace) {
                return res.status(400).json({ message: name +" workSpace name is already exists" });
            } else {
                workSpace = await WorkSpace.create({name , created_by});
                return res.status(200).json({ message: "workSpace Successfully Created", workSpace: workSpace });
            }
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    },
    putWorkSpace: async (req, res) => {
        try {
            let { name} = req.body;
            let workSpace = await WorkSpace.updateOne(req.params ,{name});
            return res.status(200).json({ message: "workSpace Successfully Updated", workSpace: workSpace });
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    },
    deleteWorkSpace:async(req,res)=>{
        const {_id}=req.params
          try {
                let workSpace = await WorkSpace.deleteOne({_id});
                return res.status(200).json({ message: "Delete successfully", workSpace: workSpace });
          } catch (error) {
            return res.status(500).json({ message: error.message });
          }
       },
}
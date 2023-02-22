const SelectedWorkSpace = require('../../Model/SelectedWorkSpace');
module.exports = {
    findSelectedWorkSpace: async (req, res) => {
        let _id = req.decoded._id;
        try {
            let workSpace = await SelectedWorkSpace.find({created_by:_id});
            return res.status(200).json({ message: "workSpace List", workSpace: workSpace });
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    },
    postSelectedWorkSpace: async (req, res) => {
        try {
            let { name , previousSelectedId, WorkSpace_id } = req.body;
            let created_by = req.decoded._id;
            let workSpace = await SelectedWorkSpace.findOne({name, WorkSpace_id,created_by});
            if (workSpace) {
                return res.status(400).json({ message: name +"WorkSpace Already Selected" });
            } else {
                if(previousSelectedId){
                    let workSpace = await SelectedWorkSpace.deleteOne({previousSelectedId,created_by});
                    workSpace = await SelectedWorkSpace.create({name , created_by, WorkSpace_id});
                    return res.status(200).json({ message: "workSpace Selected Successfully", workSpace: workSpace });
                }else{
                    workSpace = await SelectedWorkSpace.create({name , created_by, WorkSpace_id});
                    return res.status(200).json({ message: "WorkSpace Selected Successfully", workSpace: workSpace });
                }
            }
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }
}
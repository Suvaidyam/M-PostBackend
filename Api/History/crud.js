const History = require('../../Model/History');
module.exports = {
    getHistory: async (req, res) => {
        try {
            // workspace_id is provide by user in params => (http://localhost:4000/history/63f44e0acb7605df19646365)
            let {workspace_id} = req.params;
            if(!workspace_id){
                return res.status(200).json({ message: "workspace_id is required"});
            }else{
                let history = await History.find({workspace_id:workspace_id});
                return res.status(200).json({ message: "history List", history: history });
            }
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    },
    postHistory: async (req, res) => {
        try {
            // workspace_id , url and method is provide by user in body
            let {workspace_id ,url , method} = req.body;
            if(!workspace_id || !url || !method){
                return res.status(200).json({ message: "workspace_id , url and method is required"});
            }else{
                let history = await History.create({workspace_id , url, method});
                return res.status(200).json({ message: "History Created Successfully", history: history });
            }
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }
}
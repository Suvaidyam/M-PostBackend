const Environment = require('../../Model/Environment');
module.exports = {
   getEnvironment: async(req,res)=>{
    let created_by = req.decoded._id
      try {
        let environment = await Environment.find({created_by});
        return res.status(200).json({ message: "collection list", environment: environment });
      } catch (error) {
        return res.status(500).json({ message: error.message });
      }
   },
   postEnvironment: async(req,res)=>{
    let created_by = req.decoded._id
    let {name,details,variable,value,current_value} = req.body
      try {
            let environment = await Environment.create({name,variable,value,current_value,created_by,details});
            return res.status(200).json({ message: "environment list", environment: environment });
      } catch (error) {
        return res.status(500).json({ message: error.message });
      }
   },
   putEnvironment: async(req,res)=>{
      try {
            let environment = await Environment.updateOne(req.params,req.body);
            return res.status(200).json({ message: "Update successfully", environment: environment });
      } catch (error) {
        return res.status(500).json({ message: error.message });
      }
   },
   deleteEnvironment: async(req,res)=>{
      try {
            let environment = await Environment.remove(req.params);
            return res.status(200).json({ message: "Delete successfully", environment: environment });
      } catch (error) {
        return res.status(500).json({ message: error.message });
      }
   },
}
const CollectionShow = require('../../Model/CollectionShow');
const mongoose = require('mongoose')
module.exports = {
   getCollectionShow: async(req,res)=>{
    let created_by = req.decoded._id
      try {
        let collection = await CollectionShow.find({created_by});
        return res.status(200).json({ message: "collection list", collection: collection });
      } catch (error) {
        return res.status(500).json({ message: error.message });
      }
   },
   postCollectionShow: async(req,res)=>{
    let created_by = req.decoded._id
    let {name,type,parent,url,method,details} = req.body
      try {
        if(type){
            let collection = await CollectionShow.create({name,type,parent,url,method,created_by,details});
            return res.status(200).json({ message: "collection list", collection: collection });
        }else{
            return res.status(400).json({ message: "type require" });
        }
      } catch (error) {
        return res.status(500).json({ message: error.message });
      }
   }
}
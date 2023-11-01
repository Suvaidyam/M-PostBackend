const Collection = require("../../Model/Collection");
module.exports = {
  getCollection: async (req, res) => {
    try {
      let collection = await Collection.find(req.params);
      // let collection = await Collection.find();
      console.log(req.params)
      return res
        .status(200)
        .json({ message: "Collection list", collection: collection });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
 
  getCollectionById: async (req, res) => {
    try {
      let collection = await Collection.findOne(req.params);
      return res
        .status(200)
        .json({ message: "Collection list", collection });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
  postCollection: async (req, res) => {
    let created_by = req.decoded._id;
    let { name, type, parent, url, method, details, workspace_id } = req.body;
    console.log(type)
    try {
      if (type) {
        let collection = await Collection.create({
          name,
          type,
          parent,
          url,
          method,
          created_by,
          details,
          workspace_id,
        });
        return res
          .status(200)
          .json({
            message: name + " Created Successfully",
            collection: collection,
          });
      } else {
        return res.status(400).json({ message: "File Type Required" });
      }
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
  putCollection: async (req, res) => {
    try {
      let collection = await Collection.updateOne(req.params, req.body);
      // console.log(req.params)
      // console.log(req.body)
      return res
        .status(200)
        .json({ message: "Update Successfully", collection: collection });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
  putResponse: async (req, res) => {
    try {
      // Find the Collection by _id
      const collection = await Collection.findById(req.params);
      if (!collection) {
        throw new Error("Collection not found");
      }
      // Update the response field in the DetailsSchema
      collection.details.response = req.body;
      // Save the updated Collection
      await collection.save();
      return res
        .status(200)
        .json({ message: "Update Successfully", collection: collection });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
  deleteCollection: async (req, res) => {
    const { _id } = req.params;
    try {
      let collection = await Collection.deleteOne({
        $or: [{ _id: _id }, { parent: _id }],
      });
      return res
        .status(200)
        .json({ message: "Delete Successfully", collection: collection });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
};

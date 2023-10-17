const Collection = require("../../Model/Collection");
module.exports = {
  getCollection: async (req, res) => {
    try {
      // console.log(req.query)
      let collection = await Collection.find(req.query);
      // let collection = await Collection.find();
      return res
        .status(200)
        .json({ message: "Collection list", collection: collection });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
  postCollection: async (req, res) => {
    let created_by = req.decoded._id;
    let { name, type, parent, url, method, details, workspace_id } = req.body;
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

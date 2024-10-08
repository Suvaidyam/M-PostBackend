const Collection = require("../../Model/Collection");
module.exports = {
  getCollection: async (req, res) => {
    try {
      let _id = req.decoded._id;
      let condition = {
        ...req.params,
        $or: [
          { created_by: _id },
          { share: { shareId: _id } }
        ],
        deleted: false
      }
      let collection = await Collection.find(condition);
      return res
        .status(200)
        .json({ message: "Collections list", collection: collection });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
  getAllCollection: async (req, res) => {
    try {
      let collection = await Collection.find();
      return res
        .status(200)
        .json({ message: "All Collection list", collection: collection });
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
    const { workspaceData, collectionData } = req.params;
    const workspaceDataString = JSON.parse(workspaceData);
    const collectionDataString = JSON.parse(collectionData);
    // ========== Workspace ===========
    const workspaceRootPermission = workspaceDataString?.created_by === req.decoded._id
    const workspacePermission = workspaceDataString?.share?.some((e) =>
      e?.permission === 'readWrite' && e?.shareId === req.decoded._id
    )
    // ========== Collection ===========
    // const collectionRootPermission = collectionDataString.workspace_id === workspaceDataString._id
    const collectionRootPermission = collectionDataString.created_by === req.decoded._id
    const CollectionPermission = collectionDataString.share.some((e) =>
      e && e.permission === 'readWrite' && e.shareId === req.decoded._id
    );
    let { name, type, parent, url, method, details, workspace_id, share } = req.body;
    try {
      let newName;
      if (type) {
        // ============================= random name logic ====================================
        const exist = await Collection.findOne({ name, created_by, workspace_id }, { _id: 1, name: 1 });
        if (exist !== null) {
          newName = `${name} 1`;
        } else {
          newName = name;
        }
        let nameExists = true;
        do {
          const exist2 = await Collection.findOne({ name: newName, created_by, workspace_id }, { _id: 1, name: 1 });
          if (exist2) {
            if (exist2.name.split(' ').length === 3) {
              newName = `${name} ${Number(exist2.name.split(' ')[2]) + 1}`;
            } else {
              newName = `${name} 1`;
            }
          } else {
            nameExists = false;
          }
        } while (nameExists);
        // ============================= random name logic ====================================
      } else {
        return res.status(400).json({ message: "File Type Required" });
      }
      if (workspaceRootPermission || workspacePermission) {
        if (collectionRootPermission || CollectionPermission) {
          let collection = await Collection.create({
            name: newName,
            type,
            parent,
            url,
            method,
            share,
            created_by,
            details,
            workspace_id,
          });
          return res.status(200).json({
            message: name + " Created Successfully",
            collection: collection,
          });
        } else {
          return res.status(401).json({ message: 'Collection Access Denied' });
        }
      } else {
        return res.status(401).json({ message: 'Workspace Access Denied' });
      }
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
  putCollection: async (req, res) => {
    const { workspaceData, collectionData } = req.params;
    const workspaceDataString = JSON.parse(workspaceData);
    const collectionDataString = JSON.parse(collectionData);
    // ========== Workspace ===========
    const workspaceRootPermission = workspaceDataString?.created_by === req.decoded._id
    const workspacePermission = workspaceDataString?.share?.some((e) =>
      e?.permission === 'readWrite' && e?.shareId === req.decoded._id
    )
    // ========== Collection ===========
    // const collectionRootPermission = collectionDataString.created_by === req.decoded._id
    const collectionRootPermission = collectionDataString.workspace_id === workspaceDataString._id
    const CollectionPermission = collectionDataString.share.some((e) =>
      e && e.permission === 'readWrite' && e.shareId === req.decoded._id
    );
    try {
      if (workspaceRootPermission || workspacePermission) {
        if (collectionRootPermission || CollectionPermission) {
          let collection = await Collection.updateOne(req.params, req.body);
          return res
            .status(200)
            .json({ message: "Update Successfully", collection: collection });
        } else {
          return res.status(401).json({ message: 'Collection Access Denied' });
        }
      } else {
        return res.status(401).json({ message: 'Workspace Access Denied' });
      }
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
  // ==================================== Soft Delete function ====================================
  softDeleteCollection: async (req, res) => {
    const { workspaceData, collectionData, _id } = req.params;
    const workspaceDataString = JSON.parse(workspaceData);
    const collectionDataString = JSON.parse(collectionData);
    // ========== Workspace ===========
    const workspaceRootPermission = workspaceDataString?.created_by === req.decoded._id
    const workspacePermission = workspaceDataString?.share?.some((e) =>
      e?.permission === 'readWrite' && e?.shareId === req.decoded._id
    )
    // ========== Collection ===========
    const collectionRootPermission = collectionDataString.workspace_id === workspaceDataString._id
    const CollectionPermission = collectionDataString.share.some((e) =>
      e && e.permission === 'readWrite' && e.shareId === req.decoded._id
    );
    try {
      if (workspaceRootPermission || workspacePermission) {
        if (collectionRootPermission || CollectionPermission) {
          await Collection.updateMany(
            { $or: [{ _id: _id }] },
            // { $or: [{ _id: _id }, { parent: _id }] },
            { $set: { deleted: true } }
          );
          // Fetch the updated documents
          const updatedCollection = await Collection.find({
            $or: [{ _id: _id }, { parent: _id }],
          });
          return res.status(200).json({ message: "Delete Successfully", collection: updatedCollection });
        } else {
          return res.status(401).json({ message: 'Collection Access Denied' });
        }
      } else {
        return res.status(401).json({ message: 'Workspace Access Denied' });
      }
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
  restore: async (req, res) => {
    try {
      let collection = await Collection.findByIdAndUpdate(req.params, { $set: { deleted: false } }, { new: false });
      return res
        .status(200)
        .json({ message: "Successfully Restore", collection: collection });
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
  putResponseHeaders: async (req, res) => {
    try {
      // Find the Collection by _id
      const collection = await Collection.findById(req.params);
      if (!collection) {
        throw new Error("Collection not found");
      }
      // Update the response field in the DetailsSchema
      collection.details.responseHeaders = req.body;
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
      let collection = await Collection.deleteMany({
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

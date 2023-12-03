const WorkSpace = require('../../Model/WorkSpace')
const Collection = require('../../Model/Collection')
const jwt = require('jsonwebtoken')
module.exports = {
    share_workspace_with_team: async (req, res, next) => {
        try {
            let { workspace } = req.params;
            let { team } = req.body;
        } catch (error) {
        }
    },
    share_workspace_with_individuals: async (req, res, next) => {
        try {
            let { workspace } = req.params;
            let { emails } = req.body;
        } catch (error) {
        }
    },
    share_workspace_with_url: async (req, res, next) => {
        try {
            let { _id, access, share } = req.params;
            if (!_id) {
                return res.status(400).json({ message: "workspace is required field" })
            }
            let workspace = await WorkSpace.findById(_id)
            if (!workspace) {
                return res.status(400).json({ message: "workspace not found" })
            }
            const { JWT_SECRET } = process.env;
            let token = await jwt.sign({ _id, permissions: access, sharing: share, type: 'workspace' }, JWT_SECRET);
            let { BASE_URL } = process.env
            const url = `${BASE_URL}/join/workspace/${_id}?token=${token}`
            return res.status(200).json({ url });
            // return url = `${BASE_URL}/join/workspace/${_id}?token=${token}`
        } catch (error) {
            return res.status(400).json({ message: error.message })
        }
    },
    share_collection_with_team: async (req, res, next) => {
        try {
            let { collection } = req.params;
            let { team } = req.body;
        } catch (error) {
        }
    },
    share_collection_with_individuals: async (req, res, next) => {
        try {
            let { collection } = req.params;
            let { emails } = req.body;
        } catch (error) {
        }
    },
    share_collection_with_url: async (req, res, next) => {
        try {
            let { _id, access, share } = req.params;
            if (!_id) {
                return res.status(400).json({ message: "collection is required field" })
            }
            let collection = await Collection.findById(_id)
            if (!collection) {
                return res.status(400).json({ message: "collection not found" })
            }
            const { JWT_SECRET } = process.env
            let token = await jwt.sign({ _id, permissions: access, sharing: share, type: 'collection' }, JWT_SECRET);
            let { BASE_URL } = process.env
            const url = `${BASE_URL}/join/collection/${_id}?token=${token}`;
            return res.status(200).json({ url });
            // return url = `${BASE_URL}/join/collection/${_id}?token=${token}`
        } catch (error) {
            return res.status(400).json({ message: error.message })
        }
    },
};
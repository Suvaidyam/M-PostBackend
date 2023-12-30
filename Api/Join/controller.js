const WorkSpace = require('../../Model/WorkSpace')
const Collection = require('../../Model/Collection')
const JWT = require('jsonwebtoken')
module.exports = {
    join_team_with_url: async (req, res, next) => {
        try {
            let { workspace } = req.params;
            return url = ''
        } catch (error) {
        }
    },
    join_workspace_with_url: async (req, res, next) => {
        try {
            let { token } = req.params;
            let { JWT_SECRET } = process.env;
            let { _id, permissions, sharing, type } = await JWT.verify(token, JWT_SECRET);
            let workspace = await WorkSpace.findById(_id);
            if (!workspace) {
                return res.status(400).json({ message: 'workspace not found.' })
            }
            let user_id = req.decoded._id;
            // let join = await WorkSpace.updateOne({ _id: workspace._id }, { $addToSet: { share: user_id } });
            const join = await WorkSpace.updateOne(
                { _id: workspace._id },
                {
                    $addToSet: {
                        share: [{ shareId: user_id, permission: permissions, sharing: sharing }]
                    }
                }
            );
            return res.status(200).json({ message: 'workspace is added.' });
        } catch (error) {
            return res.status(400).json({ message: error.message });
        }
    },
    join_collection_with_url: async (req, res, next) => {
        try {
            let { token } = req.params;
            let { JWT_SECRET } = process.env;
            let { _id, permissions, sharing, type } = JWT.verify(token, JWT_SECRET);
            let collection = await Collection.findById(_id, { name: 1 });
            if (!collection) {
                return res.status(400).json({ message: 'Collection not found.' })
            }
            let user_id = req.decoded._id;
            // let join = await Collection.updateOne({ _id: collection._id }, { permission: permissions }, { $addToSet: { share: user_id }, $set: { permission: permissions } });
            // const join = await Collection.updateOne(
            //     { _id: collection._id },
            //     {
            //         $addToSet: { share: user_id },
            //         $set: { permission: permissions },
            //     }
            // );
            const join = await Collection.updateOne(
                { _id: collection._id },
                {
                    $addToSet: {
                        share: [{ shareId: user_id, permission: permissions, sharing: sharing }]
                    }
                }
            );
            return res.status(200).json({ message: 'Collection is added.', join: join });
        } catch (error) {
            // return res.status(400).json({ message: error.message });
            return res.status(400).json({ message: error });
        }
    },
};
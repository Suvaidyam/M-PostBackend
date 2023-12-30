const mongoose = require('mongoose');
const DetailsSchema = new mongoose.Schema({
    url: {
        type: String,
        default: null
    },
    method: {
        type: String,
        enum: ["get", "post", "put", "delete"],
        default: "get"
    },
    query: {
        type: {},
        default: null
    },
    body: {
        type: {},
        default: null
    },
    headers: {
        type: {},
        default: null
    },
    response: {
        type: {},
        default: null
    },
    responseHeaders: {
        type: {},
        default: null
    },
    deleted: {
        type: Boolean,
        default: false
    },
})
const CollectionSchema = new mongoose.Schema({
    name: {
        type: String,
        default: "New Collection"
    },
    parent: {
        default: null,
        type: mongoose.Schema.Types.ObjectId, ref: 'Collection', required: false
    },
    type: {
        type: String,
        enum: ["collection", "folder", "request"],
        required: true
    },
    created_by: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    workspace_id: { type: mongoose.Schema.Types.ObjectId, ref: 'WorkSpace', required: true },
    // share: {
    //     type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    //     default: []
    // },
    share: {
        type: [{
            shareId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User'
            },
            permission: {
                type: String,
                default: null
            },
            sharing: {
                type: Boolean,
                default: false
            }
        }],
        default: []
    },
    deleted: {
        type: Boolean,
        default: false
    },
    details: {
        type: DetailsSchema,
        default: null
    }
});

const Collection = mongoose.model('Collection', CollectionSchema)

module.exports = Collection
module.exports.DetailsSchema = DetailsSchema;
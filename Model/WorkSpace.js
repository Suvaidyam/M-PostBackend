const mongoose = require('mongoose');

const WorkSpaceSchema = new mongoose.Schema({
    name: {
        type: String,
        default: "My Workspace"
    },
    created_by: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    visibility: {
        type: String,
        enum: ["PERSONAL", "TEAM", "PUBLIC"],
        default: "PERSONAL"
    },
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
});

const WorkSpace = mongoose.model('WorkSpace', WorkSpaceSchema)

module.exports = WorkSpace
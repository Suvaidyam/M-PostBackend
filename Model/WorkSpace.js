const mongoose = require('mongoose');

const WorkSpaceSchema = new mongoose.Schema({
    name: {
        type: String,
        default:"My Workspace"
    },
    created_by: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    visibility:{
        type:String,
        enum:["PERSONAL", "TEAM","PUBLIC"],
        default:"PERSONAL"
    },
    share:{
        type:[{ type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
        default:[]
    },
});

const WorkSpace = mongoose.model('WorkSpace', WorkSpaceSchema)

module.exports = WorkSpace
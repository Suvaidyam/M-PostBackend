const mongoose = require('mongoose');

const WorkSpaceSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    created_by: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    visibility:{
        type:String,
        enum:["PERSONAL", "TEAM","PUBLIC"],
        default:"PERSONAL"
    }

});

const WorkSpace = mongoose.model('WorkSpace', WorkSpaceSchema)

module.exports = WorkSpace
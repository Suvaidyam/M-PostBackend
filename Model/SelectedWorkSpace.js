const mongoose = require('mongoose');

const SelectedWorkSpaceSchema = new mongoose.Schema({
    name: {
        type: String,
        default:"My Workspace"
    },
    created_by: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    WorkSpace_id: { type: mongoose.Schema.Types.ObjectId, ref: 'WorkSpace', required: true },
 
});

const SelectedWorkSpace = mongoose.model('SelectedWorkSpace', SelectedWorkSpaceSchema)

module.exports = SelectedWorkSpace
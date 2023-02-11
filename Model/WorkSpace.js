const mongoose = require('mongoose');

const WorkSpaceSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    created_by: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }

});

const WorkSpace = mongoose.model('WorkSpace', WorkSpaceSchema)

module.exports = WorkSpace
const mongoose = require('mongoose');

const environmentSchema = new mongoose.Schema({
    name: {
        type: String,
        enum: ["New Environment", "Globals"],
        default: "New Environment"
    },
    deleted: {
        type: Boolean,
        default: false
    },
    workspace_id: { type: mongoose.Schema.Types.ObjectId, ref: 'WorkSpace', required: true },
    details: {
        type: [{
            variable: {
                type: String,
                default: null
            },
            value: {
                type: String,
                default: null
            },
            current_value: {
                type: String,
                default: null
            },
        }],
        default: null
    },
    created_by: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }

});

const Environment = mongoose.model('environment', environmentSchema)

module.exports = Environment
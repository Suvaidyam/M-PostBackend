const mongoose = require('mongoose');
const {DetailsSchema} = require('./Collection')
const historySchema = new mongoose.Schema({

    workspace_id:{
        type: mongoose.Schema.Types.ObjectId, ref: 'WorkSpace',
        required: true
    },
    request_id:{
        type: mongoose.Schema.Types.ObjectId, ref: 'Collection',
        required: true
    },
    details: {
        type:DetailsSchema,
        default:null
    },
    created_by: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    created_At: { 
        type: Date,
        default: Date.now
    }
});

const History = mongoose.model('history', historySchema)

module.exports = History
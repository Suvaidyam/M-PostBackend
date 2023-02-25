const mongoose = require('mongoose');

const historySchema = new mongoose.Schema({

    workspace_id:{
        type: mongoose.Schema.Types.ObjectId, ref: 'WorkSpace',
        required: true
    },
    url:{
        type:String,
        require:true
    },
    method:{
        type:String,
        require:true
    },
    created_At: { 
        type: Date,
        default: Date.now
    }

});

const History = mongoose.model('history', historySchema)

module.exports = History
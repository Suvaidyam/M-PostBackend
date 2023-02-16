const mongoose = require('mongoose');

const environmentSchema = new mongoose.Schema({
    collectionId:{type:mongoose.Schema.Types.ObjectId,ref:'Collection',default:null},
    name: {
        type: String,
        default:"New Environment"
    },
    details: {
        type:[{
            variable:{
                type:String,
                default:null
            },
            value:{
                type:String,
                default:null
            },
            current_value:{
                type:String,
                default:null
            },
        }],
        default:null
    },
    created_by: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true } ,
    workspace_id:{type: mongoose.Schema.Types.ObjectId, ref: 'WorkSpace', required: true}
});

const Environment = mongoose.model('environment', environmentSchema)

module.exports = Environment
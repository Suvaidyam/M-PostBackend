const mongoose = require('mongoose');

const CollectionSchema = new mongoose.Schema({
    name: {
        type: String,
        enum:["New Collection","New Request"],
        default:"New Collection"
    },
    parent: {
        default:null,
        type: mongoose.Schema.Types.ObjectId, ref: 'Collection', required: false 
    },
    type: {
        type: String,
        enum:["collection","folder", "request"],
        required:true
    }, 
    created_by: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }   ,
    details: {
        type:{
            url: {
                type:String,
                default:null
            },
            method: {
                type: String,
                enum:["GET", "POST","PUT","DELETE"],
                default:"GET"
            },
            query: {
                type:{},
                default:null
            },
            body: {
                type:{},
                default:null
            },
            headers: {
                type:{},
                default:null
            }
        },
        default:null
        
    }

});

const Collection = mongoose.model('Collection', CollectionSchema)

module.exports = Collection
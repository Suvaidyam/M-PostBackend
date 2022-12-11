const mongoose = require('mongoose');

const collectionShowSchema = new mongoose.Schema({
    company: { type: mongoose.Schema.Types.ObjectId, ref: 'Company', required:true }, // Reference of Company schema
    collection: { type: mongoose.Schema.Types.ObjectId, ref: 'Collection' , required:true}, // Reference of CompanySpace schema
    created_by: { type: mongoose.Schema.Types.ObjectId, ref: 'User',required:true }, // Reference of User schema
    bookedAt: { type: Date, default: Date.now },
    deletedAt: { type: Date, default: null },
    deleted: { type: Boolean, default: false }
});

const CollectionShow = mongoose.model('CollectionShowSchema', collectionShowSchema)

module.exports = CollectionShow
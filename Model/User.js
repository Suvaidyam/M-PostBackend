const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    url:{
        type:String,
        default:""
    },
    gender:{
        type:String,
        enum:["male", "female","other"],
        require: true
    }
});

const User = mongoose.model('user', userSchema)

module.exports = User
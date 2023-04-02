const mongoose = require('mongoose');
const { DB_URI_STRING } = process.env;
// console.log(DB_URI_STRING);
mongoose.connect(DB_URI_STRING, {

}, (err) => {
    if (!err) {
        console.log('MongoDB Connection Succeeded.')
    } else {
        console.log('Error in DB connection: ' + err)
    }
});
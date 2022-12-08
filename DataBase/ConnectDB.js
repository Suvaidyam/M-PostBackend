const mongoose = require('mongoose');
const { DB_URI_STRING } = process.env;
// Connect MongoDB at default port 27017.
mongoose.connect(DB_URI_STRING, {

}, (err) => {
    if (!err) {
        console.log('MongoDB Connection Succeeded.')
    } else {
        console.log('Error in DB connection: ' + err)
    }
});
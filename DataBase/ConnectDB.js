const mongoose = require('mongoose');

// Connect MongoDB at default port 27017.
mongoose.connect('mongodb+srv://07rahul:Rahul321@m-post.7vadyub.mongodb.net/?retryWrites=true&w=majority', {

}, (err) => {
    if (!err) {
        console.log('MongoDB Connection Succeeded.')
    } else {
        console.log('Error in DB connection: ' + err)
    }
});
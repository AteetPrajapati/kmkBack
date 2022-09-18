const mongoose = require('mongoose');

// assign url
const mongoURI = 'mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false'

// connect mongoDB with express server
const connectToMongo = () => {
    mongoose.connect(mongoURI, () => {
        console.log('Connect To Mongo Succesfully');
    })
}

module.exports = connectToMongo;
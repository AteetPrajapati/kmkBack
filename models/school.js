const mongoose = require('mongoose');
const { Schema } = mongoose;

const schoolSchema = new Schema({
    school_type: {                  //Type: School/College
        type: String,
        required: true
    },
    dise_no: {      
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    principle_name: {
        type: String,
        required: true
    },
    principle_mobile: {
        type: Number,
        required: true
    },
    pt_teacher: {
        type: String,
        required: true
    },
    pt_teacher_mobile: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true  //email id unique
    },
    district: {
        type: String,
        required: true
    },
    taluka: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    pincode: {
        type: Number,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

const School = mongoose.model('School', schoolSchema);

module.exports = School;
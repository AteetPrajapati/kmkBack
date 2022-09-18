const mongoose = require('mongoose');
const { Schema } = mongoose;

const playerSchema = new Schema({
    first_name: {
        type: String,
        required: true
    },
    middle_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    gender: String,
    dob: Date,
    contact_no: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
    },
    weight: Number,
    height: Number,
    adhar_card: String,
    taluka: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    parents_details: {
        first_name: String,
        last_name: String,
        contact_no: String
    },
    bank_details: {
        bank: String,
        branch: String,
        account_holder: String,
        ifsc_code: String,
        account_no: {
            type: String,
            minLength: 9,
            maxLength: 18
        },
    }
});

module.exports = playerSchema;

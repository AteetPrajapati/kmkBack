const mongoose = require('mongoose');
const { Schema } = mongoose;
const playerSchema = require('./playerSchema');

const soloSchema = new Schema({
    player_details: playerSchema,
    game_details: {
        game: String,
        sub_game: String,
        age_group: String,
    },
    coach_details: {
        coach_name: String,
        contact_no: String,
        address: String
    },
    school: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'school'
    },
    approved: {
        type: Boolean,
        default: false
    }
});


const Solo = mongoose.model('Solo', soloSchema);

module.exports = Solo;
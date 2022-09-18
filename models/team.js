const mongoose = require('mongoose');
const { Schema } = mongoose; 
const playerSchema = require('./playerSchema');

var teamSchema = new Schema({
    team_name: {
        type: String,
        required: true
    },
    team_gender: {
        type: String,
        required: true,
    },
    game_details: {
        age_group: String,
        game: String,
        sub_game: String,
        team_size: Number
    },
    player_details:[playerSchema],
    coach_details:{
        coach_name: String,
        contact_no: String,
        address: String
    },
    school_id: String,
    approved: {
        type: Boolean,
        default: false
    }
});

const Team = mongoose.model('Team', teamSchema);

module.exports = Team;
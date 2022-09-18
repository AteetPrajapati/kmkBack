const mongoose = require('mongoose');
const { Schema } = mongoose;

const gameSchema = new Schema({
    name: String,
    about: String,
    sub_games: [{
        type: String,
    }],
    type: String,     //indoor/outdoor
    image: String,
    link: [{
        type: String,
    }]
});

const Game = mongoose.model('Game', gameSchema);

module.exports = Game;

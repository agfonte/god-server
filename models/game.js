const mongoose = require('mongoose');
const User = require('./user')

const {
    Schema
} = mongoose;

const Game = new Schema({
    user1: {
        type: User,
        required: true
    },
    user2: {
        type: User,
        required: true
    },
    final: {
        type: Object
    }
});

module.exports = mongoose.model('Game', Game);
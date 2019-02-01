const mongoose = require('mongoose');

const {
    Schema
} = mongoose;

const Moves = new Schema({
    move: {
        type: Array,
        required: true
    }
});

module.exports = mongoose.model('Move', Moves);;
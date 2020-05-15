const mongoose = require('mongoose');

const honorsSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    type: {
        type: Number,
        required: true
    },
    circulation: {
        type: Number,
        required: true
    },
    rarity: {
        type: String,
        required: true
    }
});

const honors = module.exports = mongoose.model('honors', honorsSchema);
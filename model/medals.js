const mongoose = require('mongoose');

const medalsSchema = mongoose.Schema({
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

const medals = module.exports = mongoose.model('medals', medalsSchema);
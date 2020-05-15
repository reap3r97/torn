const mongoose = require('mongoose');

const gymSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    stage: {
        type: Number,
        required: true
    },
    cost: {
        type: Number,
        required: true
    },
    energy: {
        type: Number,
        required: true
    },
    strength: {
        type: Number,
        required: true
    },
    defense: {
        type: Number,
        required: true
    },
    speed: {
        type: Number,
        required: true
    },
    dexterity: {
        type: Number,
        required: true
    },
    note: {
        type: Number,
        required: true
    }
});

const gym = module.exports = mongoose.model('gym', gymSchema);
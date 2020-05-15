const mongoose = require('mongoose');

const factionTreeSchema = mongoose.Schema({
    branch: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    ability: {
        type: Number,
        required: true
    },
    challenge: {
        type: Number,
        required: true
    },
    base_cost: {
        type: Number,
        required: true
    }
});

const factionTree = module.exports = mongoose.model('factionTree', factionTreeSchema);
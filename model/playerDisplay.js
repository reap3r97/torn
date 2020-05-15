const mongoose = require('mongoose');

const playerDisplaySchema = mongoose.Schema({
    playerId: {
        type: Number,
        required: true
    },
    display: [{
        ID: {
            type: Number,
            required: true
        },
        name: {
            type: String,
            required: true
        },
        type: {
            type: String,
            required: true
        },
        quantity: {
            type: Number,
            required: true
        },
        circulation: {
            type: Number,
            required: true
        },
        market_price: {
            type: Number,
            required: true
        },
    }]
});

const playerDisplay = module.exports = mongoose.model('playerDisplay', playerDisplaySchema);
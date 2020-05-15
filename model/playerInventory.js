const mongoose = require('mongoose');

const playerInventorySchema = mongoose.Schema({
    playerId: {
        type: Number,
        required: true
    },
    inventory: [{
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
        equipped: {
            type: Number,
            required: true
        },
        market_price: {
            type: Number,
            required: true
        },
    }]
});

const playerInventory = module.exports = mongoose.model('playerInventory', playerInventorySchema);
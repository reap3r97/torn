const mongoose = require('mongoose');

const itemsSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    effect: {
        type: String,
        required: true
    },
    requirement: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    weapon_type: {
        type: String,
        required: true
    },
    buy_price: {
        type: Number,
        required: true
    },
    sell_price: {
        type: Number,
        required: true
    },
    market_value: {
        type: Number,
        required: true
    },
    circulation: {
        type: Number,
        required: true
    },
});

const items = module.exports = mongoose.model('items', itemsSchema);
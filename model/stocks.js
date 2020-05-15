const mongoose = require('mongoose');

const stocksSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    acronym: {
        type: String,
        required: true
    },
    director: {
        type: String,
        required: true
    },
    current_price: {
        type: String,
        required: true
    },
    market_cap: {
        type: Number,
        required: true
    },
    total_shares: {
        type: Number,
        required: true
    },
    available_shares: {
        type: Number,
        required: true
    },
    forecast: {
        type: String,
        required: true
    },
    demand: {
        type: String,
        required: true
    },
});

const stocks = module.exports = mongoose.model('stocks', stocksSchema);
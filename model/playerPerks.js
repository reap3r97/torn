const mongoose = require('mongoose');

const playerPerksSchema = mongoose.Schema({
    playerId: {
        type: Number,
        required: true
    },
    job_perks: {
        type: Number,
        required: true
    },
    property_perks: {
        type: Number,
        required: true
    },
    stock_perks: {
        type: Number,
        required: true
    },
    merit_perks: {
        type: Number,
        required: true
    },
    education_perks: {
        type: Number,
        required: true
    },
    enhancer_perks: {
        type: Number,
        required: true
    },
    company_perks: {
        type: Number,
        required: true
    },
    faction_perks: {
        type: Number,
        required: true
    },
    book_perks: {
        type: Number,
        required: true
    }
});

const playerPerks = module.exports = mongoose.model('playerPerks', playerPerksSchema);
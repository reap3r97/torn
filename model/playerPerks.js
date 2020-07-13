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
    },
    createdAt:{
        type: Date,
        default: Date.now
    },
    updatedAt:{
        type: Date
    }
});

const playerPerks = module.exports = mongoose.model('playerPerks', playerPerksSchema);
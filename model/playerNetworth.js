const mongoose = require('mongoose');

const playerNetworthSchema = mongoose.Schema({
    playerId: {
        type: Number,
        required: true
    },
    pending: {
        type: Number,
        required: true
    },
    wallet: {
        type: Number,
        required: true
    },
    bank: {
        type: Number,
        required: true
    },
    points: {
        type: Number,
        required: true
    },
    cayman: {
        type: Number,
        required: true
    },
    vault: {
        type: Number,
        required: true
    },
    piggybank: {
        type: Number,
        required: true
    },
    items: {
        type: Number,
        required: true
    },
    displaycase: {
        type: Number,
        required: true
    },
    bazaar: {
        type: Number,
        required: true
    },
    properties: {
        type: Number,
        required: true
    },
    stockmarket: {
        type: Number,
        required: true
    },
    auctionhouse: {
        type: Number,
        required: true
    },
    company: {
        type: Number,
        required: true
    },
    bookie: {
        type: Number,
        required: true
    },
    loan: {
        type: Number,
        required: true
    },
    unpaidfees: {
        type: Number,
        required: true
    },
    total: {
        type: Number,
        required: true
    },
    parsetime: {
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

const playerNetworth = module.exports = mongoose.model('playerNetworth', playerNetworthSchema);
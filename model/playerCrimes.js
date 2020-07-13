const mongoose = require('mongoose');

const playerCrimesSchema = mongoose.Schema({
    playerId: {
        type: Number,
        required: true
    },
    criminalrecord: {
        selling_illegal_products: {
            type: Number,
            required: true
        },
        theft: {
            type: Number,
            required: true
        },
        auto_theft: {
            type: Number,
            required: true
        },
        drug_deals: {
            type: Number,
            required: true
        },
        computer_crimes: {
            type: Number,
            required: true
        },
        murder: {
            type: Number,
            required: true
        },
        fraud_crimes: {
            type: Number,
            required: true
        },
        other: {
            type: Number,
            required: true
        },
        total: {
            type: Number,
            required: true
        }
    },
    createdAt:{
        type: Date,
        default: Date.now
    },
    updatedAt:{
        type: Date
    }
});

const playerCrimes = module.exports = mongoose.model('playerCrimes', playerCrimesSchema);
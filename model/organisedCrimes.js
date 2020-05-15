const mongoose = require('mongoose');

const organisedCrimesSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    members: {
        type: Number,
        required: true
    },
    time: {
        type: Number,
        required: true
    },
    min_cash: {
        type: Number,
        required: true
    },
    max_cash: {
        type: String,
        required: true
    },
    min_respect: {
        type: Number,
        required: true
    },
    max_respect: {
        type: String,
        required: true
    }
});

const organisedCrimes = module.exports = mongoose.model('ogranisedCrimes', organisedCrimesSchema);
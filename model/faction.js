const mongoose = require('mongoose');

const factionSchema = mongoose.Schema({
    ID: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    leaderId: {
        type: Number,
        required: true
    },
    coleaderId: {
        type: Number,
        required: true
    },
    respect: {
        type: Number,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    best_chain: {
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

const faction = module.exports = mongoose.model('faction', factionSchema);
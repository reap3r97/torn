const mongoose = require('mongoose');

const propertiesSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    cost: {
        type: Number,
        required: true
    },
    happy: {
        type: Number,
        required: true
    },
    upkeep: {
        type: Number,
        required: true
    },
    upgrades_available: [{
        type: String,
        required: true
    }],
    staff_available: [{
        type: Number,
        required: true
    }],
    createdAt:{
        type: Date,
        default: Date.now
    },
    updatedAt:{
        type: Date
    }
});

const properties = module.exports = mongoose.model('properties', propertiesSchema);
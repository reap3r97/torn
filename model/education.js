const mongoose = require('mongoose');

const educationSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    money_cost: {
        type: Number,
        required: true
    },
    tier: {
        type: Number,
        required: true
    },
    duration: {
        type: Number,
        required: true
    }
});

const education = module.exports = mongoose.model('education', educationSchema);
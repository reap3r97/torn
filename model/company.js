const mongoose = require('mongoose');

const companySchema = mongoose.Schema({
    ID: {
        type: Number,
        required: true
    },
    rating: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    directorId: {
        type: Number,
        required: true
    },
    employees_hired: {
        type: Number,
        required: true
    },
    employees_capacity: {
        type: Number,
        required: true
    },
    daily_profit: {
        type: Number,
        required: true
    },
    weekly_profit: {
        type: Number,
        required: true
    },
    daily_customers: {
        type: Number,
        required: true
    },
    weekly_customers: {
        type: Number,
        required: true
    },
    days_old: {
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

const company = module.exports = mongoose.model('company', companySchema);
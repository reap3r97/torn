const mongoose = require('mongoose');

const playerPropertySchema = mongoose.Schema({
    owner_id: {
        type: Number,
        required: true
    },
    property_type: {
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
    upgrades: [{
        type: String,
        required: true
    }],
    staff: [{
        type: String,
        required: true
    }],
    rented: {
        user_id:{
            type: Number,
            required: true
        },
        days_left:{
            type: Number,
            required: true
        },
        total_cost:{
            type: Number,
            required: true
        },
        cost_per_day:{
            type: Number,
            required: true
        }
    },
    users_living: {
        type: String,
        required: true
    }
});

const playerProperty = module.exports = mongoose.model('playerProperty', playerPropertySchema);
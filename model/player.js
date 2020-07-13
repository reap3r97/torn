const mongoose = require('mongoose');

const playerSchema = mongoose.Schema({
    rank: {
        type: String,
        required: true
    },
    level: {
        type: Number,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    property: {
        type: String,
        required: true
    },
    signup: {
        type: Date,
        required: true
    },
    awards: {
        type: Number,
        required: true
    },
    friends: {
        type: Number,
        required: true
    },
    enemies: {
        type: Number,
        required: true
    },
    forum_posts: {
        type: Number,
        required: true
    },
    karma: {
        type: Number,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    role: {
        type: String,
        required: true
    },
    playerId: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    property_id: {
        type: Number,
        required: true
    },
    life: {
        current: {
            type: Number,
            required: true
        },
        maximum: {
            type: Number,
            required: true
        },
        increment: {
            type: Number,
            required: true
        },
        interval: {
            type: Number,
            required: true
        },
        ticktime: {
            type: Number,
            required: true
        },
        fulltime: {
            type: Number,
            required: true
        },
    },
    status: {
        description: {
            type: String,
            required: true
        },
        details: {
            type: String,
            required: true
        },
        state: {
            type: String,
            required: true
        },
        color: {
            type: String,
            required: true
        },
        until: {
            type: Number,
            required: true
        },
    },
    job: {
        position: {
            type: String,
            required: true
        },
        company_id: {
            type: Number,
            required: true
        },
        company_name: {
            type: String,
            required: true
        },
    },
    faction: {
        factionPosition: {
            type: String,
            required: true
        },
        faction_id: {
            type: Number,
            required: true
        },
        days_in_faction: {
            type: Number,
            required: true
        },
        faction_name: {
            type: String,
            required: true
        },
    },
    married: {
        spouse_id: {
            type: String,
            required: true
        },
        spouse_name: {
            type: String,
            required: true
        },
        duration: {
            type: String,
            required: true
        },
    },
    states: {
        hospital_timestamp: {
            type: Number,
            required: true
        },
        jail_timestamp: {
            type: Number,
            required: true
        },
    },
    last_action: {
        status: {
            type: String,
            required: true
        },
        timestamp: {
            type: Number,
            required: true
        },
        relative: {
            type: String,
            required: true
        },
    },
    createdAt:{
        type: Date,
        default: Date.now
    },
    updatedAt:{
        type: Date
    }
});

const Player = module.exports = mongoose.model('Player', playerSchema);
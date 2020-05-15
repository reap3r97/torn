const mongoose = require('mongoose');

const overallStatsSchema = mongoose.Schema({
    timestamp: {
        type: Number,
        required: true
    },
    users_total: {
        type: Number,
        required: true
    },
    users_male: {
        type: Number,
        required: true
    },
    users_female: {
        type: Number,
        required: true
    },
    users_marriedcouples: {
        type: Number,
        required: true
    },
    users_daily: {
        type: Number,
        required: true
    },
    total_users_logins: {
        type: Number,
        required: true
    },
    total_users_playtime: {
        type: Number,
        required: true
    },
    job_army: {
        type: Number,
        required: true
    },
    job_grocer: {
        type: Number,
        required: true
    },
    job_medical: {
        type: Number,
        required: true
    },
    job_casino: {
        type: Number,
        required: true
    },
    job_education: {
        type: Number,
        required: true
    },
    job_law: {
        type: Number,
        required: true
    },
    job_company: {
        type: Number,
        required: true
    },
    job_none: {
        type: Number,
        required: true
    },
    crimes: {
        type: Number,
        required: true
    },
    jailed: {
        type: Number,
        required: true
    },
    money_onhand: {
        type: Number,
        required: true
    },
    money_average: {
        type: Number,
        required: true
    },
    money_citybank: {
        type: Number,
        required: true
    },
    items: {
        type: Number,
        required: true
    },
    events: {
        type: Number,
        required: true
    },
    points_total: {
        type: Number,
        required: true
    },
    points_market: {
        type: Number,
        required: true
    },
    points_averagecost: {
        type: Number,
        required: true
    },
    points_bought: {
        type: Number,
        required: true
    },
    total_points_boughttotal: {
        type: Number,
        required: true
    },
    total_attacks_won: {
        type: Number,
        required: true
    },
    total_attacks_lost: {
        type: Number,
        required: true
    },
    total_attacks_stalemated: {
        type: Number,
        required: true
    },
    total_attacks_runaway: {
        type: Number,
        required: true
    },
    total_attacks_hits: {
        type: Number,
        required: true
    },
    total_attacks_misses: {
        type: Number,
        required: true
    },
    total_attacks_criticalhits: {
        type: Number,
        required: true
    },
    total_attacks_roundsfired: {
        type: Number,
        required: true
    },
    total_attacks_stealthed: {
        type: Number,
        required: true
    },
    total_attacks_moneymugged: {
        type: Number,
        required: true
    },
    total_attacks_respectgained: {
        type: Number,
        required: true
    },
    total_items_marketbought: {
        type: Number,
        required: true
    },
    total_items_bazaarbought: {
        type: Number,
        required: true
    },
    total_items_auctionswon: {
        type: Number,
        required: true
    },
    total_items_sent: {
        type: Number,
        required: true
    },
    total_trades: {
        type: Number,
        required: true
    },
    total_items_bazaarincome: {
        type: Number,
        required: true
    },
    total_items_cityfinds: {
        type: Number,
        required: true
    },
    total_items_dumpfinds: {
        type: Number,
        required: true
    },
    total_items_dumped: {
        type: Number,
        required: true
    },
    total_jail_jailed: {
        type: Number,
        required: true
    },
    total_jail_busted: {
        type: Number,
        required: true
    },
    total_jail_busts: {
        type: Number,
        required: true
    },
    total_jail_bailed: {
        type: Number,
        required: true
    },
    total_jail_bailcosts: {
        type: Number,
        required: true
    },
    total_hospital_trips: {
        type: Number,
        required: true
    },
    total_hospital_medicalitemsused: {
        type: Number,
        required: true
    },
    total_hospital_revived: {
        type: Number,
        required: true
    },
    total_mails_sent: {
        type: Number,
        required: true
    },
    total_mails_sent_friends: {
        type: Number,
        required: true
    },
    total_mails_sent_faction: {
        type: Number,
        required: true
    },
    total_mails_sent_company: {
        type: Number,
        required: true
    },
    total_mails_sent_spouse: {
        type: Number,
        required: true
    },
    total_classifiedads_placed: {
        type: Number,
        required: true
    },
    total_bounty_placed: {
        type: Number,
        required: true
    },
    total_bounty_rewards: {
        type: Number,
        required: true
    },
    total_travel_all: {
        type: Number,
        required: true
    },
    total_travel_argentina: {
        type: Number,
        required: true
    },
    total_travel_mexico: {
        type: Number,
        required: true
    },
    total_travel_dubai: {
        type: Number,
        required: true
    },
    total_travel_hawaii: {
        type: Number,
        required: true
    },
    total_travel_japan: {
        type: Number,
        required: true
    },
    total_travel_unitedkingdom: {
        type: Number,
        required: true
    },
    total_travel_southafrica: {
        type: Number,
        required: true
    },
    total_travel_switzerland: {
        type: Number,
        required: true
    },
    total_travel_china: {
        type: Number,
        required: true
    },
    total_travel_canada: {
        type: Number,
        required: true
    },
    total_travel_caymanislands: {
        type: Number,
        required: true
    },
    total_drugs_used: {
        type: Number,
        required: true
    },
    total_drugs_overdosed: {
        type: Number,
        required: true
    },
    total_drugs_cannabis: {
        type: Number,
        required: true
    },
    total_drugs_ecstacy: {
        type: Number,
        required: true
    },
    total_drugs_ketamine: {
        type: Number,
        required: true
    },
    total_drugs_lsd: {
        type: Number,
        required: true
    },
    total_drugs_opium: {
        type: Number,
        required: true
    },
    total_drugs_shrooms: {
        type: Number,
        required: true
    },
    total_drugs_speed: {
        type: Number,
        required: true
    },
    total_drugs_pcp: {
        type: Number,
        required: true
    },
    total_drugs_xanax: {
        type: Number,
        required: true
    },
    total_drugs_vicodin: {
        type: Number,
        required: true
    },
    total_merits_bought: {
        type: Number,
        required: true
    },
    total_refills_bought: {
        type: Number,
        required: true
    },
    total_company_trains: {
        type: Number,
        required: true
    },
    total_statenhancers_used: {
        type: Number,
        required: true
    }
});

const overallStats = module.exports = mongoose.model('overallStats', overallStatsSchema);
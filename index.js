var express = require('express');
var mongoose = require('mongoose');
const config = require('./config/database');
var bodyparser = require('body-parser');
var cors = require('cors');

var app = express();

const playerRoute = require('./routes/player/player');
const playerAmmoRoute = require('./routes/player/playerAmmo');
const playerBarsRoute = require('./routes/player/playerBars');
const playerBattlestatsRoute = require('./routes/player/playerBattlestats');
const playerCooldownsRoute = require('./routes/player/playerCooldowns');
const playerCrimesRoute = require('./routes/player/playerCrimes');
const playerDiscordRoute = require('./routes/player/playerDiscord');
const playerDisplayRoute = require('./routes/player/playerDisplay');
const playerInventoryRoute = require('./routes/player/playerInventory');
const playerMeritsRoute = require('./routes/player/playerMerits');
const playerMoneyRoute = require('./routes/player/playerMoney');
const playerNetworthRoute = require('./routes/player/playerNetworth');
const playerPerksRoute = require('./routes/player/playerPerks');
const playerPersonalStatsRoute = require('./routes/player/playerPersonalStats');
const playerPropertyRoute = require('./routes/player/playerProperty');
const factionRoute = require('./routes/faction/faction');
const companyRoute = require('./routes/company/company');
const overallStatsRoute = require('./routes/overallStats');

mongoose.connect(config.database, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

mongoose.connection.on('connected', () => {
    console.log('Db is live > ' + config.database);
});

mongoose.connection.on('error', (err) => {
    console.log('DB conn. failed : ' + err);
});

const PORT = process.env.PORT || 3000;

app.use(cors());

app.use(bodyparser.json());

app.use("/player", playerRoute);
app.use("/playerAmmo", playerAmmoRoute);
app.use("/playerBars", playerBarsRoute);
app.use("/playerBattlestats", playerBattlestatsRoute);
app.use("/playerCooldowns", playerCooldownsRoute);
app.use("/playerCrimes", playerCrimesRoute);
app.use("/playerDiscord", playerDiscordRoute);
app.use("/playerDisplay", playerDisplayRoute);
app.use("/playerInventory", playerInventoryRoute);
app.use("/playerMerits", playerMeritsRoute);
app.use("/playerMoney", playerMoneyRoute);
app.use("/playerNetworth", playerNetworthRoute);
app.use("/playerPerks", playerPerksRoute);
app.use("/playerPersonalStats", playerPersonalStatsRoute);
app.use("/playerProperty", playerPropertyRoute);
app.use("/faction", factionRoute);
app.use("/company", companyRoute);
app.use("/overallStats", overallStatsRoute);

app.listen(PORT, () => {
    console.log('server started at port' + PORT);
});


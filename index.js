var express = require('express');
var mongoose = require('mongoose');
const config = require('./config/database');
var bodyparser = require('body-parser');
var cors = require('cors');

var app = express();

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

app.listen(PORT, () => {
    console.log('server started at port' + PORT);
});

const express = require('express');

const apiV1 = require('./api/v1');
const app = express();

app.use(express.json());
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.use('/api/v1', apiV1);

app.use(express.static('./dist'));


module.exports.start = () => app.listen(9999);
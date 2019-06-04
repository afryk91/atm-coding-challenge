const express = require('express');

const apiV1 = require('./api/v1');
const app = express();

app.use(express.json());
app.use('/api/v1', apiV1);

module.exports.start = () => app.listen(9999);
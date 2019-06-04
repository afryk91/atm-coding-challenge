const Router = require('express').Router();
const withdraw = require('./routes/withdraw');

Router.post('/withdraw', withdraw);

module.exports = Router;
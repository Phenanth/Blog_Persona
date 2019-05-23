'use strict'

const Express = require('express');
const router = Express.Router();
const dbLoginHelper = require('./db/dbLoginHelper.js');
const dbTagHelper = require('./db/dbTagHelper.js')

dbLoginHelper(router);
dbTagHelper(router);

module.exports = router;

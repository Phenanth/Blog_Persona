'use strict'

const Express = require('express');
const router = Express.Router();
const fs = require('fs');
const marked = require( "marked" );
const dbLoginHelper = require('./db/dbLoginHelper.js');
const dbTagHelper = require('./db/dbTagHelper.js')
const fileHelper = require('./fileSystem/fileHelper.js')

dbLoginHelper(router);
dbTagHelper(router);
fileHelper(router);

module.exports = router;

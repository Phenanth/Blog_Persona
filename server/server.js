'use strict'
/*
开发调整项：
/db/connect.js的账号、host、db
/fileSystem/fileHelper.js的file头
前端：
/config/index.js的代理地址
*/

const Express = require('express');
const BodyParser = require('body-parser');
const routes = require('./routes.js');
const db = require('./db/connect.js');
const app = Express();

app.use(BodyParser.json());
app.use(BodyParser.urlencoded({ extended: true }));

app.use('/', routes);
app.use('/api', routes);

app.use(function (req, res, next) {
	var err = new Error('Page Not Found.');
	err.status = 404;
	next(err);
});

app.listen(3010, function () {
	console.log('Server running at port 3010...');
});

// Keep the db connection alive.
setInterval(function () {
	db.query('SELECT 1');
}, 30000);

module.exports = app;

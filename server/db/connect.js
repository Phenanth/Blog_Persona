'use strict'

const mysql = require('mysql');

const connection = mysql.createConnection({
	host: '10.0.75.1',
	user: 'personaAdminRe',
	// database: 'persona_dev',
	password: '000000',
	database: 'persona'
	// host: 'localhost',
	// user: 'personaDevAdmin',
});

console.log('Database connected.');

module.exports = connection;

'use strict'

const mysql = require('mysql');

const connection = mysql.createConnection({
	host: 'localhost',
	user: 'personaAdmin',
	password: '000000',
	database: 'persona'
});

console.log('Database connected.');

module.exports = connection;

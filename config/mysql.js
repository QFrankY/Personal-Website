const sequelize = require('sequelize');

const dev = require('../routes/utils').Dev('mysql');

const mysql = new sequelize(
	process.env.MYSQL_DATABASE,
	process.env.MYSQL_USERNAME,
	process.env.MYSQL_PASSWORD,
	{
		host    : process.env.MYSQL_HOST,
		dialect : 'mysql',
		logging : false,

		pool: {
			max  : 5,
			min  : 0,
			idle : 10000
		},

		define: {
			timestamps  : false,
			underscored : true
		}
	}
);

mysql.authenticate()
	.then(function () {
		dev.log("Successfully connected to mysql.");
	})
	.catch(function (err) {
		dev.err("Failed to connect to mysql: " + err);
	});

module.exports = mysql;
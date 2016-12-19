const sequelize = require('sequelize');

const mysql = require('../../../config/mysql');

const Project = mysql.define('project', {
	/** Columns */
	name: {
		type     : sequelize.STRING(80),
		required : true
	},

	description: {
		type     : sequelize.STRING(255),
		required : true
	},

	favorites: {
		type         : sequelize.INTEGER,
		required     : true,
		defaultValue : 0
	},

	type: {
		type     : sequelize.STRING(20),
		required : true
	},

	links: {
		type     : sequelize.STRING(80),
		required : true
	},

	tags: {
		type     : sequelize.STRING(255),
		required : true
	},

	completed: {
		type         : sequelize.BOOLEAN,
		defaultValue : false
	},

	private: {
		type         : sequelize.BOOLEAN,
		defaultValue : false
	}
}, {
	/** Options */
	tableName  : 'projects',
	timestamps : true
});

Project.sync();

module.exports = Project;
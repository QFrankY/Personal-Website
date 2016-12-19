const sequelize = require('sequelize');

const mysql = require('../../../config/mysql');

const ProjectUpdate = mysql.define('project_update', {
	/** Columns */
	project_id: {
		type     : sequelize.INTEGER,
		required : true
	},

	project_name: {
		type     : sequelize.STRING(80),
		required : true
	},

	title: {
		type     : sequelize.STRING(80),
		required : true
	},

	content: {
		type     : sequelize.TEXT,
		required : true
	},

	type: {
		type     : sequelize.STRING(20),
		required : true
	},

	link: {
		type: sequelize.TEXT
	},

	private: {
		type: sequelize.BOOLEAN
	}
}, {
	/** Options */
	tableName  : 'project_updates',
	updatedAt  : false,
	timestamps : true
});

ProjectUpdate.sync();

module.exports = ProjectUpdate;
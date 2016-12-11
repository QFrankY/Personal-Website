const sequelize = require('sequelize');

const mysql = require('../../../config/mysql');

const Message = mysql.define('message', {
	/** Columns */
	session_id: {
		type     : sequelize.STRING(32),
		required : true
	},

	socket_id: {
		type     : sequelize.STRING(64),
		required : true
	},

	user_name: {
		type     : sequelize.TEXT('tiny'),
		required : true
	},

	user_ip: {
		type     : sequelize.TEXT,
		required : true
	},

	room_id: {
		type     : sequelize.STRING(32),
		required : true
	},

	room_name: {
		type     : sequelize.TEXT('tiny'),
		required : true
	},

	text: {
		type     : sequelize.TEXT('tiny'),
		required : true
	}
}, {
	/** Options */
	tableName  : 'chatter_messages',
	timestamps : true,
	updatedAt  : false,

	indexes: [
		{
			name   : 'message_by_user',
			method : 'BTREE',
			fields : ['session_id', 'socket_id']
		},

		{
			name   : 'message_by_room',
			method : 'BTREE',
			fields : ['room_id']
		}
	]
});

Message.sync();

module.exports = Message;
const Schema   = require('mongoose').Schema;

const mongo = require('../../../config/mongo');

const UserSchema = new Schema ({
	id    : String,
	name  : String,
	image : Number
});

const User = mongo.model('User', UserSchema);

module.exports = User;
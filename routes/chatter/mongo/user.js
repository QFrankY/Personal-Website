const mongoose = require('mongoose');
const Schema   = require('mongoose').Schema;

const UserSchema = new Schema ({
	id    : String,
	name  : String,
	image : Number
});

const User = mongoose.model('chatter_user', UserSchema);

module.exports = User;
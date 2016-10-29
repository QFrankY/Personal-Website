const Schema   = require('mongoose').Schema;

const mongo = require('../../../config/mongo');
const dev   = require('../../utils').Dev('Room');

const RoomSchema = new Schema ({
	name  : String,
	users : Array
});

RoomSchema.post('save', function (_room, next) {
	dev.log('Successfully saved room: ' + _room.name);
	next();
});

RoomSchema.post('remove', function (_room, next) {
	dev.log('Successfully removed room: ' + _room.name);
	next();
});

const Room = mongo.model('chatter_room', RoomSchema);

module.exports = Room;
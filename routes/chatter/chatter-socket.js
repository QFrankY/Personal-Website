const md5    = require('crypto-js/md5');

const chatter = require('../../socket').io.of('/chatter');
const dev     = require('../utils').Dev('chatter:sockets');

const Room = require('./mongo/room');

// Socket Utilities
var chatterSockets = {};

chatter.on('connection', function (_socket) {
	dev.log('New socket connection: ' +  _socket.id + ' in ' + _socket.nsp.name);

	if (!chatterSockets[_socket.request.sessionID]) {
		chatterSockets[_socket.request.sessionID] = {};
	}

	chatterSockets[_socket.request.sessionID][_socket.id] = _socket;

	_socket.emit(_socket.nsp.name, _socket.id);

	_socket.on('disconnecting', function () {
		chatter.emit('userDisconnect', {
			id    : md5(_socket.request.sessionID).toString(),
			rooms : getUserRooms(_socket.rooms)
		});

		Room.update({
			"users.socket": _socket.id
		}, {
			$pull: {
				users: { socket: _socket.id }
			}
		}, {
			multi: true
		}, function (err) {
			if (err) {
				dev.err(err);
			} else {
				dev.log('Succesfully removed user from rooms');
				Room.remove({
					users: { $size: 0 }
				}, function (err, removed) {
					if (err) {
						dev.err(err);
					} else {
						dev.log('Successfully removed empty rooms');
					}
				});
			}
		});
		dev.err('Socket has disconnected: ' + _socket.id);
	 	delete chatterSockets[_socket.request.sessionID][_socket.id];
	});
});

// Utility functions
const getRoomList = function () {
	var rooms = [];

	Object.keys(chatter.adapter.rooms).forEach(function(key, index) {
		if (key.substr(0,5) == 'room_') {
			rooms.push({
				name           : key.substring(5, key.length - 32),
				id             : key.substring(key.length - 32),
				numConnections : chatter.adapter.rooms[key].length
			});
		};
	});

	return rooms;
};

const getUserRooms = function (roomsObj) {
	obj = {};

	Object.keys(roomsObj).forEach(function(key, index) {
		if (key.substr(0,5) == 'room_') {
			obj[key.substring(key.length - 32)] = true;
		};
	});

	return obj;
};

module.exports = {
	chatterSockets : chatterSockets,
	chatter        : chatter,
	getRoomList    : getRoomList
};
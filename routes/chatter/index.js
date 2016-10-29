const router = require('express').Router();
const md5    = require('crypto-js/md5');

const dev       = require('../utils').Dev('chatter');
const chatter   = require('../../socket').io.of('/chatter');
const getSocket = require('../../socket').getSocket;
const Room      = require('./mongo').Room;
//const User      = require('./mongo').User;

// Socket Utilities
var chatterSockets = {};
chatter.on('connection', function (_socket) {
	dev.log('New socket connection: ' +  _socket.id + ' in ' + _socket.nsp.name);

	if (!chatterSockets[_socket.request.sessionID]) {
		chatterSockets[_socket.request.sessionID] = {};
	}

	if (!_socket.request.session.user) {
		_socket.request.session.user = {};
	}

	if (!_socket.request.session.user.sockets) {
		_socket.request.session.user.sockets = {};
	}

	_socket.request.session.user.sockets[_socket.id] = md5(_socket.id).toString();

	chatterSockets[_socket.request.sessionID][_socket.id] = _socket;

	_socket.emit(_socket.nsp.name, _socket.id);

	_socket.on('disconnect', function () {
		Room.update({
			"users.socket": _socket.id
		}, {
			$pull: {
				users: {
					socket: _socket.id
				}
			}
		}, {
			multi: true
		}, function (err) {
			if (err) {
				dev.err(err);
			} else {
				dev.log('Succesfully removed user from rooms');
				Room.remove({
					users: {
						$size: 0
					}
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

/**
 * User Related APIs
 */

/** Get current user info */
router.get('/user', function (req, res) {

	if (req.session.user) {
		dev.log('Successfully fetched user: ' + req.session.user.name);

		console.log(req.session.user);

		res.status(200).send({
			user : req.session.user
		});
	} else {
		dev.log('User not found');
		res.status(200).end();
	} 
});

/** Get current user info */
router.post('/user', function (req, res) {

	req.session.user = {};

	if (!req.body.name) {
		req.session.user.name = 'user_' + (new Date().getTime() % 1000000000);
	} else {
		req.session.user.name = req.body.name;
	}

	req.session.user.imageNum = Math.floor(Math.random() * 12) + 1;
	req.session.user.id       = md5(req.session.id).toString();

	dev.log('Successfully attached user to session');
	res.status(200).send({
		user : req.session.user
	});
});

/**
 * Room related APIs
 */

/** Get all available rooms */
router.get('/rooms', function (req, res) {
	var rooms = [];

	Object.keys(chatter.adapter.rooms).forEach(function(key, index) {
		if (key.substr(0,5) == 'room_') {
			rooms.push({
				name           : key.substring(5),
				numConnections : chatter.adapter.rooms[key].length
			});
		};
	});

	dev.log('Successfully fetched rooms');
	res.status(200).send({
		rooms: rooms
	});
});

/** Join rooms */
router.get('/join/:room/:new?', function (req, res) {
	var socket = getSocket(req, chatterSockets);
	var room   = req.params.room;
	var newRoom = req.params.new && JSON.parse(req.params.new);

	if (chatter.adapter.rooms['room_' + room] && !newRoom) {
		Room.update({
			name: room
		}, {
			$push: {
				users: {
					id       : req.session.user.id,
					socket   : req.headers['socket-id'],
					name     : req.session.user.name,
					imageNum : req.session.user.imageNum
				}
			}
		}, function (err, _room) {
			socket.join('room_' + room);
			dev.log(req.session.user.name + ' successfully joined chatter room: ' + room);
			res.status(200).end();
		});
	} else if (newRoom) {
		if (!chatter.adapter.rooms['room_' + room]) {
			Room.create({
				name  : room,
				users : [{
					id       : req.session.user.id,
					socket   : req.headers['socket-id'],
					name     : req.session.user.name,
					imageNum : req.session.user.imageNum
				}]
			}, function (err, _room) {
				if (err) {
					res.status(500).send({
						msg: 'Failed to create room. Try again later.'
					});
				} else {
					socket.join('room_' + room);
					chatter.emit('newRoom');
					dev.log(req.session.user.name + ' successfully created chatter room: ' + room);
					res.status(200).end();
				}
			});
		} else {
			dev.err('Failed to create room: ' + room + ' already exists');
			res.status(500).send({
				msg: 'Failed to create room: Name already taken.'
			})
		}
	} else {
		dev.err('Failed to join room: ' + room + ' does not exist');
		res.status(500).send({
			msg: 'Failed to join room: ' + room + ' does not exist'
		});
	}
});

module.exports = router;
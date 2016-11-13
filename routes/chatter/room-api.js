const async  = require('async');
const router = require('express').Router();
const md5    = require('crypto-js/md5');

const chatter        = require('./chatter-socket').chatter;
const chatterSockets = require('./chatter-socket').chatterSockets;
const getRoomList    = require('./chatter-socket').getRoomList;
const dev            = require('../utils').Dev('chatter:room');
const getSocket      = require('../../socket').getSocket;

const Room = require('./mongo').Room;

/**
 * Room related APIs
 */

/** Get all available rooms */
router.get('/rooms', function (req, res) {
	dev.log('Successfully fetched rooms');
	res.status(200).send({ rooms: getRoomList() });
});

/** Join rooms */
router.get('/join/:room/:id?', function (req, res) {
	var socket  = getSocket(req, chatterSockets);
	var room    = req.params.room;
	var roomId  = req.params.id;

	if (!req.session.user) {
		res.status(500).send("No session information available");
	}

	if (room.length > 20) {
		res.status(500).send({ msg: 'Room name too long.' });
	} else if (roomId) {
		Room.findOneAndUpdate({
			name : room,
			id   : roomId
		}, {
			$push: {
				users: {
					id       : req.session.user.id,
					socket   : req.headers['socket-id'],
					name     : req.session.user.name,
					imageNum : req.session.user.imageNum
				}
			}
		}, {
			new: true
		}, function (err, _room) {
			if (!_room) {
				dev.err('Failed to join room: ' + room + ' does not exist');
				res.status(500).send({ msg: 'Failed to join room: ' + room + ' does not exist' });
			} else {
				socket.join('room_' + _room.name + _room.id);
				dev.log(req.session.user.name + ' successfully joined chatter room: ' + room);
				chatter.emit('userJoin', {
					id       : req.session.user.id,
					roomId   : _room.id,
					name     : req.session.user.name,
					imageNum : req.session.user.imageNum
				});
				res.status(200).send({
					id   : _room.id,
					name : _room.name
				});
			}
		});
	} else {
		Room.create({
			name  : room,
			id    : md5(room + new Date().getTime()).toString(),
			users : [{
				id       : req.session.user.id,
				socket   : req.headers['socket-id'],
				name     : req.session.user.name,
				imageNum : req.session.user.imageNum
			}]
		}, function (err, _room) {
			if (err) {
				res.status(500).send({ msg: 'Failed to create room. Try again later.' });
			} else {
				socket.join('room_' + _room.name + _room.id);
				chatter.emit('newRoom', {
					numConnections : 1,
					name           : _room.name,
					id             : _room.id
				});
				dev.log(req.session.user.name + ' successfully created chatter room: ' + room);
				res.status(200).send({
					id   : _room.id,
					name : _room.name
				});
			}
		});
	}
});

/** Leave room */
router.get('/leave/:room/:id', function (req, res) {
	var socket = getSocket(req, chatterSockets);
	var room;

	async.series([
		function (callback) {
			Room.findOneAndUpdate({
				name : req.params.room,
				id   : req.params.id
			}, {
				$pull: {
					users: { socket: socket.id }
				}
			}, {
				new: true
			}, function (err, _room) {
				if (err || !_room) {
					callback(true);
				} else {
					room = _room;
					dev.log(req.session.user.name + ' successfully left chatter room: ' + room.name);
					callback();
				}
			});
		},

		function (callback) {
			if (room.users.length === 0) {
				room.remove(function() {
					dev.log(room.name + ' is empty and has been removed.');
					callback();
				});
			} else {
				callback();
			}
		}
	],

	function (err, results) {
		if (err) {
			res.status(500).send({ msg: 'Could not leave room. Please try again later.' });
		} else {
			chatter.emit('userLeft', {
				id     : req.session.user.id, 
				roomId : req.params.id
			});
			socket.leave('room_' + room.name + room.id);
			res.status(200).end()
		}
	});
});

/** Get users in a room */
router.get('/room/users/:room', function (req, res) {
	Room.findOne({
		name: req.params.room
	}, {
		"users.imageNum" : 1,
		"users.name"     : 1,
		"users.id"       : 1
	}, function (err, _room) {
		if (err || !_room) {
			res.status(500).send({ msg: err });
		} else {
			res.status(200).send({ users: _room.users });
		}
	});
});

/** Rejoin all rooms on reconnect */
router.post('/room/reconnect', function (req, res) {
	var socket = getSocket(req, chatterSockets);
	var rooms = req.body.rooms;

	if (rooms instanceof Array && socket) {
		async.each(rooms, function (room, callback) {
			Room.findOneAndUpdate({
				name : room.name,
				id   : room.id
			}, {
				$push: {
					users: {
						id       : req.session.user.id,
						socket   : req.headers['socket-id'],
						name     : req.session.user.name,
						imageNum : req.session.user.imageNum
					}
				}
			}, {
				upsert              : true,
				setDefaultsOnInsert : true,
				new                 : true
			}, function (err, _room) {
				if (err) {
					dev.err(err);
					callback(err);
				} else {
					socket.join('room_' + _room.name + _room.id, function () {
						callback();
					});
				}
			});
		}, function (err) {
			if (err) {
				dev.err(err);
				res.status(500).send({ msg: 'Socket connections lost. Could not reconnect.'});
			} else {
				dev.log(req.session.user.name + ' successfully reconnected');
				res.status(200).end();
			}
		});
	} else {
		res.status(500).send({
			msg     : 'Socket disconnected. Reconnect failed. Must refresh page.',
			refresh : true
		});
	}
});

module.exports = router;
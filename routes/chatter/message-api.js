const router = require('express').Router();

const chatter    = require('./chatter-socket').chatter;
const dev        = require('../utils').Dev('chatter:message');
const middleware = require('./middleware');

const Message = require('./mysql').Message;

router.post('/message', middleware.validateSocket(), function (req, res) {
	var room     = req.body.room;
	var roomId   = req.body.roomId;
	var text     = req.body.text;

	Message.create({
		session_id : req.session.id,
		socket_id  : req.headers['socket-id'],
		user_name  : req.session.user.name,
		user_ip    : req.headers['x-forwarded-for'],
		room_id    : roomId,
		room_name  : room,
		text       : text
	}).then(function (message) {
		chatter.to('room_' + room + roomId).emit('message', {
			roomId   : roomId,
			username : req.session.user.name,
			imageNum : req.session.user.imageNum,
			text     : text
		});
		res.status(200).end();
	}, function (err) {
		dev.err(err);
		res.status(500).send({ msg: 'Failed to send message.' });
	});
});

module.exports = router;
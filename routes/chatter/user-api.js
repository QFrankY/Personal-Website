const router = require('express').Router();
const md5    = require('crypto-js/md5');

const dev = require('../utils').Dev('chatter:user');

const Room = require('./mongo').Room;

/**
 * User Related APIs
 */

/** Get current user info */
router.get('/user', function (req, res) {
	if (req.session.user) {
		dev.log('Successfully fetched user: ' + req.session.user.name);

		res.status(200).send({ user : req.session.user });
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
	res.status(200).send({ user: req.session.user });
});

module.exports = router;
const dev = require('../utils').Dev('chatter:middleware');

module.exports = {
	validateSocket : function () {
		return function (req, res, next) {
			if (req.headers['socket-id']) {
				next();
			} else {
				res.status(500).send({ msg: 'Socket disconnected. Try again later.' });
			}
		}
	}
}
var path      = require('path');
var publicDir = path.join(__dirname,'..','..','client');

module.exports = function(server) {
	var router = server.loopback.Router();

	// Returning index page
	router.get('/', function (req, res) {
		res.sendFile(path.join(publicDir,'index.html'));
	});

	/**
	 * Solves the angular page refresh issue.
	 * Must be added at the end of the routes list.
	 */
	router.get('/home', function (req, res) {
		res.sendFile(path.join(publicDir,'index.html'));
	});

	router.get('/chatter', function (req, res) {
		res.sendFile(path.join(publicDir,'index.html'));
	});

	server.use(router);
};

const http   = require('http');
const socket = require('socket.io');

const app     = require('./app');
const dev     = require('./routes/utils').Dev('socket');
const session = require('./config/sessions');

/**
 * Create HTTP server.
 */
const server = http.createServer(app);

/**
 * make socket listen to port
 */
const io = socket.listen(server);

/**
 * Socket hashtable to manage different connections
 */
var sockets = {};

io.use(function (_socket, next) {
	dev.prog('Attaching socket to sessions');
	session(_socket.request, _socket.request.res, next);
});

const connect = function (socketHash) {
	return function (_socket) {
		dev.log('New socket connection: ' +  _socket.id + ' in ' + _socket.nsp.name);

		if (!socketHash[_socket.request.sessionID]) {
			socketHash[_socket.request.sessionID] = {};
		}

		socketHash[_socket.request.sessionID][_socket.id] = _socket;

		_socket.emit(_socket.nsp.name, _socket.id);

		_socket.on('disconnect', function () {
			dev.err('Socket has disconnected: ' + _socket.id);
		 	delete socketHash[_socket.request.sessionID][_socket.id];
		});
	}
}

io.on('connection', connect(sockets));

var getSocket = function (req, socketHash) {
	var socketId = req.headers['socket-id'];
	
	if (socketHash[req.sessionID]) {
		return socketHash[req.sessionID][socketId];
	} else {
		req.res.status(401).end();
	}
}

module.exports = {
	getSocket : getSocket,
	io        : io,
	connect   : connect,
	server    : server,
	sockets   : sockets
};
const mongo = require('mongoose');

const dev = require('../routes/utils').Dev('mongo');

const options = {
	server: { 
		poolSize: 5,
		reconnectTries: Number.MAX_VALUE,
		socketOptions: {
			keepAlive: 1000
		}
	}
};

mongo.connect(process.env.MONGODB_URL, options);

mongo.connection.on('connected', function () {
	dev.log('Successfully connected to mongodb');
});

mongo.connection.on('disconnected', function () {
	dev.err('Disconnected from mongodb');
});

mongo.connection.on('reconnect', function () {
	dev.prog('Reconnecting...')
});

mongo.connection.on('error', function (err) {
	dev.err(err);
})

module.exports = mongo;
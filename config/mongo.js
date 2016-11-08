const mongoose = require('mongoose');

const dev = require('../routes/utils').Dev('mongo');

const options = {
	server: {
		socketOptions: {
			keepAlive        : 10000,
			connectTimeoutMS : 10000
		}
	}
};

mongoose.connect(process.env.MONGODB_URL, options);

mongoose.connection.on('connected', function () {
	dev.log('Successfully connected to mongodb');
});

mongoose.connection.on('disconnected', function () {
	dev.err('Disconnected from mongodb');
});

mongoose.connection.on('reconnect', function () {
	dev.prog('Reconnecting...')
});

mongoose.connection.on('error', function (err) {
	dev.err(err);
});

module.exports = mongoose;
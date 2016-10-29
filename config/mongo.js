const mongo = require('mongoose');

const dev   = require('../routes/utils').Dev('mongo');
const options = {
	server: { 
		socketOptions: { 
			keepAlive: 300000,
			connectTimeoutMS: 30000 
		}
	},
	replset: {
		socketOptions: {
			keepAlive: 300000,
			connectTimeoutMS : 30000
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

module.exports = mongo;
const session    = require('express-session');
const MongoStore = require('connect-mongo')(session);

var config = {
	secret            : process.env.SESSION_SECRET,
	saveUninitialized : true,
	resave            : false,
	cookie: {
		secure: false
	},
	store: new MongoStore({
		url        : process.env.MONGODB_URL,
		touchAfter : 24 * 3600
	})
}

if (process.env.NODE_ENV == 'production') {
	config.cookie.secure = true;
}

var sess = session(config);

module.exports = sess;
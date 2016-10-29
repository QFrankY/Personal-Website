const session    = require('express-session');
const MongoStore = require('connect-mongo')(session);

var sess = session({
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
});

if (process.env.NODE_ENV == 'production') {
	sess.cookie.secure = true;
}

module.exports = sess;
var passport      = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var dev = require('../routes/utils').Dev('passport');

passport.serializeUser(function (ip, done) {
	done(null, ip);
});

passport.deserializeUser(function (ip, done) {
	done(null, ip);
});

passport.use(new LocalStrategy({
	passReqToCallback: true
}, function (req, done) {
	dev.prog('Authenticating using local strategy...');
	done(null, req.conn.remoteAddresss);
}));

module.exports = passport;
var passport = require('passport');
var BasicStrategy = require('passport-http').BasicStrategy;
var User = require('user');

exports.isAuthenticated = passport.authenticate('basic', { session: false});

passport.use(new BasicStrategy {
	function(username, password, callback) {
		User.findOne({})
	}
})
var passport = require('passport');
var BasicStrategy = require('passport-http').BasicStrategy;
var User = require('./user');

var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;
var config = require('./config');

var params = {
	secretOrKey:config.secret,
	jwtFromRequest:ExtractJwt.fromAuthHeaderAsBearerToken()
};

module.exports = function(){
	var strategy = new JwtStrategy(params, function(payload, done){
		User.findOne({id:payload.id}, function(err,user){
			if(err){
				return done(err,false);
			}
			if(user){
				done(null, user);
			} else{
				done(null,false);
			}
		});
	});

	passport.use(strategy);
	return {
		initialize: function(){
			return passport.initialize();
		},
		authenticate: function(){
			return passport.authenticate("jwt", {
				session: false
			});
		}
	};
};

exports.isAuthenticated = passport.authenticate('basic', { session: false});







passport.use(new BasicStrategy(
 function(username, password, callback) {
 User.findOne({ username: username }, function (err, user) {
 if (err) { return callback(err); }
 // No user found with that username
 if (!user) { return callback(null, false); }
 // Make sure the password is correct
 user.verifyPassword(password, function(err, isMatch) {
 if (err) { return callback(err); }
 // Password did not match
 if (!isMatch) { return callback(null, false); }
 // Success
 return callback(null, user);
 });
 });
 }
));
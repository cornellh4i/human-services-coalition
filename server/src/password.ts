//import {UserModel} from "./models/User";
const UserTest = require('./models/User')
//passport.js
//const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const passportJWT = require("passport-jwt");

const ExtractJWT = passportJWT.ExtractJwt;

const JWTStrategy = passportJWT.Strategy;


passport.use(new LocalStrategy({
  usernameField: 'username',
  passwordField: 'password'

},
  function (email, password, cb) {
    return UserTest.findOne({ email, password })
      .then(user => {
        if (!user) {
          return cb(null, false, { message: 'Incorrect username or password' });

        }

        return cb(null, user, { message: 'Logged In Successfully' });
      })
      .catch(err => cb(err));
  }


));

passport.use(new JWTStrategy({
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
  secretOrKey: 'your_jwt_secret'
},
  function (jwtPayload, cb) {

    //find the user in db if needed
    return UserTest.findOneById(jwtPayload.id)
      .then(user => {
        return cb(null, user);
      })
      .catch(err => {
        return cb(err);
      });
  }
));
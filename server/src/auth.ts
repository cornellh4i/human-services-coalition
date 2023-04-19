const passport = require('passport');
const localStrategy = require('passport-local').Strategy;

const JWTstrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;

const User = require("./models/User");
const Admin = require("./models/Admin");

passport.use(
  'login',
  new localStrategy(
    {
      usernameField: 'username',
      passwordField: 'password'
    },
    async (username, password, done) => {
      try {
        let account = await User.findOne({ username });
        let account_type = 0; // 0 = user

        if (!account) {
          account = await Admin.findOne({ username });
          account_type = 1; // 1 = admin

          if (!account) {
            return done(null, false, -1, { message: 'User not found' });
          }
        }

        const validate = await account.isValidPassword(password);

        if (!validate) {
          return done(null, false, -1, { message: 'Wrong Password' });
        }

        return done(null, account, account_type, { message: 'Logged in Successfully' });
      } catch (error) {
        return done(error);
      }
    }
  )
);

passport.use(
  new JWTstrategy(
    {
      secretOrKey: 'TOP_SECRET',
      jwtFromRequest: ExtractJWT.fromUrlQueryParameter('secret_token')
    },
    async (token, done) => {
      try {
        return done(null, token.user);
      } catch (error) {
        done(error);
      }
    }
  )
);
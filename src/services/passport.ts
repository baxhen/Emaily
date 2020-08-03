import passport from 'passport';
import mongoose, { DocumentQuery } from 'mongoose';
import {
  Strategy as GoogleStrategy,
  Profile,
  VerifyCallback,
} from 'passport-google-oauth20';
import * as env from '../config/keys';
import { Keys } from '../server';

const { googleClientID, googleClientSecret, googleProxy } = env as Keys;

const User = mongoose.model('users');
passport.serializeUser((user: any, done: VerifyCallback) => {
  done(undefined, user.id);
});

passport.deserializeUser((id: any, done: VerifyCallback) => {
  User.findById({ _id: id }).then((user: any) => {
    done(undefined, user);
  });
});

passport.use(
  new GoogleStrategy(
    {
      clientID: googleClientID,
      clientSecret: googleClientSecret,
      callbackURL: googleProxy + '/auth/google/callback',
    },

    async (
      accessToken: string,
      refreshToken: string,
      profile: Profile,
      done: VerifyCallback
    ) => {
      const existingUser = await User.findOne({ googleId: profile.id });
      if (existingUser) {
        return done(undefined, existingUser);
      }
      const user = await new User({
        googleId: profile.id,
      }).save();
      done(undefined, user);
    }
  )
);

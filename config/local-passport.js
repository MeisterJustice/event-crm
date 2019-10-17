import passport from 'passport';
import User from '../models/user';
import LocalStrategy from 'passport-local';

module.exports = (passport) => {
    passport.use(User.createStrategy());
    passport.use(new LocalStrategy(User.authenticate()));
    passport.serializeUser(User.serializeUser());
    passport.deserializeUser(User.deserializeUser());
}
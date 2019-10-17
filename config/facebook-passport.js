import passport from 'passport';
import FacebookStrategy from 'passport-facebook';
import User from '../models/user';
import configAuth from './auth';



module.exports = (passport) => {
    passport.use(new FacebookStrategy({
            clientID: configAuth.facebookAuth.clientID,
            clientSecret: configAuth.facebookAuth.clientSecret,
            callbackURL: configAuth.facebookAuth.callbackURL,
        },
        function (accessToken, refreshToken, profile, done) {
            process.nextTick(function () {
                User.findOne({
                    'facebook.id': profile.id
                }, function (err, user) {
                    if (err)
                        return done(err);
                    if (user)
                        return done(null, user);
                    else {
                        let newUser = new User();
                        newUser.facebook.id = profile.id,
                        newUser.facebook.token = accessToken,
                        newUser.facebook.name = profile.name.givenName + " " + profile.name.familyName,
                        newUser.facebook.email = profile.email;

                        newUser.save(function (err) {
                            if (err)
                                throw err;
                            return done(null, newUser);
                        })
                    }
                });
            });
        }

    ));
}
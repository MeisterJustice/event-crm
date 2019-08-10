import User from '../models/user';
import passport from 'passport';

export const getIndex = (req, res, next) => {
  res.render('index');
}

export const getFacebookLogin = passport.authenticate('facebook', {
  scope: ['email']
});

export const postFacebookLogin = passport.authenticate('facebook', {
  successRedirect: '/',
  failureRedirect: '/',
  session: false
})

export const getRegister = async (req, res, next) => {
  res.json({
    message: 'get register'
  })
}

export const postRegister = async (req, res, next) => {
  let newUser = await new User({
    username: req.body.username,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    sex: req.body.sex,
    email: req.body.email
  });
  await User.register(newUser, req.body.password);
  // req.flash("success", "welcome");
    res.json({newUser});
}

export const getLogin = async (req, res, next) => {
  res.json({message: 'get login'});
}

export const postLogin = async (req, res, next) => passport.authenticate("local", {
  successRedirect: "/event",
  failureRedirect: "/login"
})(req, res, next)

export const getLogout = async(req, res, next) => {
  req.logout();
  // req.flash("success", "Logged you out!");
  res.redirect("/");
}
import User from '../models/user';
import passport from 'passport';
import nodemailer from 'nodemailer';

export const getIndex = (req, res, next) => {
  res.render('index');
}

export const postForm = async (req, res, next) => {
  let output = await `
    from:  ${req.body.name}
    email: ${req.body.email}
    phone number: ${req.body.phone}


${req.body.message}
  `;

  let mailOpts, smtpTrans;
  smtpTrans = await nodemailer.createTransport({
    service: 'gmail',

    auth: {
      type: 'OAuth2',
      user: 'thechiefje@gmail.com',
      clientId: '',
      clientSecret: '',
      refreshToken: ''

    }
  });

  mailOpts = await {
    from: `Nodemailer contact <${req.body.email}`,
    to: 'thechiefje@gmail.com',
    subject: 'New message from contact form at event crm',
    text: output
  };
  await smtpTrans.sendMail(mailOpts, (error, response) => {
    if (error) {
      console.log(error);
      res.redirect('/');
    } else {
      console.log(response);
      res.redirect('/');
    }
  });
}

export const getFacebookLogin = passport.authenticate('facebook', {
  scope: ['email']
});

export const postFacebookLogin = passport.authenticate('facebook', {
  successRedirect: '/',
  failureRedirect: '/login',
  session: false
})

export const getRegister = async (req, res, next) => {
  res.render("auth/register");
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
  res.redirect("/event");
}

export const getLogin = async (req, res, next) => {
  res.render("auth/login");
}

export const postLogin = async (req, res, next) => passport.authenticate("local", {
  successRedirect: "/event",
  failureRedirect: "/login"
})(req, res, next)

export const getLogout = async (req, res, next) => {
  req.logout();
  // req.flash("success", "Logged you out!");
  res.redirect("/");
}
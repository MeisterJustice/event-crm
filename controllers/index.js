require('dotenv').config()
import User from '../models/user';
import Email from '../models/email-signup';
import passport from 'passport';
import nodemailer from 'nodemailer';
import request from 'superagent';

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
      clientId: '557',
      clientSecret: '5557',
      refreshToken: '5777'

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

export const emailSignup = async (req, res, next) => {
  // save to database
  let userEmail = await Email.create(req.body);
  console.log(`${req.body.email} just signed up`);

  // save to mailchimp
  let mailchimpInstance = await process.env.MAILCHIMP_INSTANCE,
    listUniqueId = await process.env.MAILCHIMP_ID,
    mailchimpApiKey = await process.env.MAILCHIMP_API_KEY;

    await request
      .post('https://' + mailchimpInstance + '.api.mailchimp.com/3.0/lists/' + listUniqueId + '/members/')
      .set('Content-Type', 'application/json;charset=utf-8')
      .set('Authorization', 'Basic ' + new Buffer('any:' + mailchimpApiKey).toString('base64'))
      .send({
        'email_address': req.body.email,
        'status': 'subscribed',
        'merge_fields': {
          'FNAME': req.body.firstName,
          'LNAME': req.body.lastName
        }
      })
      .end(function (err, response) {
        if (response.status < 300 || (response.status === 400 && response.body.title === "Member Exists")) {
          console.log('mailchimp worked')
          res.redirect('/');
        } else {
          res.redirect('/')
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
  await User.register(newUser, req.body.password, function(err, user){
    if(err){
        // req.flash("error", err.message);
        return res.render("auth/register");
    }
    passport.authenticate("local")(req, res, function(){
        // req.flash("success", "Welcome to YelpCamp " + user.username);
        res.redirect("/");
    });
}); 
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
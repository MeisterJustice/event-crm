require('dotenv').config()
import User from '../models/user';
import Event from '../models/event';
import Email from '../models/email-signup';
import passport from 'passport';
import request from 'superagent';
import util from 'util';
import crypto from 'crypto';
import sgMail from '@sendgrid/mail';
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export const getIndex = (req, res, next) => {
  res.render('index');
}

export const postForm = async (req, res, next) => {
  const msg = {
    to: 'thechiefje@gmail.com',
    from: req.body.email,
    subject: 'Event crm - Contact form',
    text: `${req.body.name} ${req.body.phone} ${req.body.message}`,
    html: `<p>${req.body.message}</p> <br> <p>${req.body.name} <br><p>${req.body.phone}</p></p>`
  };
  
  await sgMail.send(msg);
  req.flash("success", `Message send successfully`);
  res.redirect('/');
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
          res.redirect('back');
        } else {
          res.redirect('back');
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
  req.flash("success", "Logged you out!");
  res.redirect("/");
}

export const getProfile = async (req, res, next) => {
  let events = await Event.find().where('author').equals(req.user._id).limit(10).exec();
  res.render('profile/index', { events });
}

export const forgotPassword = async (req, res, next) => {
  res.render('auth/forgot');
}

export const putForgotPassword = async (req, res, next) => {
  const token = await crypto.randomBytes(20).toString('hex');
	
	const user = await User.findOne({ email: req.body.email })
	if (!user) {
		req.flash('error', 'No account with that email address exists.');
	  return res.redirect('/forgot-password');
	}

	user.resetPasswordToken = token;
	user.resetPasswordExpires = Date.now() + 3600000; // 1 hour

  await user.save();
  

  const msg = {
    to: user.email,
    from: 'Event Admin < thechiefje@gmail.com >',
    subject: 'Event CRM - Forgot Password / Reset',
    text: `You are receiving this because you (or someone else) have requested the reset of the password for your account.
			Please click on the following link, or copy and paste it into your browser to complete the process:
			http://${req.headers.host}/reset-password/${token}
			If you did not request this, please ignore this email and your password will remain unchanged.`.replace(/			/g, ''),
  };

  await sgMail.send(msg);

  req.flash('success', `An e-mail has been sent to ${user.email} with further instructions.`);
  res.redirect('/forgot-password');
}

export const resetPassword = async (req, res, next) => {
  const { token } = req.params;
  const user = await User.findOne({
    resetPasswordToken: token,
    resetPasswordExpires: { $gt: Date.now() }
  });
  if(!user) {
    req.flash("error", `Password reset token is invalid or has expired!`);
    return res.redirect('/forgot-password');
  }
  res.render('auth/reset', {token});
}

export const putResetPassword = async (req, res, next) => {
  const { token } = req.params;
  const user = await User.findOne({
    resetPasswordToken: token,
    resetPasswordExpires: { $gt: Date.now() }
  });
  if(!user) {
    req.flash("error", `Password reset token is invalid or has expired!`);
    return res.redirect('/forgot-password');
  }
  if(req.body.password === req.body.confirm) {
    await user.setPassword(req.body.password);
    user.resetPasswordToken = null;
    user.resetPasswordExpires = null;
    await user.save();
    const login = util.promisify(req.login.bind(req));
    await login(user);
  } else {
    req.flash("error", `Passwords do not match!`);
    return res.redirect(`/reset-password/${token}`);
  }

  const msg = {
    to: user.email,
    from: 'Event admin <theChiefJe@gmail.com>',
    subject: 'Event crm - Password Changed',
    text: `Hello,
    This email is to confirm that the password for your account has just been changed.
    If you did not make this change, please hit reply and notify us at once.`.replace(/    /g, '')
  };
  
  await sgMail.send(msg);
  req.flash("success", `Password successfully updated!`);
  res.redirect('/');
}
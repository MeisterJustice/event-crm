const express = require('express');
const router = express.Router();
import nodemailer from 'nodemailer';
import xoauth2 from 'xoauth2';
import {
  getIndex,
  getFacebookLogin,
  postFacebookLogin,
  getRegister,
  postRegister,
  getLogin,
  postLogin,
  getLogout
} from '../controllers/index';

import {
  errorHandler
} from '../middleware'

router.get('/', errorHandler(getIndex));

router.post('/', function (req, res) {
  let mailOpts, smtpTrans;
  smtpTrans = nodemailer.createTransport({
    service: 'gmail',
    // port: 465,
    // secure: true,
    auth: {
      xoauth2: xoauth2.createXOAuth2Generator({
        user: 'thechiefje@gmail.com',
        clientId: '',
        clientSecret: '',
        refreshToken: ''
      })
    }
  });
  mailOpts = {
    from: req.body.name + ' &lt;' + req.body.email + '&gt;',
    to: 'thechiefje@gmail.com',
    subject: 'New message from contact form at event crm',
    text: `${req.body.name} (${req.body.email}) says: ${req.body.message}`
  };
  smtpTrans.sendMail(mailOpts, function (error, response) {
    if (error) {
      console.log(error)
    }
    else {
      console.log(response);
    }
  });
});

router.get('/auth/facebook', getFacebookLogin);

router.get('/auth/facebook/callback', postFacebookLogin);

router.get('/register', errorHandler(getRegister));

router.post("/register", errorHandler(postRegister));

router.get("/login", errorHandler(getLogin));

router.post("/login", errorHandler(postLogin));

router.get("/logout", errorHandler(getLogout));

export default router;
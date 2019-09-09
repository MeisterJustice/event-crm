const express = require('express');
const router = express.Router();

import {
  getIndex,
  getFacebookLogin,
  postFacebookLogin,
  getRegister,
  postRegister,
  getLogin,
  postLogin,
  getLogout,
  postForm,
  emailSignup,
  forgotPassword,
  putForgotPassword,
  resetPassword,
  putResetPassword
} from '../controllers/index';

import {
  errorHandler
} from '../middleware'

router.get('/', errorHandler(getIndex));

router.post('/', postForm);

router.post('/email-signup', errorHandler(emailSignup));

router.get('/auth/facebook', getFacebookLogin);

router.get('/auth/facebook/callback', postFacebookLogin);

router.get('/register', errorHandler(getRegister));

router.post("/register", errorHandler(postRegister));

router.get("/login", errorHandler(getLogin));

router.post("/login", errorHandler(postLogin));

router.get("/logout", errorHandler(getLogout));

router.get('/forgot-password', forgotPassword);

router.put('/forgot-password', errorHandler(putForgotPassword));

router.get('/reset-password/:token', errorHandler(resetPassword));

router.put('/reset-password/:token', errorHandler(putResetPassword));

export default router;
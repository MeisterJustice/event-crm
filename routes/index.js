const express = require('express');
const router = express.Router();
const multer = require('multer');
const { storage } = require('../cloudinary');
const upload = multer({ storage });

import {
  getIndex,
  privacy,
  getFacebookLogin,
  postFacebookLogin,
  getRegister,
  postRegister,
  getLogin,
  postLogin,
  getLogout,
  getProfile,
  updateProfile,
  postForm,
  emailSignup,
  donate,
  getCallback,
  forgotPassword,
  putForgotPassword,
  resetPassword,
  putResetPassword
} from '../controllers/index';

import {
  errorHandler
} from '../middleware';

import {
  isLoggedIn,
  isEventOwner,
  checkIfUserExists,
  isValidPassword,
	changePassword
} from '../validation/index';

router.get('/', errorHandler(getIndex));

router.post('/', postForm);

router.get('/privacy-policy', privacy);

router.post('/pay', donate);

router.get('/paystack/callback', getCallback);

router.post('/email-signup', errorHandler(emailSignup));

router.get('/auth/facebook', getFacebookLogin);

router.get('/auth/facebook/callback', postFacebookLogin);

router.get('/register', errorHandler(getRegister));

router.post("/register", errorHandler(checkIfUserExists), upload.single('image'), errorHandler(postRegister));

router.get("/login", errorHandler(getLogin));

router.post("/login", errorHandler(postLogin));

router.get("/logout", errorHandler(getLogout));

router.get('/profile', isLoggedIn, errorHandler(getProfile));

router.put('/profile', isLoggedIn, upload.single('image'), errorHandler(isValidPassword), errorHandler(changePassword), errorHandler(updateProfile) );

router.get('/forgot-password', forgotPassword);

router.put('/forgot-password', errorHandler(putForgotPassword));

router.get('/reset-password/:token', errorHandler(resetPassword));

router.put('/reset-password/:token', errorHandler(putResetPassword));

export default router;
const express = require('express');
const router = express.Router();
const multer = require('multer');
const { storage } = require('../cloudinary');
const upload = multer({ storage });

var {
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
  getTicketShow,
  postForm,
  emailSignup,
  donate,
  getCallback,
  forgotPassword,
  putForgotPassword,
  resetPassword,
  putResetPassword
} = require('../controllers/index');

var {
  errorHandler
} = require('../middleware');
var {
  isLoggedIn,
  isEventOwner,
  checkIfUserExists,
  isValidPassword,
	changePassword
} = require('../validation/index');

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

router.get('/users/:id', errorHandler(getProfile));

router.put('/users/:id', isLoggedIn, upload.single('image'), errorHandler(isValidPassword), errorHandler(changePassword), errorHandler(updateProfile) );

router.get('/users/:id/:ticket_id', errorHandler(getTicketShow));

router.get('/forgot-password', forgotPassword);

router.put('/forgot-password', errorHandler(putForgotPassword));

router.get('/reset-password/:token', errorHandler(resetPassword));

router.put('/reset-password/:token', errorHandler(putResetPassword));

module.exports = router;
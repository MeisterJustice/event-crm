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
  emailSignup
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

export default router;
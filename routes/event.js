const express = require('express');
const router = express.Router({mergeParams: true});
import { storage } from '../cloudinary';
import multer from 'multer';
const upload = multer({ storage });
import {
    isLoggedIn,
    isEventOwner
  } from '../validation/index';
import { getEvent, getCreateEvent, postEvent, showEvent, getEdit, putEvent, deleteEvent } from '../controllers/event';
import { errorHandler } from '../middleware';

router.get('/', errorHandler(getEvent));

router.get('/new', isLoggedIn, errorHandler(getCreateEvent));

router.post('/', isLoggedIn, upload.array('images', 9),  errorHandler(postEvent));

router.get('/:id', errorHandler(showEvent));

router.get('/:id/edit', isEventOwner, errorHandler(getEdit));

router.put('/:id', isEventOwner, errorHandler(putEvent));

router.delete('/:id', errorHandler(deleteEvent));

export default router;

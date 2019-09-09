const express = require('express');
const router = express.Router({mergeParams: true});
const multer = require('multer');
const upload = multer({'dest': 'uploads/'});
import isLoggedIn from '../validation/isLoggedIn';
import eventOwnership from '../validation/event-ownership';
import { getEvent, getCreateEvent, postEvent, showEvent, getEdit, putEvent, deleteEvent } from '../controllers/event';
import { errorHandler } from '../middleware';

router.get('/', errorHandler(getEvent));

router.get('/new', isLoggedIn, errorHandler(getCreateEvent));

router.post('/', isLoggedIn, upload.array('images', 9),  errorHandler(postEvent));

router.get('/:id', errorHandler(showEvent));

router.get('/:id/edit', eventOwnership, errorHandler(getEdit));

router.put('/:id', eventOwnership, errorHandler(putEvent));

router.delete('/:id', eventOwnership, errorHandler(deleteEvent));

export default router;

const express = require('express');
const router = express.Router({mergeParams: true});
const multer = require('multer');
const upload = multer({'dest': 'uploads/'});
import { getEvent, getCreateEvent, postEvent, showEvent, getEdit, putEvent, deleteEvent } from '../controllers/event';
import { errorHandler } from '../middleware';

router.get('/', errorHandler(getEvent));

router.get('/new', errorHandler(getCreateEvent));

router.post('/', upload.array('images', 6),  errorHandler(postEvent));

router.get('/:id', errorHandler(showEvent));

router.get('/:id/edit', errorHandler(getEdit));

router.put('/:id', errorHandler(putEvent));

router.delete('/:id', errorHandler(deleteEvent));

export default router;

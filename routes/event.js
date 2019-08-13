const express = require('express');
const router = express.Router({mergeParams: true});
import { getEvent, getCreateEvent, postEvent, showEvent, getEdit, putEvent, deleteEvent } from '../controllers/event';
import { errorHandler } from '../middleware';

router.get('/', errorHandler(getEvent));

router.get('/new', errorHandler(getCreateEvent));

router.post('/', errorHandler(postEvent));

router.get('/:id', errorHandler(showEvent));

router.get('/:id/edit', errorHandler(getEdit));

router.put('/:id', errorHandler(putEvent));

router.delete('/:id', errorHandler(deleteEvent));

export default router;

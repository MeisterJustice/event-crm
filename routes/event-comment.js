const express = require('express');
const router = express.Router({mergeParams: true});
import { eventComment, deleteEvent } from '../controllers/event-comment';
import { errorHandler } from '../middleware';


router.post('/', errorHandler(eventComment));

router.delete('/:event_comment', errorHandler(deleteEvent));

export default router;

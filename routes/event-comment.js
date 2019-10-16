const express = require('express');
const router = express.Router({mergeParams: true});
var { eventComment, deleteEvent } = require('../controllers/event-comment');
var { errorHandler } = require('../middleware');


router.post('/', errorHandler(eventComment));

router.delete('/:event_comment', errorHandler(deleteEvent));

module.exports = router;

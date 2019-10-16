const express = require('express');
const router = express.Router({mergeParams: true});
var { storage } = require('../cloudinary');
var multer = require('multer');
const upload = multer({ storage });
var {
    isLoggedIn,
    isEventOwner
  } = require('../validation/index');
var { getEvent, getCreateEvent, postEvent, showEvent, getEdit, putEvent, deleteEvent, purchaseTicket, ticketCallback } = require('../controllers/event');
var { errorHandler } = require('../middleware');

router.get('/', errorHandler(getEvent));

router.get('/new', errorHandler(getCreateEvent));

router.post('/', upload.array('images', 9),  errorHandler(postEvent));

// router.get('/success', errorHandler(success));

router.get('/:id', errorHandler(showEvent));

router.get('/:id/edit', isEventOwner, errorHandler(getEdit));

router.put('/:id', isEventOwner, errorHandler(putEvent));

router.delete('/:id', errorHandler(deleteEvent));

router.post('/:id/ticket', errorHandler(purchaseTicket));

router.get('/paystack/callback', ticketCallback);

module.exports = router;

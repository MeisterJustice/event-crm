const express = require('express');
const router = express.Router();

import {
  getAdmin, getBlog, getCreateBlog, postBlog, getEvent, getCreateEvent, postEvent, getEditBlog, putBlog, deleteBlog, getEditEvent, putEvent, deleteEvent
} from '../controllers/admin'
import { errorHandler } from '../middleware';

router.get('/', errorHandler(getAdmin));

router.get("/blog", errorHandler(getBlog));

router.get('/blog/new', errorHandler(getCreateBlog));

router.post('/blog', errorHandler(postBlog));

router.get("/event", errorHandler(getEvent));

router.get('/event/new', errorHandler(getCreateEvent));

router.post('/event', errorHandler(postEvent));


// BLOG
router.get('/blog/:blog_id/edit', errorHandler(getEditBlog));

router.put('/blog/:blog_id', errorHandler(putBlog));

router.delete('/blog/:blog_id', errorHandler(deleteBlog));


// EVENT 
router.get('/event/:event_id/edit', errorHandler(getEditEvent));

router.put('/event/:event_id', errorHandler(putEvent));

router.delete('/event/:event_id', errorHandler(deleteEvent));

export default router;

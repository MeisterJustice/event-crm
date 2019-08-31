const express = require('express');
const router = express.Router({mergeParams: true});
import {
    getBlog,
    showBlog
} from '../controllers/blog';
import { errorHandler } from '../middleware';
import { postComment } from '../controllers/blog-comment';


router.get('/', errorHandler(getBlog));

router.get('/:id', errorHandler(showBlog))

router.post('/:id', errorHandler(postComment));

export default router;
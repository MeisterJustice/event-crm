const express = require('express');
const router = express.Router({mergeParams: true});
import { postComment, deleteComment } from '../controllers/blog-comment';
import { errorHandler } from '../middleware';


router.post('/', errorHandler(postComment));

router.delete('/:blog_comment', errorHandler(deleteComment));

export default router;

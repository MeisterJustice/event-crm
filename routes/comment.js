const express = require('express');
const router = express.Router({mergeParams: true});
import { postComment, deleteComment, postReply } from '../controllers/comment';
import { errorHandler } from '../middleware';


router.post('/', errorHandler(postComment));

router.delete('/:blog_comment', errorHandler(deleteComment));

router.post('/:blog_comment/reply', errorHandler(postReply));

export default router;

const express = require('express');
const router = express.Router({mergeParams: true});
var { postComment, deleteComment } = require('../controllers/blog-comment');
var { errorHandler } = require('../middleware');


router.post('/', errorHandler(postComment));

router.delete('/:blog_comment', errorHandler(deleteComment));

module.exports = router;

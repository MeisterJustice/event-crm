const express = require('express');
const router = express.Router({mergeParams: true});
var {
    getBlog,
    showBlog
} = require('../controllers/blog');
var { errorHandler } = require('../middleware');
var { postComment } = require('../controllers/blog-comment');


router.get('/', errorHandler(getBlog));

router.get('/:id', errorHandler(showBlog))

router.post('/:id', errorHandler(postComment));

module.exports = router;
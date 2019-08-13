const express = require('express');
const router = express.Router({mergeParams: true});
import {
    getBlog,
    showBlog
} from '../controllers/blog';
import { errorHandler } from '../middleware';


/* GET users listing. */
router.get('/', errorHandler(getBlog));

router.get('/:id', errorHandler(showBlog))

export default router;
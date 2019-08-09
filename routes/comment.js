const express = require('express');
const router = express.Router();
import { postComment } from '../controllers/comment';
import { errorHandler } from '../middleware';


router.post('/', errorHandler(postComment));


export default router;

const express = require('express');
const router = express.Router();
import {
  getIndex
} from '../controllers/index';

import {
  errorHandler
} from '../middleware'

/* GET users listing. */
router.get('/', errorHandler(getIndex));

export default router;

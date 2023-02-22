const express = require('express');
const router = express.Router();

const crud = require('./crud');
router.get('/', crud.findSelectedWorkSpace);
router.post('/', crud.postSelectedWorkSpace);

module.exports = router
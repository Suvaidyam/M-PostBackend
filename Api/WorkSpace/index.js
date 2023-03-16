const express = require('express');
const router = express.Router();

const crud = require('./crud');
router.get('/', crud.findWorkSpace);
router.put('/:_id', crud.putWorkSpace);
router.post('/', crud.postWorkSpace);
router.delete('/:_id', crud.deleteWorkSpace);

module.exports = router
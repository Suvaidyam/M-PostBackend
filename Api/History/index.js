const express = require('express');
const router = express.Router();

const crud = require('./crud');
router.get('/:workspace_id', crud.getHistory);
router.post('/', crud.postHistory);
router.delete('/:_id', crud.deleteHistory);

module.exports = router
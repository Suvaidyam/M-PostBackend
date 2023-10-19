const express = require('express');
const router = express.Router();

const crud = require('./crud');
router.get('/:workspace_id', crud.getCollection);
// router.get('/', crud.getCollection);
router.post('/', crud.postCollection);
router.put('/:_id', crud.putCollection);
router.delete('/:_id', crud.deleteCollection);

module.exports = router;
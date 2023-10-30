const express = require('express');
const router = express.Router();

const crud = require('./crud');
router.get('/:workspace_id', crud.getCollection);
router.get('/:_id', crud.getCollectionById);
// router.get('/', crud.getCollection);
router.post('/', crud.postCollection);
router.put('/:_id', crud.putCollection);
router.put('/res/:_id', crud.putResponse);
router.delete('/:_id', crud.deleteCollection);

module.exports = router;
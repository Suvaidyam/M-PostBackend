const express = require('express');
const router = express.Router();

const crud = require('./Crud');
router.get('/', crud.getCollection);
router.post('/', crud.postCollection);
// router.put('/:_id', crud.updateOne);

module.exports = router
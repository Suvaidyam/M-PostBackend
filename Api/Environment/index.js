const express = require('express');
const router = express.Router();

const crud = require('./crud');
router.get('/:workspace_id', crud.getEnvironment);
router.post('/', crud.postEnvironment);
router.put('/:_id', crud.putEnvironment);
router.delete('/:_id', crud.deleteEnvironment);

module.exports = router
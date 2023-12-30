const express = require('express');
const router = express.Router();

const crud = require('./crud');
router.get('/allEnvironment', crud.getAllEnvironment);
router.get('/:workspace_id', crud.getEnvironment);
router.post('/', crud.postEnvironment);
router.put('/:_id', crud.putEnvironment);
router.put('/softDelete/:_id', crud.softDelete);
router.put('/restore/:_id', crud.restore);
router.delete('/:_id', crud.deleteEnvironment);

module.exports = router
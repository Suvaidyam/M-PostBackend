const express = require('express');
const router = express.Router();
const ctrl = require('./controller')
router.get('/workspace/:token', ctrl.join_workspace_with_url)
router.get('/collection/:token', ctrl.join_collection_with_url)

module.exports = router;
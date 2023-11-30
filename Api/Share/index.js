const express = require('express');
const router = express.Router();
const ctrl = require('./controller')

router.post('/workspace/:access/:share/:_id', ctrl.share_workspace_with_url)
router.post('/collection/:access/:share/:_id', ctrl.share_collection_with_url)

module.exports = router;
const express = require('express');
const router = express.Router();

router.use('/auth', require('./Auth'));

router.use(require('./Auth/VerifyToken'));

router.use('/employee', require('./Employee'));
router.use('/collection', require('./Collection'));
router.use('/environment', require('./Environment'));
router.use('/workspace', require('./WorkSpace'));
router.use('/history', require('./History'));

router.use('/share', require('./Share'))
router.use('/join', require('./Join'))

module.exports = router;
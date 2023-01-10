const express = require('express');
const router = express.Router();

router.use('/auth', require('./Auth'));

router.get('/company-list', require('./Company/crud').findAll);

router.use(require('./Auth/VerifyToken'));


router.use('/company', require('./Company'));
router.use('/employee', require('./Employee'));
router.use('/collection', require('./Collection'));
router.use('/environment', require('./Environment'));


module.exports = router;
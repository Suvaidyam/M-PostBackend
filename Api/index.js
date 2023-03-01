const express = require('express');
const router = express.Router();

router.use('/auth', require('./Auth'));

router.get('/company-list', require('./Company/crud').findAll);

router.use(require('./Auth/VerifyToken'));

router.use('/employee', require('./Employee'));
router.use('/collection', require('./Collection'));
router.use('/environment', require('./Environment'));
router.use('/workspace', require('./WorkSpace'));
router.use('/selectedworkspace', require('./SelectedWorkSpace'));
router.use('/history', require('./History'));



module.exports = router;
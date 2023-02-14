const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

const multer  = require('multer')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix + '.' + file.originalname.split('.')[1])
    }
  })
  
  const upload = multer({ storage: storage });

const crud = require('./crud');
router.get('/', crud.findAll);
router.get('/:_id', crud.findById);
router.post('/', crud.create);
router.put('/:_id',upload.single('file'), crud.updateOne);
router.delete('/deletePhoto',crud.deletePhoto);

module.exports = router
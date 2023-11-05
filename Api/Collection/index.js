const express = require('express');
const router = express.Router();
const multer = require('multer');


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Define the folder where uploaded images will be stored
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname); // Define the file name
  },
});

const upload = multer({ storage });


const crud = require('./crud');
router.get('/:workspace_id', crud.getCollection);
router.get('/getById/:_id', crud.getCollectionById);
// router.get('/', crud.getCollection);
router.post('/',upload.single('image'), crud.postCollection);
router.put('/:_id', crud.putCollection);
router.put('/res/:_id', crud.putResponse);
router.put('/resHeaders/:_id', crud.putResponseHeaders);
router.delete('/:_id', crud.deleteCollection);

module.exports = router;
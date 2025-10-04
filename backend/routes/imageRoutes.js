const express = require('express');
const multer = require('multer');
const rateLimit = require('express-rate-limit');
const {
  uploadImage,
  getAllImages,
  getImage,
  trimImage,
  removeBackground,
  changeBackgroundColor,
  downloadImage,
} = require('../controllers/imageController');

// Multer setup for file upload (temp storage)
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname),
});
const upload = multer({ storage });

// Rate limiting (10 req/min per IP for uploads)
const limiter = rateLimit({
  windowMs: 1 * 60 * 1000,  // 1 min
  max: 10,
  message: 'Too many uploads, try again later.',
});

const router = express.Router();

router.post('/upload', limiter, upload.single('image'), uploadImage);
router.get('/all', getAllImages);
router.get('/:id', getImage);
router.get('/download/:id', downloadImage);  // Query params for transforms
router.post('/trim/:id', trimImage);
router.post('/remove-bg/:id', removeBackground);
router.post('/change-bg/:id', changeBackgroundColor);

module.exports = router;

const Image = require('../models/Image');
const cloudinary = require('../config/cloudinary');
const fs = require('fs').promises;  // For temp file cleanup

// Upload image
const uploadImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    // Upload to Cloudinary
    const result = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload(
        req.file.path,
        {
          resource_type: 'image',
          folder: 'image-gallery',
          transformation: [{ quality: 'auto' }],  // Optimize
        },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );
    });

    // Extract metadata (basic; enhance with sharp/exif if needed)
    const metadata = {
      width: result.width,
      height: result.height,
      format: result.format,
      size: req.file.size,
      description: req.body.description || '',
    };

    // Save to DB
    const image = new Image({
      publicId: result.public_id,
      url: result.secure_url,
      originalName: req.file.originalname,
      metadata,
    });
    await image.save();

    // Cleanup temp file
    await fs.unlink(req.file.path).catch(() => {});  // Ignore if not exist

    res.status(201).json({
      success: true,
      image: {
        id: image._id,
        url: image.url,
        originalName: image.originalName,
        metadata: image.metadata,
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all images (for carousel & grid; limit for carousel)
const getAllImages = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 12;  // Default for grid
    const carouselLimit = req.query.carousel ? 5 : limit;  // Fewer for carousel

    const images = await Image.find()
      .sort({ createdAt: -1 })  // Newest first
      .limit(carouselLimit * page)
      .skip((page - 1) * carouselLimit);

    // Randomize for auto-slide if carousel
    if (req.query.carousel) {
      images.sort(() => Math.random() - 0.5);
    }

    res.json({
      success: true,
      images,
      total: await Image.countDocuments(),
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get single image + increment view
const getImage = async (req, res) => {
  try {
    const image = await Image.findById(req.params.id);
    if (!image) {
      return res.status(404).json({ error: 'Image not found' });
    }

    // Increment view
    image.views += 1;
    await image.save();

    res.json({
      success: true,
      image: {
        id: image._id,
        url: image.url,
        originalName: image.originalName,
        metadata: image.metadata,
        views: image.views,
        downloads: image.downloads,
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Generate transformation URL (for preview/edit)
const getTransformedUrl = (publicId, transformations) => {
  return cloudinary.url(publicId, {
    transformation: transformations,
    secure: true,
  });
};

// Trim/Crop image (returns transformed URL)
const trimImage = async (req, res) => {
  try {
    const { id } = req.params;
    const { x, y, width, height } = req.body;  // Crop coords

    const image = await Image.findById(id);
    if (!image) {
      return res.status(404).json({ error: 'Image not found' });
    }

    const transformations = [
      { crop: 'crop', x, y, width, height, gravity: 'custom' },
    ];

    const transformedUrl = getTransformedUrl(image.publicId, transformations);

    res.json({
      success: true,
      transformedUrl,
      original: image.url,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Remove background (returns transformed URL)
const removeBackground = async (req, res) => {
  try {
    const { id } = req.params;

    const image = await Image.findById(id);
    if (!image) {
      return res.status(404).json({ error: 'Image not found' });
    }

    const transformations = [
      { effect: 'background_removal' },  // Cloudinary AI
      { background: 'transparent' },
    ];

    const transformedUrl = getTransformedUrl(image.publicId, transformations);

    res.json({
      success: true,
      transformedUrl,
      original: image.url,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Change background color (returns transformed URL)
const changeBackgroundColor = async (req, res) => {
  try {
    const { id } = req.params;
    const { color } = req.body;  // e.g., '#ffffff'

    const image = await Image.findById(id);
    if (!image) {
      return res.status(404).json({ error: 'Image not found' });
    }

    // First remove BG if not already
    let transformations = [{ effect: 'background_removal' }];

    // Then apply color
    transformations.push({ background: color });

    const transformedUrl = getTransformedUrl(image.publicId, transformations);

    res.json({
      success: true,
      transformedUrl,
      original: image.url,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Download image (increment count, serve file)
const downloadImage = async (req, res) => {
  try {
    const { id } = req.params;
    const { trim, removeBg, bgColor } = req.query;  // Optional transforms

    const image = await Image.findById(id);
    if (!image) {
      return res.status(404).json({ error: 'Image not found' });
    }

    // Build transformations
    let transformations = [];
    if (trim) {
      // Assume trim params from query or session; simplify here
      transformations.push({ crop: 'fill', width: 800, height: 600 });  // Example
    }
    if (removeBg) {
      transformations.push({ effect: 'background_removal' });
    }
    if (bgColor) {
      if (!removeBg) transformations.push({ effect: 'background_removal' });
      transformations.push({ background: bgColor });
    }

    // Get transformed URL
    const downloadUrl = getTransformedUrl(image.publicId, transformations);

    // For actual download, fetch from Cloudinary and stream (or redirect)
    image.downloads += 1;
    await image.save();

    res.setHeader('Content-Disposition', `attachment; filename="${image.originalName}"`);
    res.redirect(301, downloadUrl);  // Cloudinary handles the rest
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  uploadImage,
  getAllImages,
  getImage,
  trimImage,
  removeBackground,
  changeBackgroundColor,
  downloadImage,
};

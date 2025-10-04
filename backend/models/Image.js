const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
  publicId: {
    type: String,
    required: true,
    unique: true,
  },
  url: {
    type: String,
    required: true,
  },
  originalName: {
    type: String,
    required: true,
  },
  metadata: {
    width: Number,
    height: Number,
    format: String,
    size: Number,  // in bytes
    description: String,  // Optional user-provided desc
  },
  views: {
    type: Number,
    default: 0,
  },
  downloads: {
    type: Number,
    default: 0,
  },
}, {
  timestamps: true,  // createdAt, updatedAt
});

// Index for performance
imageSchema.index({ createdAt: -1 });
imageSchema.index({ views: -1 });

module.exports = mongoose.model('Image', imageSchema);

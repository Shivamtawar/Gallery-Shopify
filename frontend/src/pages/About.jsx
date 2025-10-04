import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Camera,
  Upload,
  Download,
  Eye,
  Scissors,
  Palette,
  RotateCcw,
  Search,
  Shield,
  Zap,
  Cloud,
  Star,
  Users,
  Smartphone
} from 'lucide-react';
import ImageUpload from '../components/ImageUpload';

const About = () => {
  const [showUpload, setShowUpload] = useState(false);

  const handleUploadSuccess = () => {
    setShowUpload(false);
    // Could navigate to home or show success message
  };
  const features = [
    {
      icon: <Camera className="w-8 h-8 text-blue-600" />,
      title: "Auto-Sliding Carousel",
      description: "Experience your images in a beautiful, auto-playing carousel with smooth transitions and randomized order for constant discovery."
    },
    {
      icon: <Upload className="w-8 h-8 text-green-600" />,
      title: "Drag & Drop Upload",
      description: "Simply drag and drop images or click to upload. Supports all major image formats with instant preview and metadata extraction."
    },
    {
      icon: <Scissors className="w-8 h-8 text-purple-600" />,
      title: "Image Editing",
      description: "Trim, crop, and resize images with precision. Advanced tools for professional image editing without leaving the gallery."
    },
    {
      icon: <Palette className="w-8 h-8 text-pink-600" />,
      title: "Background Removal & Color Change",
      description: "AI-powered background removal with the ability to change background colors instantly. Perfect for product photos and portraits."
    },
    {
      icon: <Eye className="w-8 h-8 text-indigo-600" />,
      title: "View & Download Tracking",
      description: "Track image popularity with view counters and download statistics. See which images resonate most with your audience."
    },
    {
      icon: <Search className="w-8 h-8 text-yellow-600" />,
      title: "Smart Search",
      description: "Find images instantly with intelligent search functionality. Search by filename, description, or metadata."
    },
    {
      icon: <Cloud className="w-8 h-8 text-cyan-600" />,
      title: "Cloud Storage",
      description: "Powered by Cloudinary for reliable, fast, and secure image storage with automatic optimization and CDN delivery."
    },
    {
      icon: <Shield className="w-8 h-8 text-emerald-600" />,
      title: "Secure & Reliable",
      description: "Enterprise-grade security with rate limiting, error handling, and robust backend infrastructure."
    }
  ];

  const stats = [
    { label: "Image Formats Supported", value: "10+" },
    { label: "Maximum File Size", value: "10MB" },
    { label: "Editing Tools", value: "5+" },
    { label: "Background Colors", value: "Unlimited" }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">About Image Gallery</h1>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            A modern, feature-rich image gallery application inspired by Google Photos.
            Built with cutting-edge technology to provide the best user experience for managing,
            editing, and sharing your precious memories.
          </p>
          <div className="flex justify-center items-center space-x-8">
            <div className="flex items-center">
              <Star className="w-6 h-6 mr-2" />
              <span>Professional Grade</span>
            </div>
            <div className="flex items-center">
              <Zap className="w-6 h-6 mr-2" />
              <span>Lightning Fast</span>
            </div>
            <div className="flex items-center">
              <Smartphone className="w-6 h-6 mr-2" />
              <span>Mobile Responsive</span>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Powerful Features</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Everything you need to manage, edit, and showcase your images with professional results
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Technology Stack */}
      <div className="py-20 bg-gray-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Built with Modern Technology</h2>
            <p className="text-xl text-gray-600">Leveraging the latest technologies for optimal performance</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="bg-white rounded-lg p-8 shadow-lg">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">Frontend</h3>
              <ul className="space-y-3">
                <li className="flex items-center">
                  <div className="w-3 h-3 bg-blue-500 rounded-full mr-3"></div>
                  <span><strong>React 19</strong> - Modern UI library with latest features</span>
                </li>
                <li className="flex items-center">
                  <div className="w-3 h-3 bg-blue-500 rounded-full mr-3"></div>
                  <span><strong>Vite</strong> - Lightning-fast build tool and dev server</span>
                </li>
                <li className="flex items-center">
                  <div className="w-3 h-3 bg-blue-500 rounded-full mr-3"></div>
                  <span><strong>Tailwind CSS</strong> - Utility-first CSS framework</span>
                </li>
                <li className="flex items-center">
                  <div className="w-3 h-3 bg-blue-500 rounded-full mr-3"></div>
                  <span><strong>React Router</strong> - Client-side routing</span>
                </li>
                <li className="flex items-center">
                  <div className="w-3 h-3 bg-blue-500 rounded-full mr-3"></div>
                  <span><strong>Axios</strong> - HTTP client for API requests</span>
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-lg p-8 shadow-lg">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">Backend</h3>
              <ul className="space-y-3">
                <li className="flex items-center">
                  <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
                  <span><strong>Node.js & Express</strong> - Server-side JavaScript runtime</span>
                </li>
                <li className="flex items-center">
                  <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
                  <span><strong>MongoDB & Mongoose</strong> - NoSQL database with ODM</span>
                </li>
                <li className="flex items-center">
                  <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
                  <span><strong>Cloudinary</strong> - Cloud-based image management</span>
                </li>
                <li className="flex items-center">
                  <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
                  <span><strong>Multer</strong> - File upload middleware</span>
                </li>
                <li className="flex items-center">
                  <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
                  <span><strong>Security Middleware</strong> - Helmet, CORS, Rate limiting</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="py-20 bg-gradient-to-r from-purple-600 to-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Get Started?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Upload your first image and experience the power of our modern gallery platform
          </p>
          <div className="flex justify-center space-x-4">
            <button
              onClick={() => setShowUpload(true)}
              className="bg-white text-purple-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-300 flex items-center"
            >
              <Upload className="w-5 h-5 mr-2" />
              Upload Images
            </button>
            <Link
              to="/"
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-purple-600 transition-colors duration-300 flex items-center"
            >
              <Camera className="w-5 h-5 mr-2" />
              View Gallery
            </Link>
          </div>
        </div>
      </div>

      {/* Image Upload Modal */}
      <ImageUpload
        isOpen={showUpload}
        onClose={() => setShowUpload(false)}
        onUploadSuccess={handleUploadSuccess}
      />
    </div>
  );
};

export default About;

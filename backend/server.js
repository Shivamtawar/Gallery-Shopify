const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const errorHandler = require('./middleware/errorHandler');
const imageRoutes = require('./routes/imageRoutes');

// Load env
dotenv.config();

// Connect DB
connectDB();

const app = express();

// Middleware
app.use(helmet());  // Security headers
app.use(morgan('combined'));  // Logging
app.use(cors({ 
  origin: ['http://localhost:3000', 'http://localhost:5173'], // Support both React and Vite default ports
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());
app.use('/uploads', express.static('uploads'));  // Serve temp files if needed

// Routes
app.use('/api/images', imageRoutes);

// Health check
app.get('/health', (req, res) => res.json({ status: 'OK' }));

// Global error handler
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

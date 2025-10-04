import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ImageCard from './ImageCard';
import { toast } from 'react-toastify';

const ImageGrid = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/images/all');
        setImages(res.data.images);
      } catch (err) {
        toast.error('Failed to load images');
      }
    };
    fetchImages();
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {images.map((img) => (
        <ImageCard key={img._id} image={img} />
      ))}
    </div>
  );
};

export default ImageGrid;
